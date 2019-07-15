const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const bootstrap = require('./config/bootstrap');
const passport = require('passport');

class App {

    constructor () {
        this.express = express()
        this.middleware();
        this.mountRoutes();
    }

    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(compression());
        this.express.use(cors());

        this.express.use(bodyParser.urlencoded({
            extended: false
        }));
        this.express.use(bootstrap.bootstrap);
        require('./config/passport/jwtConfig')(passport)
    }

    mountRoutes() {
        this.express.get('/healthcheck',passport.authenticate('jwt', {session:false}), function (req, res) {
            res.send({ status: 'Running' });
        });
        require('./config/routes')(this.express);
    }
}

module.exports = new App();