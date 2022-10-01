/******************** FIXED HEADER  *********************/
if (top.location.pathname != "/nc_form.html") {
  document.querySelector(".fixed-header").style.display = "none";
}
/******************** USER CHOICE  *********************/

document.querySelector("#user-id").addEventListener("click", e => {
  let userChoice = document.querySelector("#user-id");
  //get the data from idb
  if (userChoice.children.length === 0) {
    const request = indexedDB.open("initData", 1);
    request.onsuccess = () => {
      console.log("initDatabase for user-choice opened successfully");
      const db = request.result;
      const transaction = db.transaction("usersStore", "readonly");
      const store = transaction.objectStore("usersStore");

      const users = store.getAll();
      users.onsuccess = () => {
        for (let i = 0; i < users.result.length; i++) {
          let user = document.createElement("option");
          user.id = `user-${users.result[i].userID}`;
          user.innerText = users.result[i].firstName;
          userChoice.appendChild(user);
        }
      };
    };
  }
});
/******************** CERTIFICATE TYPE CHOICE  *********************/

document.querySelector("#ctype").addEventListener("click", e => {
  let certChoice = document.querySelector("#ctype");
  if (certChoice.children.length < 2) {
    const request = indexedDB.open("initData", 1);
    request.onsuccess = () => {
      console.log("initDatabase for certype-choice opened successfully");
      const db = request.result;
      const transaction = db.transaction("certificateTypesStore", "readonly");
      const store = transaction.objectStore("certificateTypesStore");

      const certypes = store.getAll();
      certypes.onsuccess = () => {
        for (let i = 0; i < certypes.result.length; i++) {
          let certype = document.createElement("option");
          certype.id = `cert-${certypes.result[i].cerTypeID}`;
          certype.innerText = certypes.result[i].cerTypeName;
          certChoice.appendChild(certype);
        }
      };
    };
  }
});

/******************** OPEN/CLOSE SUPPLIER LOOKUP WINDOW  *********************/
/******************** BUILD SUPPLIER LOOKUP TABLE FROM INDEXEDDB  *********************/

document.querySelector(".btn-open").addEventListener("click", e => {
  //display window
  document.querySelector(".supplier-lookup-window").style.display = "flex";
  let table = document
    .querySelector(".supplier-lookup-window")
    .querySelector("#html-data-table");
  if (table.children.length <= 1) {
    //get the data from idb
    const request = indexedDB.open("initData", 1);

    request.onsuccess = () => {
      console.log("initDatabase opened successfully");
      const db = request.result;
      const transaction = db.transaction("suppliersStore", "readonly");
      const store = transaction.objectStore("suppliersStore");

      const suppliers = store.getAll();
      suppliers.onsuccess = () => {
        for (let i = 0; i < suppliers.result.length; i++) {
          let row = document.createElement("tr");
          row.innerHTML = `
           <td><button type="button" id="sup-lu-sel" class="del-ed-btn"></button></td>
           <td>${suppliers.result[i].supplierName}</td>
           <td>${suppliers.result[i].supplierID}</td>
          <td>${suppliers.result[i].supplierCity}</td>
          <td></td>`;
          //fill the table
          table.appendChild(row);
        }
      };
    };
  }
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
/******************** BUILD USER LOOKUP TABLE FROM INDEXEDDB  *********************/

document.querySelector("#addpart").addEventListener("click", e => {
  //display window
  document.querySelector(".user-lookup-window").style.display = "flex";
  let table = document
    .querySelector(".user-lookup-window")
    .querySelector(".user-lookup-table");
  if (table.children.length <= 1) {
    //get the data from idb
    const request = indexedDB.open("initData", 1);

    request.onsuccess = () => {
      console.log("initDatabase for users opened successfully");
      const db = request.result;
      const transaction = db.transaction("usersStore", "readonly");
      const store = transaction.objectStore("usersStore");

      const users = store.getAll();
      users.onsuccess = () => {
        for (let i = 0; i < users.result.length; i++) {
          let row = document.createElement("tr");
          row.innerHTML = `
             <td><button type="button" id="us-sel-btn" class="del-ed-btn"></button></td>
             <td>${users.result[i].firstName}</td>
             <td>${users.result[i].lastName}</td>
             <td>${users.result[i].userID}</td>
            <td>${users.result[i].department}</td>
            <td>${users.result[i].plant}</td>
            <td></td>`;
          //fill the table
          table.appendChild(row);
        }
      };
    };
  }
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
      });
    } else {
      selekt.disabled = true;
    }
  }
  e.preventDefault();
});

/***************** ADD COMMENT/SHOW COMMENT SECTION ***************************/

document.querySelector(".add-comment-btn").addEventListener("click", e => {
  let userChoice = document.querySelector("#user-id");
  document.querySelector(".new-comment-section").classList.toggle("show");
  let label = document.querySelector(".comment-label");
  if (userChoice.options[userChoice.selectedIndex]) {
    label.innerText = userChoice.options[userChoice.selectedIndex].text;
  }
  e.preventDefault();
});

/***************** ADD COMMENT/SHOW COMMENT SECTION ***************************/

document.querySelector("#user-id").addEventListener("change", e => {
  let userChoice = document.querySelector("#user-id");
  let label = document.querySelector(".comment-label");
  label.innerText = userChoice.options[userChoice.selectedIndex].text;
});

document.querySelector(".post-comment").addEventListener("click", e => {
  let userChoice = document.querySelector("#user-id");
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
/***************** RESTRIC CERTAIN DATES IN VALIDFROM DATEPICKER ***************************/
document.getElementById("validf").addEventListener("change", e => {
  document
    .getElementById("validt")
    .setAttribute("min", `${document.getElementById("validf").value}`);
});
//vice versa
document.getElementById("validt").addEventListener("change", e => {
  document
    .getElementById("validf")
    .setAttribute("max", `${document.getElementById("validt").value}`);
});
/***************** UPLOAD COMPLETE CERTIFICATE FORM ***************************/

document.querySelector("#uploadBtn").addEventListener("click", e => {
  if (top.location.pathname == "/nc_form.html") {
    //SUPPLIER
    let supplier, certype, validf, validt, participants, comments, example;
    supplier = document.getElementById("suppl-inp").value;
    if (!supplier) {
      document.querySelector(".supplier-lookup-window").style.display = "flex";
      alert("You must select supplier from the lookup table!!!");
      e.preventDefault();
    }
    //DATUM od
    validf = document
      .getElementById("validf")
      .value.split("-")
      .reverse()
      .join("-");
    //DATUM do
    validt = document
      .getElementById("validt")
      .value.split("-")
      .reverse()
      .join("-");
    //CERT TYPE
    // document.getElementById('ctype').value //svaki item ima value opcija osim prvog koji je ''
    let select = document.getElementById("ctype");
    certype = select.options[select.options.selectedIndex].innerText;

    //UZETI USER IDEVE DODANIH PARTICIPANATA
    let rows = document
      .querySelector(".participants-table")
      .getElementsByTagName("tr");
    let userids = [];
    Array.from(rows).forEach(row => {
      userids.push(row.children[3].innerText);
    });
    userids.shift();
    participants = userids;

    //UZETI SVE KOMENTARE KAO OBJEKTE I STRPATI U NIZ OBJEKATA
    let commdivs = document.querySelectorAll(".each-comment");
    let commarr = [];
    if (commdivs) {
      Array.from(commdivs).forEach(commdiv => {
        let commobj = {};
        commobj[commdiv.firstElementChild.innerText] =
          commdiv.lastElementChild.innerText;
        commarr.push(commobj);
      });
      comments = commarr;
    }

    //UZETI HASH OZNAKU
    example = window.location.hash;

    if (supplier && certype && validf && validt) {
      if (example != "#ex1" && example != "#ex2" && example != "#ex3") {
        example = "#ex1";
      }
      //dodati u bazu
      const request = indexedDB.open("data", 1);

      request.onsuccess = () => {
        console.log("Database opened successfully");
        const db = request.result;
        const transaction = db.transaction("certificatesStore", "readwrite");
        const store = transaction.objectStore("certificatesStore");

        const supplierIndex = store.index("supplier");
        const certificateTypeIndex = store.index("certificateType");
        const validFromIndex = store.index("validFrom");
        const validToIndex = store.index("validTo");
        const assignedUsersIndex = store.index("assignedUsers");
        const certificateCommentsIndex = store.index("certificateComments");
        const exampleIndex = store.index("example");

        const addCert = store.put({
          supplier: supplier,
          certificateType: certype,
          validFrom: validf,
          validTo: validt,
          assignedUsers: participants,
          certificateComments: comments,
          example: example,
        });
        addCert.onsuccess = e => {
          console.log("Certificate added sucessfully!");
        };
      };
    }
  }
});
