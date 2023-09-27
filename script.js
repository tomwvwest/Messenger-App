const listOfContacts = [
  {name: 'Tom', conversation: [{direction: 'sent', message: 'Hello'}, {direction: 'received', message: 'Hello1'}]}, 
  {name: 'Lara', conversation: [{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'}]}, 
  {name: 'Ryan', conversation: [{direction: 'sent', message: 'Hello'}, {direction: 'sent', message: 'Hello3'}]}
];

const listOfChatsElement = document.querySelector('.list-of-chats');
listOfChatsElement.innerHTML = generateChatList();
const conversationMessagesElement = document.querySelector('.conversation-messages-box');

// Code for selecting which contact to view
let currentContact = listOfContacts[0]['name'];
console.log(currentContact);
document.querySelectorAll('.chat-box').forEach((button) => {
  const contactNameElement = button.querySelector('.chat-box-name');
  if(currentContact === contactNameElement.textContent){
    button.style.backgroundColor = 'rgb(234,234,234)';
  }

  button.addEventListener('click', () => {
    document.querySelectorAll('.chat-box').forEach((chatBox) => {
      chatBox.style.backgroundColor = '';
    });
    const contactNameElement = button.querySelector('.chat-box-name');
    currentContact = contactNameElement.textContent;
    console.log(currentContact);
    button.style.backgroundColor = 'rgb(234,234,234)';
    conversationMessagesElement.innerHTML = generateConversation(currentContact);
  })
})



function generateConversation(contact){
  let listOfMessagesHTML = '';
  for(const contactName of listOfContacts){
    if(contact === contactName['name']){
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
      console.log(listOfMessagesHTML)
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
    listOfChatsHTML += 
      `<div class="chat-box">
        <div class="chat-box-left">
          <div class="profile-pic"></div>
        </div>
        <div class="chat-box-right">
          <div class="chat-box-name">${contact['name']}</div>
          <div class="chat-box-recent">${recentMessage}</div>
        </div>
      </div>`;
  }
  return listOfChatsHTML;
}

//make scroller start at bottom
const scrollContainer = document.querySelector('.conversation-messages-box');
scrollContainer.scrollTop = scrollContainer.scrollHeight;
