import React, {useState} from 'react'
import './Popup.css'
import {updateitem} from '../../controllers/controller.js'

function UpdateSubject(props) {
  return (props.trigger) ? (
    <div className="update">
      <div className="update_subject">
        <h2>Update Subject</h2>
        <p className="graytext">Enter new information</p>
        <input defaultValue={props.projectname} type="text" id="Name" placeholder="Subject name"/>
        <input  defaultValue={props.teacher} type="text" id="Teacher" placeholder="Teacher"/>
        <button className="main_button" onClick={() => (updateitem(props.ind, document.getElementById("Name").value, document.getElementById("Teacher").value))}>Update</button>
        <button style={{marginLeft: "10px"}} className="main_button" onClick={() => props.setTrigger(false)}>Back</button>
      </div>
    </div>
  ) : ""
}

export default UpdateSubject
