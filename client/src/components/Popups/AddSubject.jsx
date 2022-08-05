import React, {useState} from 'react'
import './Popup.css'
import {addsubject} from '../../controllers/controller'

function AddSubject(props) {
  const [Name, setName] = useState("")
  const [Teacher, setTeacher] = useState("")

  return (props.trigger) ? (
    <div className="update">
      <div className="update_subject">
        <h2>Add subject</h2>
        <p className="graytext">Enter information</p>
        <input type="text" placeholder="Subject name" value={Name} onChange={(event) => (setName(event.target.value))}/>
        <input type="text" placeholder="Teacher" value={Teacher} onChange={(event) => (setTeacher(event.target.value))}/>

        <button className="main_button" onClick={() => (addsubject(Name, Teacher))}>Submit</button>

        <button style={{marginLeft: "10px"}} className="main_button" onClick={() => props.setTrigger(false)}>Back</button>
      </div>
    </div>
  ) : ""
}

export default AddSubject
