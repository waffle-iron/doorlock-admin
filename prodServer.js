var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 3001;

console.log('Checking if bundle exists:');
try {
    fs.accessSync(path.join(__dirname, 'static', 'js', 'bundle.js'), fs.F_OK);
    console.log('Bundle exists');
} catch (e) {
    console.log('Bundle does not exist. Build using "npm run build"');
    process.exit(1);
}

app.use(express.static(path.join(__dirname, 'static')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'prodIndex.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at port ' + port);
});
