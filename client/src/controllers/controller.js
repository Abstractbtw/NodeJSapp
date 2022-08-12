import axios from 'axios'

export const addsubject = async (subjectname, teacher) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/newsubject`, {subjectname, teacher})
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}



export const deleteitem = async (ind) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/deletesubject`, {ind})
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}



export const updateitem = async (ind, subjectname, teacher) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/updatesubject`, {ind, subjectname, teacher})
    document.location.reload()
  } catch (e) {
    alert(e.response.data.message)
    console.log(e.response.data.message)
  }
}