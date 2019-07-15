//History
const _ = require('lodash');
const json = require('../../../config/data/json.reader');
const { Station } = require('../models');

async function allStations(req, res) {
    try {
        let allStationList = await json.readJson('stations');
        return res.ok(allStationList, allStationList.length);
    } catch (e) {
        return res.err(e);
    }
}

async function onSameLine(req, res) {
    let params = req.allParams();
    let { line } = params;
    try {
        let lineArray = line.split(',');
        let allStationList = await json.readJson('stations');
        let stations = allStationList.filter(function (o) {
            return lineArray.some(r => o.line.includes(r))
        });
        return res.ok(stations, stations.length);
    } catch (e) {
        return res.err(e);
    }
}

async function saveStation(req, res) {
    try {
        let station = new Station(req.body);
        await json.saveToJson('stations', station)
        return res.ok(station);
    } catch (e) {
        return res.err(e);
    }
}

module.exports = {
    allStations,
    onSameLine,
    saveStation
}