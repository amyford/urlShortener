var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://amyford:CoderSpace123@ds235388.mlab.com:35388/testdatabase');

var Schema = mongoose.Schema;

var post = new Schema ({
  longURL: String,
  shortURL: String
});

var postModel = mongoose.model('url', post);

router.post('/', function(req, res, next) {
//  res.setHeader('Access-Control-Allow-Origin', '*');

  function randomize () {

    var str = '';
    var arr = ["a", "b", "c", "d", "e", "f", "g", "h",
                "i", "j", "k", "l", "m", "n", "o", "p",
                "q", "r", "s", "t", "u", "v", "w", "x",
                "y", "z", "A", "B", "C", "D", "E", "F",
                "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V",
                "W", "X", "Y", "Z", "1", "2", "3", "4",
                "5", "6", "7", "8", "9", "0"];
    var length = arr.length;

    for (var i=0; i<9; i++) {
      var x = Math.floor((Math.random() * length));
      str += arr[x];
    }
      return str;
  }

  var newURL = new postModel ({
    longURL: req.body.url,
    shortURL: randomize()
  });

  newURL.save(function (err, urlInfo) {
    if (err) {
      res.send('error');
      console.log(err);
    } else {
      res.json(urlInfo);
    }
  });
});


router.get('/:query', function(req, res, next) {

  var randChars = req.params.query;

  postModel.findOne({shortURL: randChars}, function(err, postInfo) {
    if (err) {
      res.send('there has been an error');
      console.log(err);
    } else if (postInfo == null) {
      res.send('No result found :(');
    } else {
      res.redirect(postInfo.longURL);
    }
  });
});

module.exports = router;
