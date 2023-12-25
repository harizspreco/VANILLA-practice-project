// CREATING AND ADDING INITAL DATA IN DATABASE THAT CANNOT BE ADDED BY USER
(function () {
  const openDB = indexedDB.open("initData", 1);
  openDB.onupgradeneeded = function () {
    const db = openDB.result;
    //create initial suppliers
    let suppliersStore;
    if (!db.objectStoreNames.contains("suppliersStore")) {
      suppliersStore = db.createObjectStore("suppliersStore", {
        keyPath: "supplierID",
        unique: true,
        autoIncrement: true,
      });

      suppliersStore.createIndex("supplierName", ["supplierName"], {
        unique: true,
      });

      suppliersStore.createIndex("supplierCity", ["supplierCity"], {
        unique: false,
      });

      suppliersStore.put({
        supplierName: "HareCompany",
        supplierCity: "Tesanj",
      });
      suppliersStore.put({
        supplierName: "AdoCompåany",
        supplierCity: "Tuzla",
      });
      suppliersStore.put({
        supplierName: "Microsoft",
        supplierCity: "NewYork",
      });
      suppliersStore.put({
        supplierName: "Google",
        supplierCity: "Washington",
      });
      suppliersStore.put({ supplierName: "Tes", supplierCity: "Tuzla" });
      suppliersStore.put({
        supplierName: "TopCompany",
        supplierCity: "Sarajevo",
      });
      suppliersStore.put({ supplierName: "FBD Gmbh", supplierCity: "Munich" });
    }
    //create initial users
    let usersStore;
    if (!db.objectStoreNames.contains("usersStore")) {
      usersStore = db.createObjectStore("usersStore", {
        keyPath: "userID",
        unique: true,
        autoIncrement: true,
      });

      usersStore.createIndex("firstName", ["firstName"], {
        unique: false,
      });

      usersStore.createIndex("lastName", ["lastName"], {
        unique: false,
      });

      usersStore.createIndex("department", ["department"], {
        unique: false,
      });
      usersStore.createIndex("plant", ["plant"], {
        unique: false,
      });

      usersStore.put({
        firstName: "Hariz",
        lastName: "Spreco",
        department: "IFB/IM",
        plant: "093",
      });
      usersStore.put({
        firstName: "Ado",
        lastName: "Dev",
        department: "IFB/IM",
        plant: "093",
      });
      usersStore.put({
        firstName: "Adin",
        lastName: "Spreco",
        department: "IFB/IM",
        plant: "093",
      });
      usersStore.put({
        firstName: "Almo",
        lastName: "Dev",
        department: "IFB/IM",
        plant: "093",
      });
      usersStore.put({
        firstName: "Saban",
        lastName: "Sabi",
        department: "IFN/IG",
        plant: "094",
      });
      usersStore.put({
        firstName: "John",
        lastName: "Doe",
        department: "IFN/IG",
        plant: "094",
      });
    }
    //create initial users
    let certificateTypesStore;
    if (!db.objectStoreNames.contains("certificateTypesStore")) {
      certificateTypesStore = db.createObjectStore("certificateTypesStore", {
        keyPath: "cerTypeID",
        unique: true,
        autoIncrement: true,
      });

      certificateTypesStore.createIndex("cerTypeName", ["cerTypeName"], {
        unique: true,
      });

      certificateTypesStore.put({ cerTypeName: "CCC Certificate" });
      certificateTypesStore.put({ cerTypeName: "CNC Certificate" });
      certificateTypesStore.put({ cerTypeName: "PoP Certificate" });
      certificateTypesStore.put({ cerTypeName: "AfES Certificate" });
      certificateTypesStore.put({ cerTypeName: "DUI Certificate" });
      certificateTypesStore.put({ cerTypeName: "PNUI Certificate" });
    }
  };
  openDB.onsuccess = function (e) {
    console.log("Initial data added sucessfully");
    const db = openDB.result;
    db.close();
  };
})();
