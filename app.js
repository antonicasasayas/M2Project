require('dotenv').config();

const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const app = express();

require("./configs/db.config");

// Debbuger
require("./configs/debugger.config");


// Middleware Setup
// const func = require('./configs/middleware.config');
// func(app);
require("./configs/middleware.config")(app);

// Configs
require("./configs/preformatter.config")(app);
require("./configs/views.config")(app);
require("./configs/locals.config")(app);
require("./configs/session.config")(app);
require("./configs/passport.config")(app);

const index = require('./routes/index');
const authRouter = require("./routes/auth.routes");
const privateRouter = require("./routes/private.routes");

app.use('/', index);
app.use("/private", privateRouter);
app.use("/auth", authRouter);
module.exports = app;
