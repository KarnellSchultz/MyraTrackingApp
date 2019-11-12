

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
