var express = require('express');
var router = express.Router();

/* GET /contact */
router.get('/', function(req, res, next) {
  res.render('contact', {});
});

router.post('/', function(req, res, next) {
  // process the form...
  console.log(`Email: ${req.body.email}`);
  console.log(`Message: ${req.body.message}`);

  res.redirect("/contact/thankyou");
});

router.get('/thankyou', (req, res) => {
  res.render('thankyou');
});

module.exports = router;
