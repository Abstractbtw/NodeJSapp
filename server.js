const express = require('express')
const bodyParser= require('body-parser')
const { ObjectId } = require('mongodb')
const app = express()
const config = require("./config/default.json")
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')

MongoClient.connect(config.dbUrl)
.then(client => {
    console.log('Connected to Database')
    
    const db = client.db('NodeJSapp')
    const subjectsCollection = db.collection('subjects')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    
    app.put('/subjects', (req, res) => {
      subjectsCollection.findOneAndUpdate(
        {"_id": ObjectId(req.body.index)},
        {$set: {
          name: req.body.name,
          teacher: req.body.teacher
        }},
        {upsert: true}
      )
      .then(result => {
        res.json('Success')
      })
    })


    app.delete('/subjects', (req, res) => {
      subjectsCollection.deleteOne(
        { "_id": ObjectId(req.body.index) }
      )
      .then(response => {
        res.redirect('/')
      })
    })


    app.get('/', (req, res) => {
      db.collection('subjects').find().toArray()
        .then(results => {
          res.render('index.ejs', { subjects: results })
        })
    })
      

    app.post('/subjects', (req, res) => {
      subjectsCollection.insertOne(req.body)
      .then(response => {
        res.redirect('/')
      })
    })
      

    app.listen(3000, function() {
      console.log('listening on 3000')
    })
})



//   Математика	Новиков А.М
//   Физика	Неверовский М.И
//   Литература	Котова Ю.А
//   Русский язык	Денисенко А.Ю
//   Химия	Мерненко Е.Д
//   Английский язык	Малашкова Е.А