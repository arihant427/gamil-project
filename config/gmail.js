const fs = require('fs');
const readline = require('readline');
const {
  google
} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];


const TOKEN_PATH = 'token.json';
oAuth2Client = null;

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content));
});

function getList(req, res, success) {
  listData(req, oAuth2Client, success)
}

function getMessageData(req, res, success) {
  getMessage(oAuth2Client, 'me', req.query.messageId, success)
}


async function authorize(credentials) {
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;
  oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
  var res;
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
  });
  return res;
}

async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  var res;
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
    });
  });
}


async function listData(req, auth, success) {
  var size = 10;
  if (req.query.size) {
    size = req.query.size;
  }
  const gmail = google.gmail({
    version: 'v1',
    auth
  });
  var res;
  gmail.users.messages.list({
    userId: 'me',
    maxResults: size,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.messages;
    if (labels.length) {
      console.log('Labels:');
      var data = [];

      labels.forEach((label) => {
        data.push(`${JSON.stringify(label)}`);
        //getMessage(auth,'me', labels[0].id)
      });
      success(data);
    } else {
      console.log('No labels found.');
    }
  });
  return res;
}



function getMessage(auth, userId, messageId, success) {
try{
  const gmail = google.gmail({
    version: 'v1',
    auth
  });
  var request = gmail.users.messages.get({
    'userId': userId,
    'id': messageId
  });
  request.then((data) => {
    var arr = data.data.payload.headers;
    var from, to;
    arr.forEach(element => {
      switch (element.name) {
        case "From":
          from = element.value;
          break;
        case "To":
          to = element.value;
          break;
      }
    });
    success({
      "from": from,
      "to": to,
      "body":data.data.snippet,
    })
  }).catch((err) => {
    console.log("data saved");
    success({
      "error": "Data not available for given id"
    })
  });
}catch(err){
  success({
    "error": "Data not available for given id"
  })
}
}



module.exports = {
  getMessageData,
  getList,
};