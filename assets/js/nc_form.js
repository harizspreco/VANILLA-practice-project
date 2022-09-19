/******************** USER CHOICE  *********************/
let users = ["Hariz", "Ado", "John"];
let userChoice = document.querySelector("#user-id");

for (let i = 0; i < users.length; i++) {
  let user = document.createElement("option");
  user.id = `user-${i + 1}`;
  user.innerText = users[i];
  userChoice.appendChild(user);
}

/******************** OPEN/CLOSE SUPPLIER LOOKUP WINDOW  *********************/

document.querySelector(".btn-open").addEventListener("click", e => {
  document.querySelector(".supplier-lookup-window").style.display = "flex";
  e.preventDefault();
});

document.querySelector(".exit-sup-win").addEventListener("click", e => {
  document.querySelector(".supplier-lookup-window").style.display = "none";
  e.preventDefault();
});

document.querySelector(".cancel-btn").addEventListener("click", e => {
  document.querySelector(".supplier-lookup-window").style.display = "none";
  e.preventDefault();
});

/******************** OPEN/CLOSE USER LOOKUP WINDOW  *********************/

document.querySelector("#addpart").addEventListener("click", e => {
  document.querySelector(".user-lookup-window").style.display = "flex";
  e.preventDefault();
});

document.querySelector(".exit-us-win").addEventListener("click", e => {
  document.querySelector(".user-lookup-window").style.display = "none";
  e.preventDefault();
});

document.querySelector("#cancel-button").addEventListener("click", e => {
  document.querySelector(".user-lookup-window").style.display = "none";
  e.preventDefault();
});

/******************** SUPPLIER LOOKUP WINDOW FILTER FUNCTION *********************/

function filterSuppliers() {
  function filterByName() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("name");
    filter = input.value.toUpperCase();
    table = document.getElementById("html-data-table");
    tr = table.getElementsByTagName("tr");

    if (filter) {
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
  function filterByIndex() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("index");
    filter = input.value.toUpperCase();
    table = document.getElementById("html-data-table");
    tr = table.getElementsByTagName("tr");

    if (filter) {
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
  function filterByCity() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("city");
    filter = input.value.toUpperCase();
    table = document.getElementById("html-data-table");
    tr = table.getElementsByTagName("tr");

    if (filter) {
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
  filterByName();
  filterByIndex();
  filterByCity();
}

function resetFilter() {
  let table = document.querySelector("#html-data-table");

  Array.from(table.getElementsByTagName("tr")).forEach(tr => {
    tr.style.display = "";
  });
}

/***************** SUPPLIER LOOKUP SELECTED ROWS ***************************/

document
  .querySelector(".supplier-list-container")
  .addEventListener("click", e => {
    //target su tackice koje kad se stisnu dobiju selected class i obrnuto
    if (e.target.id === "sup-lu-sel") {
      //isklljucit sve ostale jer samo jedan moze biti aktivan
      let buttons = document.querySelectorAll(".del-ed-btn");
      buttons.forEach(button => {
        button.classList.remove("selected");
      });
      //aktivirat kliknuti
      e.target.classList.add("selected");

      //krajnji button
      let selekt = document.querySelector(".select-btn");
      let supplierName;

      let selectedTd = document
        .querySelector("#html-data-table")
        .querySelectorAll(".selected");

      if (selectedTd.length > 0) {
        selekt.disabled = false;
        supplierName =
          selectedTd[0].parentElement.nextElementSibling.textContent;
        selekt.addEventListener("click", e => {
          document.querySelector("#suppl-inp").value = supplierName;
          document.querySelector(".supplier-lookup-window").style.display =
            "none";
        });
      } else {
        selekt.disabled = true;
      }
    }
    e.preventDefault();
  });

/******************** USER LOOKUP WINDOW FILTER FUNCTION *********************/

function filterUsers() {
  function filterByFName() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("fname");
    filter = input.value.toUpperCase();
    table = document.querySelector(".user-lookup-table");
    tr = table.getElementsByTagName("tr");

    if (filter) {
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
  function filterByLName() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("lname");
    filter = input.value.toUpperCase();
    table = document.querySelector(".user-lookup-table");
    tr = table.getElementsByTagName("tr");

    if (filter) {
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
  function filterByUserID() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("userid");
    filter = input.value.toUpperCase();
    table = document.querySelector(".user-lookup-table");
    tr = table.getElementsByTagName("tr");

    if (filter) {
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
  function filterByDep() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("dep");
    filter = input.value.toUpperCase();
    table = document.querySelector(".user-lookup-table");
    tr = table.getElementsByTagName("tr");

    if (filter) {
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
  function filterByPlant() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("plant");
    filter = input.value.toUpperCase();
    table = document.querySelector(".user-lookup-table");
    tr = table.getElementsByTagName("tr");

    if (filter) {
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[5];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
  filterByFName();
  filterByLName();
  filterByUserID();
  filterByDep();
  filterByPlant();
}

function resetUserFilter() {
  let table = document.querySelector(".user-lookup-table");

  Array.from(table.getElementsByTagName("tr")).forEach(tr => {
    tr.style.display = "";
  });
}

/***************** USER LOOKUP SELECTED ROWS ***************************/

document.querySelector(".user-lookup-window").addEventListener("click", e => {
  //target su tackice koje kad se stisnu dobiju selected class i obrnuto
  if (e.target.id === "us-sel-btn") {
    e.target.classList.toggle("selected");
    //krajnji button
    let selekt = document.querySelector("#select-button");

    let selectedTds = document
      .querySelector(".user-lookup-table")
      .getElementsByClassName("selected");

    if (selectedTds.length > 0) {
      selekt.disabled = false;
      selekt.addEventListener("click", e => {
        let table = document
          .querySelector(".participants-table")
          .querySelector("#html-data-table")
          .querySelector("tbody");
        Array.from(selectedTds).forEach(td => {
          table.appendChild(td.parentElement.parentElement);
          td.parentElement.innerHTML = `<a class="del-ed-btn"><img id="del-part-x" src="/assets/img/close.png">`;
        });
        document.querySelector(".user-lookup-window").style.display = "none";
        console.log(e.target);
      });
    } else {
      selekt.disabled = true;
    }
  }
  e.preventDefault();
});

/***************** ADD COMMENT/SHOW COMMENT SECTION ***************************/

document.querySelector(".add-comment-btn").addEventListener("click", e => {
  document.querySelector(".new-comment-section").classList.toggle("show");
  let label = document.querySelector(".comment-label");
  label.innerText = userChoice.options[userChoice.selectedIndex].text;
  e.preventDefault();
});

/***************** ADD COMMENT/SHOW COMMENT SECTION ***************************/

userChoice.addEventListener("change", e => {
  let label = document.querySelector(".comment-label");
  label.innerText = userChoice.options[userChoice.selectedIndex].text;
});

document.querySelector(".post-comment").addEventListener("click", e => {
  let commentSection = document.querySelector(".comment-section");
  let comment = document.querySelector("#comment");

  if (comment.value == "") {
    alert("Comment can't be empty!");
  } else if (userChoice.selectedIndex == -1) {
    alert("Choose user before commenting!");
  } else {
    let newComment = document.createElement("div");
    newComment.classList.add("each-comment");
    let user = userChoice.options[userChoice.selectedIndex].text;
    let userP = document.createElement("p");
    userP.innerText = `User: ${user}`;
    let commContentP = document.createElement("p");
    commContentP.innerText = `Comment: ${comment.value}`;
    newComment.appendChild(userP);
    newComment.appendChild(commContentP);
    commentSection.appendChild(newComment);
    comment.value = "";
    document.querySelector(".new-comment-section").classList.remove("show");
  }
  e.preventDefault();
});

/***************** REMOVE PARTICIPANT ***************************/

document.querySelector(".participants-table").addEventListener("click", e => {
  if (e.target.parentElement.classList.contains("del-ed-btn")) {
    let uLTable = document.querySelector(".user-lookup-table");
    uLTable.appendChild(e.target.parentElement.parentElement.parentElement);
    e.target.parentElement.parentElement.innerHTML = `<button type="button" id="us-sel-btn" class="del-ed-btn">`;
  }
  e.preventDefault();
});

/***************** SUPPLIER LOOKUP SELECTED ROW ***************************/
