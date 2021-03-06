
require.extensions['.css'] = () => {
  return;
};

// import dotenv from 'dotenv';
require('dotenv').config()
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';


var express = require('express')
var app = express();
var server = require('http').createServer(app);

import routes from './routes/index'
import cors from 'cors';

const setupSocket = require('./socket/socket_server');

// const socket = require('./socket_server');

mongoose.Promise = global.Promise;
const mongooseURI = 'mongodb://admin:admin@ds161041.mlab.com:61041/folring';
mongoose.connect(mongooseURI);

const Folring = require('./socket_server');
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}));
app.use('/client', express.static(__dirname.substr(0, __dirname.length - 6) + 'client'));
app.use('/dist', express.static(__dirname.substr(0, __dirname.length - 6)));
app.use(passport.initialize());



// app.get('/', function(req, res) {
// 	res.send(createPage());
// });


// const routes = [
//     '/',
//     '/profile',
//     '/tolring'
// ];




// new Folring(server);
// // socket(server);


if (process.env.NODE_ENV === 'development') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('../webpack.config.dev.js');

    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
      hot: true,
      publicPath: config.output.publicPath,
      quiet: false,
      stats: {
        colors: true
      },
      serverSideRender: true,
      historyApiFallback: true
    }));
    app.use(webpackHotMiddleware(compiler));
  }


routes(app);

setupSocket(server);

var PORT = process.env.PORT || 5000;
server.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});


