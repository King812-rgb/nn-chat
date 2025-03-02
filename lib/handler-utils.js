'use strict';
const fs = require('node:fs');
const pug = require('pug');
const Cookies = require('cookies');
const contents = [];
const { currentThemeKey } = require('../config');


function handleTopPage(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write('<h1>NNチャットの入り口</h1>');
  res.write('<p><a href="/posts">NNチャット</a></p>');
  res.write('<p><a href="/logout">ログアウト</a></p>');
  res.end();
};

function handlelogout(req, res) {
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end(
    `<!DOCTYPE html><html lang="ja">
        <body>
            <h1>ログアウトしました</h1>
            <a href="/posts">ログイン</a>
        </body>
    </html>`
  );
};

function handleNotFound(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write('<p>ページがみつかりません</p>');
  res.write('<p><a href="/posts">NNチャット</a></p>');
  res.end();
};

function handleBadRequest(req, res) {
  res.writeHead(400, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('未対応のリクエストです')
};

function handleFavicon(req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon',
    'Cache-Control': 'public, max-age=604800'
  });
  const favicon = fs.readFileSync('./favicon.ico');
  res.end(favicon);
}

function handleStyleCssFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/css',
  });
  const file = fs.readFileSync('./public/style.css');
  res.end(file);
}

function handleNnChatJsFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/javascript',
  });
  const file = fs.readFileSync('./public/nn-chat.js');
  res.end(file);
}

function handleDayJsFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/javascript',
  });
  const file = fs.readFileSync('./public/day.js');
  res.end(file);
}
function handleChangeTheme(req, res) {
  const cookies= new Cookies(req,res);
  const currentTheme = cookies.get(currentThemeKey) !=='light' ? 'light' :'dark';
  cookies.set(currentThemeKey, currentTheme);
  res.writeHead(303, {
    'Location':'/posts'
  });
  res.end();
}

module.exports = {
  handlelogout,
  handleNotFound,
  handleBadRequest,
  handleFavicon,
  handleStyleCssFile,
  handleNnChatJsFile,
  handleDayJsFile, handleChangeTheme,
  handleTopPage
};