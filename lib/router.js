'use strict';
const postsHandler = require('./posts-handler');
const utils = require('./handler-utils');

function route(req, res) {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] === 'http') {
    util.handleNotFound(req, res);
  }
  switch (req.url) {
    case '/':
      utils.handleTopPage(req, res);
      break;
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/posts/delete':
      postsHandler.handleDelete(req, res);
      break;
    case '/favicon.ico':
      utils.handleFavicon(req, res);
      break;
    case '/style.css':
        utils.handleStyleCssFile(req, res);
        break;
    case '/nn-chat.js':
        utils.handleNnChatJsFile(req, res);
        break;
    case '/changeTheme':
        utils.handleChangeTheme(req, res);
        break;
    case '/logout':
      utils.handlelogout(req, res);
      break;
    default:
      utils.handleNotFound(req, res);
      break;
  }
}

module.exports = {
  route
};