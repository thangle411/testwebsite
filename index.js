const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'you got it' });
});

app.get('/redirect', async (req, res) => {
  let redirect_uri = req.query.redirect_uri;
  console.log(redirect_uri);
  await sleep(1000);
  res.redirect(redirect_uri);
});

app.get('/subscribe', (req, res) => {
  res.sendFile(__dirname + '/adblocklist.html');
});

app.get('/auth', (req, res) => {
  res.sendFile(__dirname + '/auth.html');
});

app.get('/postinstall', (req, res) => {
  res.sendFile(__dirname + '/postinstall.html');
});

app.get('/success', (req, res) => {
  res.sendFile(__dirname + '/success.html');
});

app.get('/sso', async (req, res) => {
  console.log('/sso');
  await sleep(1000);
  let redirect_uri = req.query.uri;
  console.log(redirect_uri);
  res.redirect(redirect_uri + '?UUID=af9adfafkkadkdk');
});

app.get('/getAuth', async (req, res) => {
  console.log('/getAuth');
  await sleep(1000);
  let code = req.query.code;
  if (code === 'af9adfafkkadkdk') {
    console.log('returning cause obj');
    return res.status(200).json({
      access_token: 'access token',
      refresh_token: 'refresh token',
      expires_at: new Date().toISOString(),
      cause: {
        name: 'Red Cross',
      },
      uuid: 'af9adfafkkadkdk',
    });
  }
  return res.status(400).json({ message: 'missing code query params' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const sleep = async time => new Promise(r => setTimeout(r, time));
