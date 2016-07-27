// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
} else {
	console.log("database defined");
}

var api = new ParseServer({
  databaseURI: 'mongodb://intersect:4wabbit4@ds033015.mlab.com:33015/hotornot',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  masterKey: '1o6z9ePR3qPnRU0jHIP4iWToNzkANKIr3UNHwelq',
  appId: process.env.APP_ID || 'utXysazDczvny5sBUme5HZIzfUrybjppWIc8aVGb', //Add your master key here. Keep it secret!
  SERVER_URL: 'http://parseserver-2qqi8-env-test.eu-west-1.elasticbeanstalk.com/parse',
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/', express.static(path.join(__dirname, '/')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes


// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);