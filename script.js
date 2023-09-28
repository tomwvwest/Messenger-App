const savedCurrentContact = localStorage.getItem('currentContact');
const listOfContacts = [
  {name: 'Tom', photo: 'icons/Tom.jpeg', conversation: [{direction: 'sent', message: 'Hello'}, {direction: 'received', message: 'Hello1'}]}, 
  {name: 'Lara', photo: 'icons/Lara.jpeg', conversation: [{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'}]}, 
  {name: 'Ryan',photo: 'icons/Ryan.jpeg', conversation: [{direction: 'sent', message: 'Hello'}, {direction: 'sent', message: 'Hello3'}]},
  {name: 'Luca', photo: 'icons/Luca.jpeg', conversation: [{direction: 'sent', message: 'Hello'}, {direction: 'sent', message: 'Hello3'},{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'},{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'},{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'},{direction: 'received', message: 'All Saints badminton club is a Badminton England affiliated club for the Rickmansworth, Croxley Green and Chorleywood area offering club and match play for adults over the age of 18.'}, {direction: 'sent', message: 'All Saints badminton club is a Badminton England affiliated club for the Rickmansworth, Croxley Green and Chorleywood area offering club and match play for adults over the age of 18.'},{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'},{direction: 'sent', message: 'Hello'}, {direction: 'sent', message: 'Hello3'},{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'},{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'},{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'},{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'All Saints badminton club is a Badminton England affiliated club for the Rickmansworth, Croxley Green and Chorleywood area offering club and match play for adults over the age of 18.'}]}
];

const listOfChatsElement = document.querySelector('.list-of-chats');
listOfChatsElement.innerHTML = generateChatList();
const conversationMessagesElement = document.querySelector('.conversation-messages-box');
const conversationContactName = document.querySelector('.conversation-title-left-box');
const contactColumnTop = document.querySelector('.contact-column-top');
const messageToSend = document.querySelector('.send-message-input');
const sendButton = document.querySelector('.send-icon-background');


// Code for selecting which contact to view
let currentContact = savedCurrentContact;
console.log(currentContact);
function setupEventListeners(){
  document.querySelectorAll('.chat-box').forEach((button) => {
    const contactNameElement = button.querySelector('.chat-box-name');
    if(currentContact === contactNameElement.textContent){
      button.style.backgroundColor = 'rgb(234,234,234)';
    }
    conversationMessagesElement.innerHTML = generateConversation(currentContact);
  
    button.addEventListener('click', () => {
      document.querySelectorAll('.chat-box').forEach((chatBox) => {
        chatBox.style.backgroundColor = '';
      });
      const contactNameElement = button.querySelector('.chat-box-name');
      if(currentContact !== contactNameElement.textContent){
        messageToSend.value = '';
      }
      currentContact = contactNameElement.textContent;
      localStorage.setItem('currentContact', currentContact);
      console.log(currentContact);
      button.style.backgroundColor = 'rgb(234,234,234)';
      conversationMessagesElement.innerHTML = generateConversation(currentContact);
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    })
  })

  messageToSend.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
      addMessage()
    }
  })
}
setupEventListeners();

// Function to generate the conversation HTML and photos 
function generateConversation(contact){
  let listOfMessagesHTML = '';
  for(const contactName of listOfContacts){
    if(contact === contactName['name']){
      conversationContactName.innerHTML = `<div class="conversation-title-box-profile-pic"><img class="profile-image" src="${contactName['photo']}"></div>
    <div class="conversation-title-name">${contact}</div>`
    contactColumnTop.innerHTML = `<div class="contact-column-profile-pic"><img class="profile-image" src="${contactName['photo']}"></div>
  <div class="contact-column-name">${contact}</div>`
      for(const message of contactName['conversation']){
        if(message['direction']==='sent'){
          listOfMessagesHTML += `<div class="sent-message-box message-box">
          <div class="sent-message message">${message['message']}</div>
        </div>`
        }
        else{
          listOfMessagesHTML += `<div class="received-message-box message-box">
          <div class="received-message message">${message['message']}</div>
        </div>`
        }

      }
      return listOfMessagesHTML
    }
    }
  }

// Function to generate the chat list HTML
function generateChatList() {
  let listOfChatsHTML = '';
  for(const contact of listOfContacts) {
    let recentMessage = '';
    if(contact['conversation'][contact['conversation'].length - 1]['direction'] === 'sent'){
      recentMessage = 'You: ' + contact['conversation'][contact['conversation'].length - 1]['message']
    } else{
      recentMessage = contact['conversation'][contact['conversation'].length - 1]['message']
    }
    if(recentMessage.length>35){
      recentMessage = recentMessage.slice(0,35) + '...'
    }
    listOfChatsHTML += 
      `<div class="chat-box">
        <div class="chat-box-left">
          <div class="profile-pic"><img class="profile-image" src="${contact['photo']}"></div>
        </div>
        <div class="chat-box-right">
          <div class="chat-box-name">${contact['name']}</div>
          <div class="chat-box-recent">${recentMessage}</div>
        </div>
      </div>`;
  }
  return listOfChatsHTML;
}


sendButton.addEventListener('click', addMessage);
function addMessage(){
  for(const contact of listOfContacts){
    if(contact['name'] === currentContact){
      if(messageToSend.value === ''){
        return
      }
      contact['conversation'].push({direction: 'sent', message: `${messageToSend.value}`})
      messageToSend.value = '';
      console.log(messageToSend.value)
      console.log(currentContact)
      conversationMessagesElement.innerHTML = generateConversation(currentContact);
      listOfChatsElement.innerHTML = generateChatList();
      setupEventListeners();
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
  return
}

//make scroller start at bottom
const scrollContainer = document.querySelector('.conversation-messages-box');
scrollContainer.scrollTop = scrollContainer.scrollHeight;
