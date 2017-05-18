/**
 * Created by lt on 17-05-2017.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('simul');
});

module.exports = router;

