const express = require('express')
const mongoose = require("mongoose")
const config = require("config")
const Router = require("./router/router.js")
const corsMiddleware = require("./middleware/cors.middleware")
const bodyParser= require('body-parser')

const app = express()
const PORT = config.serverPort

app.use(corsMiddleware)
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api", Router)

const start = async () => {
  try {
    await mongoose.connect(config.dbUrl)
    console.log('Connected to Database')
    
    const db = mongoose.connection

    app.get('/subjects', (req, res) => {
      db.collection("subjects").find({}).toArray(function(err, result) {
        if (err) throw err
        res.json(result)
      });
    })

    app.listen(PORT, () => {
        console.log('Server started on port', PORT)
    })

  } catch (e) {
    console.log("error")
  }
}

start()



//   Математика	Новиков А.М
//   Физика	Неверовский М.И
//   Литература	Котова Ю.А
//   Русский язык	Денисенко А.Ю
//   Химия	Мерненко Е.Д
//   Английский язык	Малашкова Е.А