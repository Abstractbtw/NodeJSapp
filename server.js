const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')

MongoClient.connect('mongodb+srv://Vldzaharenko:qwe123@cluster0.aaek3rb.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database')
    
    const db = client.db('NodeJSapp')
    const subjectsCollection = db.collection('subjects')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    
    app.put('/subjects', (req, res) => {
      subjectsCollection.findOneAndUpdate(
        { name: req.body.newname
        },
        {
        $set: {
          name: req.body.name,
          teacher: req.body.teacher
        }
        },
        {
          upsert: true
        }
      )
      .then(result => {
        res.json('Success')
      })
      .catch(error => console.error(error))
    })


    app.delete('/subjects', (req, res) => {
      subjectsCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No subject to delete')
          }
          res.json(`Deleted subject`)
        })
        .catch(error => console.error(error))
    })


    app.get('/', (req, res) => {
      db.collection('subjects').find().toArray()
        .then(results => {
          res.render('index.ejs', { subjects: results })
        })
        .catch(error => console.error(error))
    })
      

    app.post('/subjects', (req, res) => {
      subjectsCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
      

    app.listen(3000, function() {
      console.log('listening on 3000')
    })
})
.catch(console.error)



//   Математика	Новиков А.М
//   Физика	Неверовский М.И
//   Литература	Котова Ю.А
//   Русский язык	Денисенко А.Ю
//   Химия	Мерненко Е.Д
//   Английский язык	Малашкова Е.А