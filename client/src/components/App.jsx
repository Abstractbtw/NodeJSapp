import React, {useState, useEffect} from 'react'
import './app.css'
import AddSubject from "./Popups/AddSubject"
import UpdateSubject from "./Popups/UpdateSubject"
import Confirmation from "./Popups/Confirmation"
import ReactPaginate from 'react-paginate'

function App() {

  const [showAdd, setShowAdd] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [updateId, setUpdateId] = useState(null)
  const [updateName, setUpdateName] = useState(null)
  const [updateTeacher, setUpdateTeacher] = useState(null)

  function handleClick (ind, subjectname, teacher){
    setUpdateId(ind)
    setUpdateName(subjectname)
    setUpdateTeacher(teacher)
  }

  function Subjects({ currentSubjects }) {
    return (
      <>
        {currentSubjects &&
          currentSubjects.map((subject, index) => (
            <tr key={index} className="table_tr">
              <td>{subject.subjectname}</td>
              <td>{subject.teacher}</td>
              <td style={{textAlign: "right"}}>
              <button className="table_button" onClick={() => (setShowConfirm(true), sessionStorage.setItem("deleteId", subject._id))}>delete</button>
              <button className="table_button" onClick={() => (handleClick(subject._id, subject.subjectname, subject.teacher), setShowUpdate(true))}>update</button>
            </td>
          </tr>
          ))}
      </>
    )
  }

  function SubjectsCount({currentSubjects}){
    return(
      <>
        {currentSubjects &&
          <tr className="table_tr" style={{backgroundColor: "white"}}>
            <td>
              <div>Subjects on page: {currentSubjects.length}</div>
            </td>
          </tr>
        }
      </>
    )
  }
  
  function PaginatedSubjects() {

    const [page, setPage] = useState(0)

    const [data, setData] = useState([])

    const [pageCount, setPageCount] = useState(0)

    useEffect(function () {
      fetch(`${process.env.REACT_APP_API_URL}/subjects?page=${page}`)
      .then(res => res.json())
      .then(({totalPages, subjects}) => (setData(subjects), setPageCount(totalPages)))
    }, [page])
  
    return (
      <>
      {data.length > 0 ? (
        <>
          <Subjects currentSubjects={data} />
          <SubjectsCount currentSubjects={data} />
          <tr style={{backgroundColor: "white"}}>
            <td>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                containerClassName={'pagination'}
                activeClassName={'active'}
                onPageChange={(event) => setPage(event.selected)}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
              />
            </td>
          </tr>
        </>
        ):(
          <tr><td>No subjects found</td></tr>
        )}
      </>
    )
  }


  return (
    <div>

      <Confirmation trigger={showConfirm} setTrigger={setShowConfirm}/>

      <UpdateSubject trigger={showUpdate} setTrigger={setShowUpdate} ind={updateId} projectname={updateName} teacher={updateTeacher}/>

      <AddSubject trigger={showAdd} setTrigger={setShowAdd} />
      
      <div className="container">
        <h1>Subjects application</h1>

        <div style={{borderBottom: "2px solid black"}}></div>

        <h2> Subjects </h2>

        <br/> 
        <button className="main_button" onClick={() => (setShowAdd(true))}>Add subject</button>
        <br/> 

        <br/>
        <div style={{borderBottom: "2px solid black"}}></div>

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
              <PaginatedSubjects/>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default App