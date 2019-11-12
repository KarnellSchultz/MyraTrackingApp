

let name, email, photoUrl, uid, emailVerified, profileData;
let userSpecificTickets = [];
let userProfile = {};

firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
    setUserProfileInfo(user);
    init()
  }
});


function init() {
  let database = firebase.database();
  let ref = database.ref("tickets");
  ref.on("value", gotData, errData);
}


//setting username and profile image
let leadHeader = document.getElementById("lead-header"); // adding username to the page at login
let usernameHeading = document.getElementById("username-heading");
let profileImg = document.getElementById("profileImg");

function setUserProfileInfo(user) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;

  userProfile = {
    name,
    email,
    photoUrl,
    emailVerified,
    uid
  };
  FNAME = name.split(" ")[0];
  usernameHeading.innerHTML = `<button class="badge badge-pill badge-primary "> ${FNAME} </button>`;
  profileImg.innerHTML = `<img id="profileImg" src=" ${photoUrl} " alt="user profile picture from google. it's presented in a circle" 
    class="rounded-circle"
    width="50"
    height="50">`;
}

let title, body, status;

async function createNewTicket(tempTitleText, tempBodyText, tempStatus) {
  console.log("new ticket in the making");
  let newTicket = new Ticket(name, tempTitleText, tempBodyText, tempStatus);
  storeTicket(newTicket);
  return newTicket;
}

function storeTicket(tempTicketData, profile) {
  console.log(tempTicketData, 'this is it fam')
  let database = firebase.database();
  let tickets = database.ref("tickets/" + uid);
  tempTicketData.profile = userProfile;

  tickets.push(tempTicketData, finished);
  function finished(error) {
    if (error) {
      console.log("ooops");
    } else {
      console.log(`User Data Saved`);
    }
  }
}

function gotData(data) {
  try {
    console.log('this is GOTDATA')
    const dbTickets = data.val();
    // Grab the keys to iterate over the object
    let u = firebase.auth().currentUser.uid;
    userSpecificTickets.push(dbTickets[u]);
    console.log(userSpecificTickets)
    addNewTicketToVue();
  } catch (error) {
    console.log("No user logged in. Log in to use this app");
  }
}

function writeUserTicketData(keyIndex, tempStatus) {
  console.log("Updating in the DB", tempStatus);
  console.log("info", uid, keyIndex);
  firebase
    .database()
    .ref(`tickets/${uid}/${keyIndex}/`)
    .update({
      status: tempStatus
    });
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}

class Ticket {
  constructor(username, title, body, status = "to-do") {
    this.username = username;
    this.title = title;
    this.body = body;
    this.status = status;
  }
  details() {
    return `${this.username} ${this.title} ${this.body} ${this.status}`;
  }
  updateStatus(newStatus) {
    this.status = newStatus;
    return this.status;
  }
  updtaeBody(newBody) {
    this.body = newBody;
    return this.body;
  }
  updtaeBody(newTitle) {
    this.title = newTitle;
    return this.title;
  }
  submitTicket() {}
}
