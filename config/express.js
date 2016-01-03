var express = require('express'),
    bodyParser = require('body-parser');
var _ = require('underscore');


module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended:true
    }));
    function allowCrossDomain(req, res, next) {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

        var origin = req.headers.origin;
        if (_.contains(app.get('allowed_origins'), origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        if (req.method === 'OPTIONS') {
            res.send(200);
        } else {
            next();
        }
    }
    app.use(bodyParser.json());
    app.use(allowCrossDomain)
    app.use(express.static('./src/webapp'));
    app.set('views', './src/webapp/views');
    app.set('view engine', 'ejs');

    require('../node/routes/index.routes.js')(app);


    return app;
};