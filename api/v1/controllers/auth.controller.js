//User
const _ = require('lodash');
const json = require('../../../config/data/json.reader');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
require('dotenv').config();
const secret = process.env.SECRET || '1234567';
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        let users = await json.readJson('user');
        let user = users.find(function (element) {
            return element.email === req.body.email;
        });

        if (user) {
            let error = 'Email Address Exists in Database.';
            return res.err(error);
        } else {
            let newUser = new User(req.body);
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt,
                    async (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        console.log(newUser);
                        await json.saveToJson('user', newUser);
                        res.ok(newUser)
                    });
            });
        }
    } catch (error) {
        res.err(error, 401);
    }
}

async function login(req, res) {

    let params = req.allParams();
    let { email, password } = params;
    try {
        let users = await json.readJson('user');
        let user = users.find(function (element) {
            return element.email === email;
        });
        
        if (user) {
            user = new User(user);
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            email: user.email
                        };
                        jwt.sign(payload, secret, { expiresIn: 36000 },
                            (err, token) => {
                                if (!err) {
                                    user.token = token;
                                    res.ok(user);
                                }
                            });
                    } else {
                        res.err('Wrong Credentials',401)
                    }
                })
        } else {
            res.err('Wrong Credentials',401)
        }
       
    } catch (error) {
        res.err(error);
    }
}

module.exports = {
    register,
    login
}