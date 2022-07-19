import axios from 'axios'

export const addsubject = async () => {
  try{
    let subjectname = document.getElementById("addName").value
    let teacher = document.getElementById("addTeacher").value
    const response = await axios.post(`http://localhost:5000/api/newsubject`, {subjectname, teacher})
    document.location.reload()
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}



export const deleteitem = async (ind) => {
  try{
    const answer = window.confirm("Are you sure?")
    if (answer) {
      const response = await axios.post(`http://localhost:5000/api/deletesubject`, {ind})
      document.location.reload()
    }
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}



export const updateitem = async (ind) => {
  try{
      let newname = document.getElementById("nameInput").value
      let newteacher = document.getElementById("teacherInput").value
      if(newname && newteacher){
        const response = await axios.post(`http://localhost:5000/api/updatesubject`, {ind, newname, newteacher})
        document.location.reload()
      }
      else{
        alert("Fill all the fields")
        document.getElementById("update").style.display = "block"
      }
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}