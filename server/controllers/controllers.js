import axios from 'axios'

export const AddSubject = async () => {
    try{
        subjectname = document.getElementById("addName").value
        teacher = document.getElementById("addTeacher").value
        const response = await axios.post(`http://localhost:3000/addsubject`, {subjectname, teacher})
    } catch (e) {
      alert(e.response.data.message)
      console.log(e.response.data.message)
    }
  }