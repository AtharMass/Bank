const mongoose = require('mongoose')
const Schema = mongoose.Schema


const transctionsSchema = new Schema({ 
  amount : {type: Number },
  vendor : {type: String},
  category : {type: String }
  })
  
const Transaction = mongoose.model("transaction", transctionsSchema)
module.exports = Transaction

