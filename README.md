# testSite

Production :
(package.json) increment 'version'
(server.js)  serverURL: 'http://parseserver-2qqi8-env-test.eu-west-1.elasticbeanstalk.com/parse'
Zip project files and deploy them via cmd or upload it on aws .( Don't upload with node modules from local testing)

Development(localhost):
serverURL: 'http://parseserver-2qqi8-env-test.eu-west-1.elasticbeanstalk.com/parse'
Start with node server.js  from cmd line inside project path 
Test it on localhost:1337



 masterKey: '1o6z9ePR3qPnRU0jHIP4iWToNzkANKIr3UNHwelq',
 appId: 'utXysazDczvny5sBUme5HZIzfUrybjppWIc8aVGb',

Post a sample object to the newly deployed setup. Replace the APP_ID with the APP_ID on your Parse Dashboard setup. Replace the hostname in the URL with the URL that is at the top of your Elastic Beanstalk Dashboard.

curl -X POST \
-H "X-Parse-Application-Id: APP_ID" \
-H "Content-Type: application/json" \
-d '{"score":1337,"playerName":"John Doe","cheatMode":false}' \
http://YOUR_EB_PARSE_SERVER_URL/parse/classes/GameScore

Now, fetch the sample object to the newly deployed setup using a GET command. Replace the APP_ID and MASTER_KEY with the APP_ID and MASTER_KEY from your Parse Dashboard setup. Replace the hostname in the URL with the URL that is at the top of your Elastic Beanstalk Dashboard.

curl -X GET \
-H "X-Parse-Application-Id: APP_ID" \
-H "X-Parse-Master-Key: MASTER_KEY" \
http://YOUR_EB_PARSE_SERVER_URL/parse/classes/GameScore
