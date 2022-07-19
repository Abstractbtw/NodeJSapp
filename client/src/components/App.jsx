import React, {useState, useEffect} from 'react'
import './app.css'
import {updateitem, deleteitem, addsubject} from '../controllers/controller.js'

function App() {

  const [subjects, setSubjects] = useState([])
  const [updateName, setName] = useState("")
  const [updateTeacher, setTeacher] = useState("")
  const [ind, setInd] = useState()

  useEffect(function () {
    fetch('http://localhost:5000/subjects')
    .then(res => res.json())
    .then(data => setSubjects(data))
  }, []);

  function showupdate() {
    document.getElementById("update").style.display = "block"
  }

  function closeupdate() {
    document.getElementById("update").style.display = "none"
  }

  return (
    <div>

      <div id="update" className="update">
        <div className="update_subject">
          <h2>Update Subject</h2>
          <p className="graytext">Enter new information</p>
          <input defaultValue={updateName} type="text" id="nameInput" placeholder="Subject name"/>
          <input  defaultValue={updateTeacher} type="text" id="teacherInput" placeholder="Teacher"/>
          <button className="mainbutton" onClick={() => (closeupdate(), updateitem(ind))}>Update</button>
        </div>
      </div>
      
      <div className="container">
        <h1>Subjects application</h1>

        <div style={{borderBottom: "2px solid black"}}></div>

        <h2> Subjects </h2>

        <div className="subjects">
          <table className="w3-table w3-striped">
            <thead>
              <tr>
                <td>Subject</td>
                <td>Teacher</td>
              </tr>
              <tr style={{borderBottom: "2px solid lightgrey"}}></tr>
            </thead>
            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <tr key={index} className="table_tr">
                    <td>{subject.subjectname}</td>
                    <td>{subject.teacher}</td>
                    <td style={{textAlign: "right"}}>
                      <button className="table_button" onClick={() => deleteitem(subject._id)}>delete</button>
                      <button className="table_button" onClick={() => (showupdate(), setInd(subject._id), setName(subject.subjectname), setTeacher(subject.teacher))}>update</button>
                    </td>
                  </tr>
                ))
              ):(
                <tr><td>No subjects found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <br/>
        <div style={{borderBottom: "2px solid black"}}></div>

        <h2>Add subject</h2>

          <div>
            <input type="text" id="addName" placeholder="Subject name"/>
            <input type="text" id="addTeacher" placeholder="Teacher"/>
            <button className="mainbutton" onClick={() => addsubject()}>Submit</button>
          </div>

        <br/>  

      </div>
    </div>
  );
}

export default App;