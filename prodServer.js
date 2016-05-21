var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 3001;

var logger = function(msg) {
  console.log('--------------------------------------------');
  console.log(msg);
  console.log(new Date());
}

console.log('--------------------------------------------');
console.log('App started');
console.log('Checking if bundle exists:');
try {
    fs.accessSync(path.join(__dirname, 'static', 'js', 'bundle.js'), fs.F_OK);
    console.log('Bundle exists, moving on');
    console.log(new Date());
} catch (e) {
    console.error('--------------------------------------------');
    console.error('Bundle does not exist. App will exit');
    console.error('Build using "npm run build"');
    console.error(new Date());
    process.exit(1);
}

app.use(express.static(path.join(__dirname, 'static')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'prodIndex.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.error(err);
    return;
  }

  logger('Server listening at port ' + port);
});
