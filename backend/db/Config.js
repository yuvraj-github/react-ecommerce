const mongoose = require('mongoose');
require("dotenv").config();
const DB = process.env.DATABASE;

mongoose.connect(DB);