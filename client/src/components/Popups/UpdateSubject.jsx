import React, {useState, useEffect} from 'react'
import './Popup.css'
import {updateitem} from '../../controllers/controller.js'

function UpdateSubject(props) {
  const [Name, setName] = useState("1")
  const [Teacher, setTeacher] = useState("1")

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
      updateitem(props.ind, document.getElementById("Name").value, document.getElementById("Teacher").value)
      document.location.reload()
    }
  }

  return (props.trigger) ? (
    <div className="update">
      <div className="update_subject">
        <h2>Update Subject</h2>
        <p className="graytext">Enter new information</p>
        <input defaultValue={props.projectname} type="text" id="Name" placeholder="Subject name" onChange={(event) => setName(event.target.value)}/>
        <input  defaultValue={props.teacher} type="text" id="Teacher" placeholder="Teacher" onChange={(event) => (setTeacher(event.target.value), setCheckTeacher(false))}/>

        {checkTeacher ? (
          <div style={{position: "absolute"}} className="error_text">Teacher {Teacher} already exists</div>
        ):("")}

        {(Name.replace(/\s/g, "").length && Teacher.replace(/\s/g, "").length) ? (
          <button className="mainbutton" onClick={() => (checkSubject())}>Update</button>
        ):(
          <button className="disabled_mainbutton" disabled>Update</button>
        )}
        <button style={{marginLeft: "10px"}} className="mainbutton" onClick={() => props.setTrigger(false)}>Back</button>
      </div>
    </div>
  ) : ""
}

export default UpdateSubject
