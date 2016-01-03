var spawn = require('child_process');
var config = require('../../config/config');

exports.radio = function(req,res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2000');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type');
        console.log(req.params)

        spawn.exec('../rfoutlet/codesend '+req.params.code, function () {
            spawn.exec('../rfoutlet/codesend '+req.params.code, function () {
                spawn.exec('../rfoutlet/codesend '+req.params.code, function () {
                    res.send('success');
                });
            });
    });


}
exports.render = function(req,res) {
    res.render('index', {
        title: 'House'
    });
}