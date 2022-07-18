const Router = require("express")
const Subject = require("../models/Subject")
const {check, validationResult} = require("express-validator")
const router = new Router()
const { ObjectId } = require('mongodb')



router.post('/newsubject',
  [
    check('subjectname', 'Enter name').isLength({min:1}),
    check('teacher', 'Enter description').isLength({min:1})
  ], 
  async (req, res) => {

  try {

    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({message: "Fill all the fields", errors})
    }

    const {subjectname, teacher} = req.body

    const subject = new Subject({subjectname, teacher})

    await subject.save()
    return res.json({message: "User was created"})

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
        const {ind, newname, newteacher} = req.body
    
        await Subject.findOneAndUpdate({
          _id: ObjectId(ind)
        }, {
            subjectname: newname,
            teacher: newteacher
        })
    
        return res.json()
    
      } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
      }
})

module.exports = router