import React, {useState} from 'react'
import './Popup.css'
import {updateitem} from '../../controllers/controller.js'

function UpdateSubject(props) {
  const [Name, setName] = useState("1")
  const [Teacher, setTeacher] = useState("1")

  return (props.trigger) ? (
    <div className="update">
      <div className="update_subject">
        <h2>Update Subject</h2>
        <p className="graytext">Enter new information</p>
        <input defaultValue={props.projectname} type="text" id="Name" placeholder="Subject name" onChange={(event) => setName(event.target.value)}/>
        <input  defaultValue={props.teacher} type="text" id="Teacher" placeholder="Teacher" onChange={(event) => setTeacher(event.target.value)}/>

        {Name && Teacher ? (
          <button className="mainbutton" onClick={() => (updateitem(props.ind, document.getElementById("Name").value, document.getElementById("Teacher").value))}>Update</button>
        ):(
          <button className="disabled_mainbutton" disabled>Update</button>
        )}
        <button style={{marginLeft: "10px"}} className="mainbutton" onClick={() => props.setTrigger(false)}>Back</button>
      </div>
    </div>
  ) : ""
}

export default UpdateSubject
