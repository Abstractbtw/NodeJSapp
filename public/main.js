var UpdateId = ""

function AddSubject(){
  if (document.getElementById("addName").value && document.getElementById("addTeacher").value){
    fetch('/subjects', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById("addName").value,
        teacher: document.getElementById("addTeacher").value,
      })
    })
  } else {
    alert("Fill all the fields")
  }
  
}

function ShowUpdate(id) {
  const answer = window.confirm("Are you sure?")
  if (answer) {
    document.getElementById("update").style.display = "block"
    UpdateId = id
  }
}

function UpdateItem() {
  if (document.getElementById("nameInput").value && document.getElementById("teacherInput").value){
    fetch('/subjects', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById("nameInput").value,
        teacher: document.getElementById("teacherInput").value,
        index: UpdateId,
      })
    })
    .then(res => {
      window.location.reload(true)
    })
  } else {
    alert("Fill all the fields")
  }
}

function DeleteItem(id) {
  const answer = window.confirm("Are you sure?")
  if (answer) {
    fetch('/subjects', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        index: id,
      })
    })
    .then(res => {
      window.location.reload(true)
    })
  }
}