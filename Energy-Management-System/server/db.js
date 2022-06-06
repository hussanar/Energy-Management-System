const nano = require('nano');
const express = require('express');
const app = express();
const url = "https://apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6:aabcfd48d07fe38f4760f6cd11b83b4a@b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudant.com";
const nanodb = nano(process.env.COUCHDB_URL || url);
const fresher = nanodb.use('energy-management-login');

app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin', '*'");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with,Content-type,Accept");
    next();
});
module.exports = { fresher, nano };