var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("get", req.body)
  res.render('index', { title: 'Express' }); 
});
router.post('/', (req, res, next) => {
  console.log("post", req.body)
  const { body } = req;
  switch (body.type) {
    case 'confirmation':
      res.end(CONFIRMATION);
      break;

    case 'message_new':
      console.log(body);
      res.end('ok');
      break;

    default:
      res.end('ok');
      break;
  }
})

module.exports = router;
