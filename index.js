'use strict';
const http = require('node:http');
const auth = require('http-auth');
const router = require('./lib/router.js');

const basic = auth.basic({
  realm: 'Enter username and password',
  file: './users.htpasswd' //http-authモジュールのパスワードファイルはハッシュ値を利用したFMTでも普通に読める
})

const server = http.createServer(basic.check((req, res) => {
  router.route(req, res);
}))
  .on('error', e => {
    console.error('Server Error', e);
  })
  .on('clientError', e => {
    console.error('Client Error', e);
  });

// const port = 8000;
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});