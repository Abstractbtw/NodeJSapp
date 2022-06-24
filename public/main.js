const updateButton = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

updateButton.addEventListener('click', _ => {
  fetch('/subjects', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById("nameInput").value,
      teacher: document.getElementById("teacherInput").value,
      newname: document.getElementById("updateInput").value 
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
})

deleteButton.addEventListener('click', _ => {
  fetch('/subjects', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById("deleteInput").value
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response !== 'No subject to delete') {
        window.location.reload(true)
      }
    })
    .then(data => {
      window.location.reload()
    })
})