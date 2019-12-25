
let createTicketVue = new Vue({
    el: '#createTicketVue',
    data: {
      title: '',
      body: 'NoBodyContent',
      selected: '1'
    },
    methods: {
            vueTicketCreater: function() {
                if(this.title == '') {
                    alert("Enter a title before submitting a new ticket")
                } else {
                console.log(this.title, this.body)
                if(this.selected == 1) {
                    this.selected = "To Do"
                } else if (this.selected == 2) {
                    this.selected = "In Progress"
                } else if (this.selected == 3) {
                    this.selected = "Done"
                } else {
                    alert(`You've selected a incorrect option. Try again`)
                }
                createNewTicket(this.title, this.body, this.selected)
                this.title = "";
                this.selected = 1;
                }
            }
    }
  })




  let ticketCard = new Vue({
      el: '#ticketCard',
      data: {
          tickets: [{
              title,
              body,
              status,
              edit:false
          }],
          archive: [{

          }],
          ticketCounter: {
              toDo: 0,
              inProgress: 0,
              done: 0
          }
      },
      methods: {
        updateStatus: function(index, tempKeyIndex) {
            if (this.tickets[index].status == 'To Do' ) {
                this.tickets[index].status = "In Progress"
                writeUserTicketData(tempKeyIndex, this.tickets[index].status)
            } else {
                this.tickets[index].status = "Done";
                writeUserTicketData(tempKeyIndex, this.tickets[index].status)
            }
        },
        regressStatus: function(index, tempKeyIndex) {
            if (this.tickets[index].status == 'Done' ) {
                this.tickets[index].status = "In Progress"
                writeUserTicketData(tempKeyIndex, this.tickets[index].status)
            } else {
                this.tickets[index].status = "To Do";
                writeUserTicketData(tempKeyIndex, this.tickets[index].status)
                // console.log(this.tickets[index].status)
            }
        },
        dropStatusUpdate: function(index, tempKeyIndex, updatedStatus){
            this.tickets[index].status = updatedStatus;
            writeUserTicketData(tempKeyIndex, this.tickets[index].status)
        },
            archiveIt: function(index, tempKeyIndex) {
            console.log(index, tempKeyIndex)
            this.archive = true;
            this.tickets[index].status = 'archived';
            writeUserTicketData(tempKeyIndex, this.tickets[index].status)
        },
        shownToggle: function(index, tempKeyIndex) {
           console.log(`show toggle`)
           console.log('1-'+ this.tickets[index].edit, this.tickets[index].title);
           this.tickets[index].edit ? this.tickets[index].edit = false : this.tickets[index].edit = true;
           console.log(this.tickets[index].edit, this.tickets[index].title);
        },
        updateTicketTitleContent: function(index, tempKeyIndex) {
            this.shownToggle(index);
            writeUserTicketTitleData(tempKeyIndex, this.tickets[index].title)
        }, 
      }
  })


async function addNewTicketToVue() {
    clearVue();
    console.log(userSpecificTickets)
try {
    let keys = Object.keys(userSpecificTickets[0]); //gets only tickets that are made by the logged in user. 
    console.log(keys)

    for(let i = 0; i <= keys.length - 1 ; i += 1) {
        let key = keys[i];
        console.log(userSpecificTickets[0][key])
        let vueTitle = userSpecificTickets[0][key].title;
        let vueBody = userSpecificTickets[0][key].body;
        let vueStatus = userSpecificTickets[0][key].status;
        let vueEdit = userSpecificTickets[0][key].edit

        ticketCard.tickets.push({keyIndex:key, title:vueTitle, body:vueBody, status:vueStatus, edit:vueEdit})
    }    
        userSpecificTickets = []; //clears the userSpecificTickets arr so that it can be used again next time this is called
        keys = [];
    } catch(err) {
    console.log('No Tickets yet. Vuew.js')
    }
}

function clearVue() {
    ticketCard.tickets = []
}




function onDragStart(event) {
    console.log('DragStart')
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  
    event
      .currentTarget
      .style
      .backgroundColor = 'lightgrey';

      event.currentTarget.style.border = "1px dashed grey";
  }
  
  function onDragOver(event) {
      console.log('dragover')
      event.preventDefault();
  }

function onDrop(event, status) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');

    let elements = id.split(',');
    console.log(elements[0], elements[1], elements[3]);
    ticketCard.dropStatusUpdate(elements[1], elements[0], status);
    // event.target.style.backgroundColor = "white"

    event.dataTransfer.clearData();
}

function dragEnterHandler(event) {
    console.log("dragEnter", event);

    // Change the source element's background color for enter events 
    // event.target.style.background = "lightgrey";
   }
   function dragLeaveHandler(event) {
    console.log("dragLeave");
    // Change the source element's border back to white
    // event.target.style.background = "white";
   }

   function dragEndHandler(event) {
    console.log("dragEnd");
    // event.currentTarget.backgroundColor = 'white'
    // event.currentTarget.backgroundColor = 'inherit'
    // Change the target element's background color to visually indicate 
    // the drag ended.
    // var el=document.getElementById("target");
   }

   function dragExitHandler(event) {
    console.log("dragExit");
    // Change the source element's border back to green to signify a dragexit event
    event.currentTarget.style.background = "green";
   }

function onDragEnd(event) {
    console.log("dragend")
    event.target.style.backgroundColor = "white"
    event.currentTarget.style.border = "1px solid lightgrey";
}


function dragInit() {
    console.log('dragINIT')
    const el=document.getElementById('dragSource')
    console.log(el.innerHTML)
    el.ondragenter = dragEnterHandler;
    el.ondragleave = dragLeaveHandler;
    el.ondragend = dragEndHandler;
    el.ondragexit = dragExitHandler;
}


function mouseMe(event) {
    console.log("BOOYYY")
    event.currentTarget.backgroundColor = "cornsilk"
}