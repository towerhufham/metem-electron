console.log("Custom webpack loading!!!!!!!!!!!!!!!!!!!!");
const webpack = require('webpack');
const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "app.js"),

    node: {
        __dirname: false
    }
};