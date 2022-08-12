const Router = require("express")
const Subject = require("../models/Subject")
const {check, validationResult} = require("express-validator")
const router = new Router()
const { ObjectId } = require('mongodb')



router.post('/newsubject',
  async (req, res) => {

  try {

    const {subjectname, teacher} = req.body

    const candidate = await Subject.findOne({teacher})

    if(candidate) {
      return res.status(400).json({message: `Teacher ${teacher} already added`})
    }

    const subject = new Subject({subjectname, teacher})

    await subject.save()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})

router.post('/deletesubject', async (req, res) => {
    try {
  
      const {ind} = req.body
  
      await Subject.deleteOne({
        _id: ObjectId(ind)
      })

      return res.json()
  
    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }
})

router.post('/updatesubject', async (req, res) => {
    try {
        const {ind, subjectname, teacher} = req.body
    
        await Subject.findOneAndUpdate({
          _id: ObjectId(ind)
        }, {
            subjectname: subjectname,
            teacher: teacher
        })
    
        return res.json()
    
      } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
      }
})

module.exports = router