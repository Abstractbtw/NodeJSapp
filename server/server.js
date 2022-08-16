const express = require('express')
const mongoose = require("mongoose")
const config = require("config")
const Router = require("./router/router.js")
const corsMiddleware = require("./middleware/cors.middleware")
const bodyParser= require('body-parser')

const Subject = require("./models/Subject")

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

    app.get('/teachers', async (req, res) => {
      const subjects = await Subject.find({}, {_id: 0, teacher: 1})
      res.json(subjects)
    })

    app.get('/subjects', async (req, res) => {
      const PAGE_SIZE = 5
      const page = parseInt(req.query.page || "0")
      const total = await Subject.countDocuments({})
      const subjects = await Subject.find({})
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page)
      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        subjects,
      })
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