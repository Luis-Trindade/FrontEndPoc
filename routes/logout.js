var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("FIZ LOGOUT -> Falta destruir o token");
    res.redirect('../login');
});

module.exports = router;
