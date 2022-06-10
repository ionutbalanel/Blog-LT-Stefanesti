// Sursa - https://console.firebase.google.com/project/blog-scoala/settings/general/web:OTU1ZTg5MzgtZWFkMC00YzEyLWE5MzYtOTA5NTE0M2U4YzNj
const firebaseConfig = {
  apiKey: "AIzaSyCbLxjHaEHGXTgRKOxNglKrXtCv1XQeBRA",
  authDomain: "blog-scoala.firebaseapp.com",
  projectId: "blog-scoala",
  storageBucket: "blog-scoala.appspot.com",
  messagingSenderId: "757091921193",
  appId: "1:757091921193:web:996b854b04575c9c591b38",
};
// Sursa - https://console.firebase.google.com/project/blog-scoala/settings/general/web:OTU1ZTg5MzgtZWFkMC00YzEyLWE5MzYtOTA5NTE0M2U4YzNj

function mobileMenu() {
  var x = document.getElementById("navbar");
  if (x.className === "") {
    x.className = "mobile";
  } else {
    x.className = "";
  }
}

const yearElement = document.getElementById("year");

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const postaretBtn = document.getElementById("postare-btn");
const salutare = document.getElementById("username");

let user = null;
let admins = ["dM71j4GTkBNFmUgqfDPkslgJYWf2"];

// setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

// referinta la serviciul de autentificare
const auth = firebase.auth();

// referinta la baza de date
const db = firebase.firestore();

//referinta la colectie de postari din BD
const postariDb = db.collection("postari");

// alegem providerul de logare -> Google
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function () {
  console.log("logare...");
  auth.signInWithPopup(provider).then(function () {
    window.location.reload();
  });
};
logoutBtn.onclick = function () {
  auth.signOut();
  window.location.reload();
};

function isAdmin() {
  let admin;

  if (user == null) return false;

  admin = admins.includes(user.uid); /// true or false

  return admin;
}
auth.onAuthStateChanged(function (fuser) {
  user = fuser;
  console.log(user);
  if (user != null) {
    //logat in sistem
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";

    salutare.innerHTML = "Salutare, " + user.displayName;

    if (isAdmin() == true) {
      postaretBtn.style.display = "block";
    } else {
      postaretBtn.style.display = "none";
    }
  } else {
    // nu este logat in sistem
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
    postaretBtn.style.display = "none";
  }
  document.querySelector("body").style.display = "block";
});
function formatDate(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  let result = day + "-" + month + "-" + year;

  return result;
}

if (yearElement) {
  let date = new Date();

  yearElement.innerHTML = date.getFullYear() + " ©";
}
