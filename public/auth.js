

// const firebaseConfig = {
//   apiKey: "AIzaSyBHn7CvUWOlsb8bcllmJf26oKuYlg-8iD0",
//   authDomain: "myratracker.firebaseapp.com",
//   databaseURL: "https://myratracker.firebaseio.com",
//   projectId: "myratracker",
//   storageBucket: "myratracker.appspot.com",
//   messagingSenderId: "963863783283",
//   appId: "1:963863783283:web:a7870808c47d3c64ad8706",
//   measurementId: "G-H29MTQ7S45"
// };

// firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", async event => {



})
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
      .then(result => {
          const user = result.user;
          // document.write(`Hey ${user.displayName}`);
          window.location.href = "/index.html" ;
          console.log(user);
      })
      .catch(console.log)
}

function signOut() {
  firebase.auth().signOut().then(function() {
      console.log(`Signed Out`)
      window.location.href = "/login.html" ;
    }).catch(function(error) {
      console.log(error)
    });
}
