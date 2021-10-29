console.log("Custom webpack loading!!!!!!!!!!!!!!!!!!!!");

module.exports = {
    target: "node",
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                loader: "node-loader"
            }
        ]
    }
};