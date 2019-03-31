const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const server = express();

server.use(
  session({
    name: "thisisaname", // default is connect.sid
    secret: "eat my pants!",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      //https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
      secure: false // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,

    store: new KnexSessionStore({
      knex: require("./data/dbconfig"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60
    })
  })
);
server.use(helmet());
server.use(express.json());

//CORS OPTIONS
const whitelist = ["http://example1.com", "http://example2.com"];
const corsOptionsDelegate = function(req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
server.use(cors(corsOptionsDelegate));

//global middleware
const { protected } = require("./middleware/auth");
server.use("/api/restricted", protected);

server.get("/", (req, res) => {
  res.send(`please use the API routes '/api/endpoint' `);
});

server.use("/api", require("./routes/api"));

module.exports = server;
