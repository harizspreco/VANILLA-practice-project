let langChoice = document.getElementById("lang-id");
let langOptions = document.querySelectorAll("option");
let home = document.getElementById("homenav");
let mlearning = document.getElementById("mlearningnav");
let language = document.querySelector(".lang");
let en = document.querySelector(".en");
let de = document.querySelector(".de");
let homescreen = document.querySelector("#homescreen");
let ncbtn = document.querySelector(".new-cert-btn");

langChoice.addEventListener("change", e => {
  let selected = langChoice.options[langChoice.selectedIndex];
  let attr = selected.getAttribute("language");
  home.textContent = langdata[attr].homenav;
  mlearning.textContent = langdata[attr].mlearningnav;
  language.textContent = langdata[attr].lang;
  en.textContent = langdata[attr].en;
  de.textContent = langdata[attr].de;
  ncbtn.textContent = langdata[attr].ncbtn;
});
document.body.addEventListener("change", e => {
  let selected = langChoice.options[langChoice.selectedIndex];
  let attr = selected.getAttribute("language");
  let table = document.getElementById("html-data-table");
  let sp = document.getElementById("sp");
  let ct = document.getElementById("ct");
  let vf = document.getElementById("vf");
  let vt = document.getElementById("vt");
  if (table) {
    sp.textContent = langdata[attr].sp;
    ct.textContent = langdata[attr].ct;
    vf.textContent = langdata[attr].vf;
    vt.textContent = langdata[attr].vt;
  }
});

let langdata = {
  english: {
    homenav: "Home",
    mlearningnav: "Machine Learning",
    lang: "Language",
    en: "English",
    de: "German",
    homescreen: "Start",
    ncbtn: "New certificate",
    sp: "Supplier",
    ct: "Certificate type",
    vf: "Valid from",
    vt: "Valid to",
  },
  german: {
    homenav: "Start",
    mlearningnav: "Maschinelles Lernen",
    lang: "Sprache",
    en: "Englisch",
    de: "Deutsch",
    homescreen: "Startseite",
    ncbtn: "Neues Zertifikat",
    sp: "Anbieter",
    ct: "Art des Zertifikats",
    vf: "Gültig ab",
    vt: "Gültig bis",
  },
};
