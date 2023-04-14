const express = require("express");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://deepakgoswamiofficial:homxCttfCY3hUM5I@apnaid.fgtdgaf.mongodb.net/test')
.then(()=>console.log("Database connection successfully"))
.catch((error)=>console.log(error))

