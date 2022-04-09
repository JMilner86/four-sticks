const inquirer = require('inquirer');
const express = require('express');
const PORT = process.env.PORT || 3001;
const db = require('./db/connection');
const app = express();