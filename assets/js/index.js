/******************  Navigacija ******************/

document.querySelector(".navigation-list").addEventListener("click", e => {
  //provjera jel kliknuto na main item ili sub item
  if (e.target.parentElement.classList.contains("item-box")) {
    //ako je na neki main item, blok koda

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

    document.querySelector("#homescreen").style.display = "none";
    document.querySelector("#table-view").style.display = "block";
  }
  e.preventDefault();
});

/*************** KONSTRUKTOR CERTIFIKATA I TABELA(example1, example2...) *****************/

function Certifikat(supplier, certType, validFrom, validTo) {
  this.supplier = supplier;
  this.certType = certType;
  this.validFrom = validFrom; //POSLIJE DODATI DATE IZ FORME PREKO DATE CONUSTRUCTOR
  this.validTo = validTo;
}

const certifikatNeki = new Certifikat(
  "HareCompany",
  "JFDcert",
  "2018-07-22",
  "2020-06-20"
);
const certifikatNeki2 = new Certifikat(
  "AdoCompany",
  "SDOcert",
  "2013-07-22",
  "2024-03-10"
);

const certifikatNekiEx2 = new Certifikat(
  "NekaCompany",
  "FDcert",
  "2018-07-22",
  "2020-06-20"
);
const certifikatNeki2Ex2 = new Certifikat(
  "GGCompany",
  "Ocert",
  "2013-07-22",
  "2024-03-10"
);

const ex1 = [certifikatNeki, certifikatNeki2, "ex1"];
const ex2 = [certifikatNekiEx2, certifikatNeki2Ex2, "ex2"];

const certBase = [ex1, ex2];

/******************  TABLE GENERATOR *********************/

document.querySelector(".navigation-list").addEventListener("click", e => {
  if (e.target.classList.contains("nav-item-child")) {
    // SVAKI PUT KAD SE KLIKNE DA SE PONOVO NAPRAVI TABELA, NE DA SE DODAJU REDOVI
    document.querySelector("#data-table").innerHTML = "";
    let cerTable = document.createElement("table");
    cerTable.id = "html-data-table";
    cerTable.innerHTML = `<tr>
         <th></th>
         <th>Supplier</th>
         <th>Certificate type</th>
         <th>Valid from </th>
         <th>Valid to</th>
         <th></th>
         </tr>`;
    let item = e.target;
    //provjerit koji je id itema
    //provjerit ima li podataka/niza za taj item
    //proci kroz bazu tabela/nizova
    //provjerit je li ijedna tabela/niz ima u sebi id itema

    for (let j = 0; j < certBase.length; j++) {
      if (certBase[j].includes(item.id)) {
        //ako ima, petljom proci kroz niz i svaki objekat da postane novi red tabele
        //ako nema ne radit nista jer ce svakako ispisat headere i button
        for (let i = 0; i < certBase[j].length - 1; i++) {
          let row = document.createElement("tr");
          row.innerHTML = `
            <td><div class="del-ed-btn">
                <img class="icon" src="assets/img/gear.png">
                <div class="del-ed-drd">
                    <a href="#" class="drd-link" id="drd-link-edit">Edit</a>
                    <a href="#" class="drd-link" id="drd-link-delete">Delete</a>
                </div>
            </div>
            </td>`;
          Object.values(certBase[j][i]).forEach(value => {
            let td = document.createElement("td");
            td.append(value);
            row.appendChild(td);
          });
          cerTable.appendChild(row);
        }
        document.querySelector("#data-table").appendChild(cerTable);
      }
    }
  }
  e.preventDefault();
});

/******************* GENERATING NEW TABLE ROW  ***********************/

/*document.querySelector(".navigation-list").addEventListener("click", e => {
    if (e.target.classList.contains("nav-item-child")) {
      let cerTable = document.querySelector("#html-data-table");
      //  PROVJERI AKO UOPSTE IMA PODATAKA DA SE PRAVI RED PRVO!!!
  
      let row = document.createElement("tr");
      row.innerHTML = `
      <td><div class="del-ed-btn">
          <img class="icon" src="assets/img/gear.png">
          <div class="del-ed-drd">
              <a href="#" class="drd-link">Edit</a>
              <a href="#" class="drd-link">Delete</a>
          </div>
      </div>
      </td>`;
      Object.values(certifikatNeki).forEach(value => {
        let td = document.createElement("td");
        td.append(value);
        row.appendChild(td);
      });
      cerTable.appendChild(row);
    }
  });*/

/************ TABLE GEAR BUTTON DROP MENU ********************/

/*document.querySelector("#table-view").addEventListener("click", e => {
  if (e.target.nextElementSibling.classList.contains("del-ed-drd")) {
    e.target.nextElementSibling.classList.toggle("show");
  }
  console.log(e.target);
  e.preventDefault();
});*/

document.querySelector("#data-table").addEventListener("click", e => {
  if (
    e.target.parentElement.lastElementChild.classList.contains("del-ed-drd")
  ) {
    let btn = e.target.parentElement.lastElementChild;
    e.target.parentElement.lastElementChild.classList.toggle("show");
    if (btn.classList.contains("show")) {
      btn.querySelector("#drd-link-delete").addEventListener("click", e => {
        btn.parentElement.parentElement.parentElement.remove();
        e.preventDefault();
      });
    }
  }
  e.preventDefault();
});
