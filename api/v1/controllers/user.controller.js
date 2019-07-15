//User
const _ = require('lodash');
const json = require('../../../config/data/json.reader');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function userById(req, res) {
    let params = req.allParams();
    let { email } = params;
    try {
        let users = await json.readJson('user');
        let user = users.find(function (element) {
            return element.email === email;
        });
        return res.ok(user);
    } catch (e) {
        console.log(e);
    }
}

function deleteUser(req, res) {
    let params = req.allParams();
    let { id } = params;
    try {
        console.log('deleting user');
        res.ok('Deleted');

    } catch (e) {
        logError(e);
        return res.err(e);
    }

    return res.ok()
}

async function updateUser(req, res) {
    let params = req.allParams();
    let { id } = params;
    try {
        return res.ok({});
    } catch (e) {
        logError(e);
        return res.err(e);
    }
}

module.exports = {
    userById,
    deleteUser,
    updateUser
}