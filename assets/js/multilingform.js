//MULTILINGUAL OPTION IN NC_FORM.HTML PAGE

let langdata = {
  english: {
    user: "User:",
    lang: "Language",
    en: "English",
    de: "German",
    nc: "New Certificate",
    supl: "Supplier",
    ctypel: "Certificate type",
    vfl: "Valid from",
    vtl: "Valid to",
    upbtn: "Upload",
    addpl: "Assigned users",
    addpart: "Add participants",
    fn: "First Name",
    ln: "Last Name",
    uid: "User ID",
    dep: "Department",
    pl: "Plant",
    addcombtn: "New Comment",
    sfs: "Search for suppliers",
    sfp: "Search for persons",
    sc: "Search criteria",
    sn: "Supplier Name",
    si: "Supplier Index",
    cn: "City",
    search: "Search",
    reset: "Reset",
    sl: "Suplier List",
    pli: "Person List",
    select: "Select",
    cancel: "Cancel",
    postcom: "Comment",
  },
  german: {
    user: "Benutzer:",
    lang: "Sprache",
    en: "Englisch",
    de: "Deutsch",
    nc: "Neues Zertifikat",
    supl: "Lieferant",
    ctypel: "Art des Zertifikats",
    vfl: "Gültig ab",
    vtl: "Gültig bis",
    upbtn: "Hochladen",
    addpl: "Zugewiesene Benutzer",
    addpart: "Teilnehmer hinzufügen",
    fn: "Vorname",
    ln: "Nachname",
    uid: "Benutzer-ID",
    dep: "Abteilung",
    pl: "Pflanze",
    addcombtn: "Neuer Kommentar",
    sfs: "Lieferanten suchen",
    sfp: "Personen suchen",
    sc: "Suchkriterien",
    sn: "Lieferantenname",
    si: "Lieferantenverzeichnis",
    cn: "Stadt",
    search: "Suche",
    reset: "Zurücksetzen",
    sl: "Lieferantenliste",
    pli: "Personenliste",
    select: "Auswählen",
    cancel: "Abbrechen",
    postcom: "Kommentar",
  },
};

let langChoice = document.getElementById("lang-id");
let user = document.querySelector(".user");
let language = document.querySelector(".lang");
let en = document.querySelector(".en");
let de = document.querySelector(".de");
let nc = document.querySelector(".cert-name");
let supl = document.getElementById("sp");
let ctypel = document.getElementById("ct");
let vfl = document.getElementById("vf");
let vtl = document.getElementById("vt");
let upbtn = document.getElementById("uploadBtn");
let addpl = document.getElementById("addpl");
let addpart = document.getElementById("addpart");
let fn = document.querySelectorAll(".fn"); //
let ln = document.querySelectorAll(".ln"); //
let uid = document.querySelectorAll(".uid"); //
let dep = document.querySelectorAll(".dep"); //
let pl = document.querySelectorAll(".pl"); //
let addcombtn = document.querySelector(".add-comment-btn");
let sfs = document.getElementById("sfs");
let sfp = document.getElementById("sfp");
let sc = document.querySelectorAll(".sc"); //
let sn = document.querySelectorAll(".sn");
let si = document.querySelectorAll(".si");
let cn = document.querySelectorAll(".cn");
let search = document.querySelectorAll(".search"); //
let reset = document.querySelectorAll(".reset"); //
let sl = document.getElementById("sl"); //
let pli = document.getElementById("pli"); //
let select = document.querySelectorAll(".select-btn"); //
let cancel = document.querySelectorAll(".cancel-btn"); //
let postcom = document.querySelector(".post-comment");

langChoice.addEventListener("change", e => {
  let selected = langChoice.options[langChoice.selectedIndex];
  let attr = selected.getAttribute("language");

  user.textContent = langdata[attr].user;
  language.textContent = langdata[attr].lang;
  en.textContent = langdata[attr].en;
  de.textContent = langdata[attr].de;
  nc.textContent = langdata[attr].nc;
  sp.textContent = langdata[attr].supl;
  ct.textContent = langdata[attr].ctypel;
  vf.textContent = langdata[attr].vfl;
  vt.textContent = langdata[attr].vtl;
  upbtn.textContent = langdata[attr].upbtn;
  addpl.textContent = langdata[attr].addpl;
  addpart.textContent = langdata[attr].addpart;
  postcom.textContent = langdata[attr].postcom;
  fn.forEach(n => (n.textContent = langdata[attr].fn));
  ln.forEach(n => (n.textContent = langdata[attr].ln));
  uid.forEach(n => (n.textContent = langdata[attr].uid));
  dep.forEach(n => (n.textContent = langdata[attr].dep));
  pl.forEach(n => (n.textContent = langdata[attr].pl));
  addcombtn.textContent = langdata[attr].addcombtn;
  if (
    document.querySelector(".supplier-lookup-window").style.display == "flex"
  ) {
    sfs.textContent = langdata[attr].sfs;
    sc.forEach(n => (n.textContent = langdata[attr].sc));
    sn.forEach(n => (n.textContent = langdata[attr].sn));
    si.forEach(n => (n.textContent = langdata[attr].si));
    cn.forEach(n => (n.textContent = langdata[attr].cn));
    search.forEach(n => (n.textContent = langdata[attr].search));
    reset.forEach(n => (n.textContent = langdata[attr].reset));
    sl.textContent = langdata[attr].sl;
    select.forEach(n => (n.textContent = langdata[attr].select));
    cancel.forEach(n => (n.textContent = langdata[attr].cancel));
  }
  if (document.querySelector(".user-lookup-window").style.display == "flex") {
    sfp.textContent = langdata[attr].sfp;
    sc.forEach(n => (n.textContent = langdata[attr].sc));
    fn.forEach(n => (n.textContent = langdata[attr].fn));
    ln.forEach(n => (n.textContent = langdata[attr].ln));
    uid.forEach(n => (n.textContent = langdata[attr].uid));
    dep.forEach(n => (n.textContent = langdata[attr].dep));
    pl.forEach(n => (n.textContent = langdata[attr].pl));
    search.forEach(n => (n.textContent = langdata[attr].search));
    reset.forEach(n => (n.textContent = langdata[attr].reset));
    pli.textContent = langdata[attr].pli;
    select.forEach(n => (n.textContent = langdata[attr].select));
    cancel.forEach(n => (n.textContent = langdata[attr].cancel));
  }
  if (
    document.querySelector(".new-comment-section").classList.contains("show")
  ) {
    postcom.textContent = langdata[attr].postcom;
  }
});

let openSupWin = document.querySelector(".btn-open");
openSupWin.addEventListener("click", e => {
  let selected = langChoice.options[langChoice.selectedIndex];
  let attr = selected.getAttribute("language");

  sfs.textContent = langdata[attr].sfs;
  sc.forEach(n => (n.textContent = langdata[attr].sc));
  sn.forEach(n => (n.textContent = langdata[attr].sn));
  si.forEach(n => (n.textContent = langdata[attr].si));
  cn.forEach(n => (n.textContent = langdata[attr].cn));
  search.forEach(n => (n.textContent = langdata[attr].search));
  reset.forEach(n => (n.textContent = langdata[attr].reset));
  sl.textContent = langdata[attr].sl;
  select.forEach(n => (n.textContent = langdata[attr].select));
  cancel.forEach(n => (n.textContent = langdata[attr].cancel));
});

let openUsWin = document.querySelector("#addpart");
openUsWin.addEventListener("click", e => {
  let selected = langChoice.options[langChoice.selectedIndex];
  let attr = selected.getAttribute("language");

  sfp.textContent = langdata[attr].sfp;
  sc.forEach(n => (n.textContent = langdata[attr].sc));
  fn.forEach(n => (n.textContent = langdata[attr].fn));
  ln.forEach(n => (n.textContent = langdata[attr].ln));
  uid.forEach(n => (n.textContent = langdata[attr].uid));
  dep.forEach(n => (n.textContent = langdata[attr].dep));
  pl.forEach(n => (n.textContent = langdata[attr].pl));
  search.forEach(n => (n.textContent = langdata[attr].search));
  reset.forEach(n => (n.textContent = langdata[attr].reset));
  pli.textContent = langdata[attr].pli;
  select.forEach(n => (n.textContent = langdata[attr].select));
  cancel.forEach(n => (n.textContent = langdata[attr].cancel));
});
