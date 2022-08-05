import axios from 'axios'
export const port = `5000`

export const addsubject = async (subjectname, teacher) => {
  try{
    if (subjectname.replace(/\s/g, "").length || teacher.replace(/\s/g, "").length) {
      const response = await axios.post(`http://localhost:${port}/api/newsubject`, {subjectname, teacher})
      document.location.reload()
    }
    else{
      alert("Fill all the fields")
    }
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}



export const deleteitem = async (ind) => {
  try{
    const response = await axios.post(`http://localhost:${port}/api/deletesubject`, {ind})
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}



export const updateitem = async (ind, subjectname, teacher) => {
  try{
      if(subjectname && teacher){
        const response = await axios.post(`http://localhost:${port}/api/updatesubject`, {ind, subjectname, teacher})
        document.location.reload()
      }
      else{
        alert("Fill all the fields")
      }
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}