//Order
const _ = require('lodash');
const json = require('../../../config/data/json.reader');
const { History } = require('../models');

async function historyByUserId(req, res) {
    let params = req.allParams();
    let { email } = params;
    try {
        let historyList = await json.readJson('history');
        let userOrders = historyList.filter(function (element) {
            return element.email === email;
        });
        return res.ok(userOrders, userOrders.length);
    } catch (e) {
        console.warn(e);
    }
}

async function saveHistory(req, res) {
    try {
        let history = new History(req.body);
        await json.saveToJson('history', history)
        return res.ok(history);
    } catch (e) {
        return res.err(e);
    }
}

module.exports = {
    historyByUserId,
    saveHistory
}