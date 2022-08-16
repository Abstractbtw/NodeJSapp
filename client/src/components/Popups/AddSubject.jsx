import React, {useState, useEffect} from 'react'
import './Popup.css'
import {addsubject} from '../../controllers/controller'

function AddSubject(props) {
  const [Name, setName] = useState("")
  const [Teacher, setTeacher] = useState("")

  const [data, setData] = useState([])

  useEffect(function () {
    fetch(`${process.env.REACT_APP_API_URL}/teachers`)
    .then(res => res.json())
    .then(data => setData(data))
  }, [])

  const [checkTeacher, setCheckTeacher] = useState(false)

  function checkSubject(){
    let includes = 0
    data.map(teachers => {
      if(teachers.teacher === Teacher){
        includes = 1
      }
    })
    if(includes === 1){
      setCheckTeacher(true)
    }
    else{
      addsubject(Name, Teacher)
      document.location.reload()
    }
  }

  return (props.trigger) ? (
    <div className="update">
      <div className="update_subject">
        <h2>Add subject</h2>
        <p className="graytext">Enter information</p>
        <input type="text" placeholder="Subject name" value={Name} onChange={(event) => (setName(event.target.value))}/>
        <input type="text" placeholder="Teacher" value={Teacher} onChange={(event) => (setTeacher(event.target.value), setCheckTeacher(false))}/>
        
        {checkTeacher ? (
          <div style={{position: "absolute"}} className="error_text">Teacher {Teacher} already exists</div>
        ):("")}

        { (Name.replace(/\s/g, "").length && Teacher.replace(/\s/g, "").length) ? (
          <button className="mainbutton" onClick={() => (checkSubject())}>Submit</button>
        ):(
          <button className="disabled_mainbutton" disabled>Submit</button>
        )} 

        <button style={{marginLeft: "10px"}} className="mainbutton" onClick={() => props.setTrigger(false)}>Back</button>
      </div>
    </div>
  ) : ""
}

export default AddSubject
