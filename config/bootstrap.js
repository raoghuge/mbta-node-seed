const _ = require('lodash');

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function bootstrap(req, res, next) {
    const defaults = {
        paginate: {
            limit: 0,
            page: 1,
        },
    };

    req.allParams = () => {
        let result = {};
        let params = _.merge(req.params, req.query, req.body);

        result.sort = {
            createdAt: 'desc',
        };

        if (params.sortby && params.sortmode) {
            delete result.sort.createdAt;
            result.sort[params.sortby] = params.sortmode.toLowerCase();

            delete params.sortby;
            delete params.sortmode;
        }

        let limit = parseInt(params.limit || params.l || defaults.paginate.limit || 0);
        let page = parseInt(params.page || params.p || defaults.paginate.page || 1);

        result.paginate = {
            limit: limit,
            page: page,
            skip: parseInt(page - 1) * limit,
        };

        delete params.limit;
        delete params.l;
        delete params.page;
        delete params.p;

        let key, val;
        result = _.merge(result, params);

        for (key in result) {
            val = result[key];

            if (val === '') {
                delete result[key];
            }

            if (!val) {
                // delete result[key];
            } else if (val && typeof val === 'string' && isJSON(val)) {
                result[key] = JSON.parse(val);
            } else if (val && typeof val === 'string' && (val === 'true' || val === 'false')) {
                if (val === 'true') {
                    result[key] = true;
                } else if (val === 'false') {
                    result[key] = false;
                }
            }
        }

        return result;
    };

    res.ok = (data, total, paginate, exts) => {
        if (!total) {
            total = 0;
        }

        let params = _.merge(req.params, req.query, req.body);
        let limit = parseInt(params.limit || params.l || defaults.paginate.limit || 0);
        let page = parseInt(params.page || params.p || defaults.paginate.page || 1);
        let paginateLocal = paginate || {
            limit: limit,
            page: page,
        };
        let result = {
            data: data,
            paginate: paginateLocal,
            total: parseInt(total),
            status: 'OK',
            code: 200,
        };

        if (exts && _.isObject(exts)) {
            result.exts = exts;
        }

        return res.json(result);
    };

    res.err = (message, status, code) => {
        if (message instanceof Error) {
            message = message.message;
        }
        return res.json({
            message: message,
            url: req.url,
            method: req.method,
            status: status || 'BAD REQUEST',
            code: code || 400,
        });
    };

    res.unauthorized = (message, code) => {
        return res.json({
            message: message || 'Missing or Invalid token',
            url: req.url,
            method: req.method,
            status: 'OAuth EXCEPTION',
            code: code || 401,
        });
    };

    next();
}

module.exports = {
    bootstrap,
};
