document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  console.log(app);

})

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)

      .then(result => {
          const user = result.user;
          document.write(`Hey ${user.displayName}`);
          console.log(user);
      })
      .catch(console.log)
}

function signOut() {
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      console.log(error)
    });
}

