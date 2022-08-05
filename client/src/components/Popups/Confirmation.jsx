import React, {useState} from 'react'
import './Popup.css'
import {deleteitem} from '../../controllers/controller.js'

function DeleteConfirmation(props) {

  return (props.trigger) ? (
    <div className="update">
      <div className="update_subject">
        <p className="graytext">Are you sure?</p>
        <button className="main_button" onClick={() => (deleteitem(sessionStorage.getItem("deleteId")), sessionStorage.setItem("confirmationActive", "false"), document.location.reload())}>Ok</button>
        <button style={{marginLeft: "10px"}} className="main_button" onClick={() => props.setTrigger(false)}>Cancel</button>
      </div>
    </div>
  ) : ""
}

export default DeleteConfirmation
