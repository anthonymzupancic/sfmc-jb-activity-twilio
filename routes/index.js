'use strict';

// Deps
var activity = require('./activity');
var express = require('express');
var path = require('path');
const { nextTick } = require('process');

/*
 * GET home page.
 */
exports.index = function(req, res) {
    console.log("INDEX ROUTE")
    console.log(req)
    console.log(req.params)

    if (!req.params && !req.params.code) {
        const authBase = 'https://mc1q10jrzwsds3bcgk0jjz2s8h80.auth.marketingcloudapis.com/v2/authorize?response_type=code&client_id='
        let redirectURI = 'https%3A%2F%2Ftwilio-integration-dev.herokuapp.com%2Fauthorize';

        res.redirect(`${authBase}${process.env.sfmcAuthClientID}&redirect_uri=${redirectURI}`)
    }

};

exports.login = function(req, res) {
    console.log("LOGIN ROUTE")

    console.log('req.body: ', req.body);
    res.redirect('/');
};

exports.logout = function(req, res) {
    console.log("LOGOUT ROUTE")

    req.session.token = '';
};

exports.authorize = function(req, res) {
    console.log('Authorize')
    const params = req.params;
    const code = params.code;
    console.log(params)
    console.log(code)

}