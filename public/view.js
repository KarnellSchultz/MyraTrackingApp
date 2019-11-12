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
          archived: false,
          tickets: [{
              title,
              body,
              status
          }],
          archive: [{

          }]
      },
      methods: {
        updateStatus: function(index, tempKeyIndex) {
            console.log("logging when updateStatus is clicked")
            if (this.tickets[index].status == 'To Do' ) {
                this.tickets[index].status = "In Progress"
                console.log( this.tickets[index].status, 'before')
                writeUserTicketData(tempKeyIndex, this.tickets[index].status)
                console.log( this.tickets[index].status, 'after')
            } else {
                this.tickets[index].status = "Done";
                writeUserTicketData(tempKeyIndex, this.tickets[index].status)
            }
        },
        archiveIt: function(index, tempKeyIndex) {
            console.log(index, tempKeyIndex)
            this.archive = true;
            this.tickets[index].status = 'archived';
            writeUserTicketData(tempKeyIndex, this.tickets[index].status)
        }
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

        ticketCard.tickets.push({keyIndex:key, title:vueTitle, body:vueBody, status:vueStatus})
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

