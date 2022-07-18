const {Schema, model, ObjectId} = require("mongoose")

const Subject = new Schema({
  subjectname: {type: String, required: true},
  teacher: {type: String, required: true},
})

module.exports = model('Subject', Subject)