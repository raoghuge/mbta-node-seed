const passport = require('passport');
const controllers = require('./../api/v1/controllers');
const {
    UserController,
    UserHistoryCotroller,
    StationController,
    AuthController
} = controllers;

module.exports = function (app) {

    /*****Auth*****/
    app.post('/auth/signup', AuthController.register);
    app.post('/auth/login', AuthController.login)

    /*****USERS*****/
    app.get('/user',passport.authenticate('jwt', {session:false}), UserController.userById);
    app.put('/user/:id',passport.authenticate('jwt', {session:false}), UserController.updateUser);

    /*****USER History*****/
    app.get('/archive',passport.authenticate('jwt', {session:false}), UserHistoryCotroller.historyByUserId);
    app.post('/archive',passport.authenticate('jwt', {session:false}), UserHistoryCotroller.saveHistory);

    /*****Stations*****/
    app.get('/station/all',passport.authenticate('jwt', {session:false}), StationController.allStations);
    app.get('/station/on_same_line',passport.authenticate('jwt', {session:false}), StationController.onSameLine);
    app.post('/station',passport.authenticate('jwt', {session:false}), StationController.saveStation);

};
