/******************** INDEXEDDB *********************/
// 1
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}

const request = indexedDB.open("data", 1);

//2
request.onerror = err => {
  console.error("Somethin went wrong with indexedDB");
  console.error(err);
};

/**************** CREATING STORES ************************/
request.onupgradeneeded = function () {
  const db = request.result;
  /**************** CREATING CERTIFICATES STORE ************************/

  const certiciatesStore = db.createObjectStore("certificatesStore", {
    keyPath: "certificateID",
    unique: true,
    autoIncrement: true,
  });

  certiciatesStore.createIndex("supplier", ["supplier"], {
    unique: false,
  });
  certiciatesStore.createIndex("certificateType", ["certificateType"], {
    unique: false,
  });

  certiciatesStore.createIndex("validFrom", ["validFrom"], { unique: false });

  certiciatesStore.createIndex("validTo", ["validTo"], { unique: false });

  certiciatesStore.createIndex("example", ["example"], { unique: false });

  certiciatesStore.createIndex("assignedUsers", ["assignedUsers"], {
    unique: false,
  });

  certiciatesStore.createIndex("certificateComments", ["certificateComments"], {
    unique: false,
  });
};

//
request.onsuccess = function () {
  console.log("Database opened successfully");
  const db = request.result;
  db.close();
};

/******************  Navigacija ******************/

document.querySelector(".navigation-list").addEventListener("click", e => {
  //provjera jel kliknuto na main item ili sub item
  if (e.target.parentElement.classList.contains("item-box")) {
    //ako je na neki main item, blok koda
    window.location.href = `${window.location.origin}#`;
    let itemBox = e.target.parentElement;
    //provjeravamo je li home dugme koje mijenja prikaz na start
    if (itemBox.classList.contains("home")) {
      document.querySelector("#homescreen").style.display = "block";
      document.querySelector("#table-view").style.display = "none";
    }
    //provjeravamo jel vec aktivan item koji smo kliknuli
    if (itemBox.classList.contains("active")) {
      //ako jest vid cemo jel ima pod iteme i ako ima ugasit ih ili upalit, ako ne nista
      let nestedList = itemBox.nextElementSibling.nextElementSibling; //poditem lista
      //imal poditeme provjera
      if (nestedList != null) {
        //ako ima vidi jel prikazano trenutno,ako nije ukljuci, ako jest iskljuci
        if (nestedList.style.display === "none") {
          nestedList.style.display = "block";
        } else {
          nestedList.style.display = "none";
        }
        //deaktivirat subiteme
        document.querySelectorAll(".nav-item-child").forEach(item => {
          if (item.classList.contains("active")) {
            item.classList.remove("active");
          }
        });
      }
    } else {
      //ovaj blok je ako smo stisnuli na neki koji nije trenutno aktivan

      //treba prvo deaktivirat aktivan odnosno sve
      document.querySelectorAll(".item-box").forEach(item => {
        item.classList.remove("active");
        item.nextElementSibling.style.display = "none";
        if (item.nextElementSibling.nextElementSibling) {
          item.nextElementSibling.nextElementSibling.style.display = "none";
        }
      });

      //deaktivirat subiteme
      document.querySelectorAll(".nav-item-child").forEach(item => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });

      //zatim aktivirat ovaj koji smo kliknuli
      itemBox.classList.add("active");
      itemBox.nextElementSibling.style.display = "inline-block";
      if (itemBox.nextElementSibling.nextElementSibling) {
        itemBox.nextElementSibling.nextElementSibling.style.display = "block";
      }
    }
    //ako je kliknut sub item
  } else if (e.target.classList.contains("nav-item-child")) {
    let subItem = e.target;
    let subItems = document.querySelectorAll(".nav-item-child");
    //prvo deaktiviraj sve aktivne iteme
    subItems.forEach(item => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });
    //aktiviraj kliknuti item
    subItem.classList.add("active");
    window.location.href = `#${subItem.id}`;

    document.querySelector("#homescreen").style.display = "none";
    document.querySelector("#table-view").style.display = "block";

    let newCertLink = document.querySelector(".new-cert");
    newCertLink.addEventListener("click", e => {
      newCertLink.setAttribute("href", `/nc_form.html#${subItem.id}`);
    });
  }
  e.preventDefault();
});

/******************  TABLE GENERATOR *********************/

document.querySelector(".navigation-list").addEventListener("click", e => {
  if (e.target.classList.contains("nav-item-child")) {
    let contentDiv = document.querySelector("#data-table");
    while (contentDiv.firstChild) {
      contentDiv.removeChild(contentDiv.lastChild);
    }
    let table = document.createElement("table");
    table.id = "html-data-table";
    contentDiv.appendChild(table);
    let headerRow = document.createElement("tr");
    //pokusaj
    let langChoice = document.getElementById("lang-id");
    let selected = langChoice.options[langChoice.selectedIndex];
    let attr = selected.getAttribute("language");
    //
    headerRow.innerHTML = `
    <tr>
      <th></th>
      <th id="sp">${langdata[attr].sp}</th>
      <th id="ct">${langdata[attr].ct}</th>
      <th id="vf">${langdata[attr].vf}</th>
      <th id="vt">${langdata[attr].vt}</th>
      <th></th>
    </tr>`;
    table.appendChild(headerRow);

    const request = indexedDB.open("data", 1);

    request.onsuccess = () => {
      console.log("Database fron indexhtml opened successfully");
      const db = request.result;
      const transaction = db.transaction("certificatesStore", "readwrite");
      const store = transaction.objectStore("certificatesStore");
      const exIndex = store.index("example");
      const certificates = exIndex.getAll([`${window.location.hash}`]);
      certificates.onsuccess = () => {
        for (let i = 0; i < certificates.result.length; i++) {
          let row = document.createElement("tr");
          row.innerHTML = `
          <td>
          <div class="del-ed-btn">
          <img class="icon" src="assets/img/gear.png">
          <div class="del-ed-drd">
               <a href="#" class="drd-link" id="drd-link-edit">Edit</a>
               <a href="#" class="drd-link" id="drd-link-delete">Delete</a>
          </div>
          </div>
          </td>
          <td>${certificates.result[i].supplier}</td>
          <td>${certificates.result[i].certificateType}</td>
          <td>${certificates.result[i].validFrom}</td>
          <td>${certificates.result[i].validTo}</td>
          <td></td>`;
          //give the row id same as certificateID
          row.id = certificates.result[i].certificateID;
          //fill the table
          table.appendChild(row);
        }
      };
    };
  }
  e.preventDefault();
});

/************ TABLE GEAR BUTTON DROP MENU ********************/

document.querySelector("#data-table").addEventListener("click", e => {
  if (
    e.target.parentElement.lastElementChild.classList.contains("del-ed-drd")
  ) {
    let btn = e.target.parentElement.lastElementChild;
    Array.from(document.querySelectorAll(".del-ed-drd")).forEach(button => {
      if (button !== btn) {
        button.classList.remove("show");
      }
    });
    e.target.parentElement.lastElementChild.classList.toggle("show");
    if (btn.classList.contains("show")) {
      btn.querySelector("#drd-link-delete").addEventListener("click", e => {
        //remove cert from db
        const request = indexedDB.open("data", 1);

        request.onsuccess = () => {
          console.log("Database fron indexhtml-delete opened successfully");

          let idKey = parseInt(e.target.closest("tr").id);
          const db = request.result;
          const transaction = db.transaction("certificatesStore", "readwrite");
          const store = transaction.objectStore("certificatesStore");
          const certificate = store.delete(idKey);
          certificate.onsuccess = () => {
            btn.parentElement.parentElement.parentElement.remove();
            console.log("Certificate has been removed");
          };
        };
        e.preventDefault();
      });
      //
      const updateBtn = document
        .querySelector(".edit-cert-frame")
        .contentWindow.document.querySelector("#uploadBtn");
      updateBtn.id = "updateBtn";
      //
      btn.querySelector("#drd-link-edit").addEventListener("click", e => {
        document.querySelector(".edit-cert-frame-cont").style.display = "flex";
        const request = indexedDB.open("data", 1);

        request.onsuccess = () => {
          console.log("Database fron indexhtml-edit opened successfully");
          alert(
            "If you don't change certificate type, it will stay same as before!"
          );
          let idKey = parseInt(e.target.closest("tr").id);
          const db = request.result;
          const transaction = db.transaction("certificatesStore", "readwrite");
          const store = transaction.objectStore("certificatesStore");
          const certificate = store.get(idKey);
          certificate.onsuccess = () => {
            console.log(certificate.result);
            let frame =
              document.querySelector(".edit-cert-frame").contentWindow;
            frame.document.querySelector(
              ".add-participants-container"
            ).style.display = "none";
            frame.document.querySelector(".participants-table").style.display =
              "none";
            frame.document.querySelector(".comment-container").style.display =
              "none";

            /*********************************************** */
            let supplier, validf, validt;
            supplier = certificate.result.supplier;
            certype = certificate.result.certificateType;
            validf = certificate.result.validFrom
              .split("-")
              .reverse()
              .join("-");
            validt = certificate.result.validTo.split("-").reverse().join("-");

            //1
            frame.document.getElementById("suppl-inp").value = supplier;
            //2
            let select = frame.document.getElementById("ctype");
            select.addEventListener("click", e => {
              if (select.options.selectedIndex !== 0) {
                certificate.result.certificateType =
                  select.options[select.options.selectedIndex].innerText;
              }
            });
            //3
            frame.document.getElementById("validf").value = validf;
            //4
            frame.document.getElementById("validt").value = validt;

            /*********************************************** */
            // POTREBNO U EDIT VIEW DODATI ASSIGNED USERS I COMMENTS
            /*********************************************** */
            //vratiti updateovane podatke u bazu
            certificate.result.supplier =
              frame.document.getElementById("suppl-inp").value;
            certificate.result.validFrom = frame.document
              .getElementById("validf")
              .value.split("-")
              .reverse()
              .join("-");
            certificate.result.validTo = frame.document
              .getElementById("validt")
              .value.split("-")
              .reverse()
              .join("-");
            updateBtn.addEventListener("submit", e => {
              const certificateUpd = store.put(certificate.result, idKey);
              certificateUpd.onsuccess = event => {
                console.log("Certificate updated sucessfully!" + event);
              };
              e.preventDefault();
            });
            //UPDATE TRENUTNO NE RADI KAKO TREBA, A ZURIM NA FAKULTET
            //UPDATE TRENUTNO NE RADI KAKO TREBA, A ZURIM NA FAKULTET
            //UPDATE TRENUTNO NE RADI KAKO TREBA, A ZURIM NA FAKULTET
          };
        };
        e.preventDefault();
      });
    }
  }
  e.preventDefault();
});

/******************* EDIT EXIT ***************************/
document.querySelector(".edit-cert-frame-cont").addEventListener("click", e => {
  if (e.target !== document.querySelector(".edit-cert-frame")) {
    document.querySelector(".edit-cert-frame-cont").style.display = "none";
  }
});
