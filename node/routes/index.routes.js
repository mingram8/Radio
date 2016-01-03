var index = require('../controllers/index.controller.js');

module.exports = function(app) {
    app.route('/').get(index.render);
    app.get('/radio/:code', index.radio)
}