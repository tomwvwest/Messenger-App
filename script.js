const listOfContacts = [
  {name: 'Tom', conversation: [{direction: 'sent', message: 'Hello'}, {direction: 'received', message: 'Hello2'}]}, 
  {name: 'Lara', conversation: [{direction: 'received', message: 'Hello'}, {direction: 'sent', message: 'Hello2'}]}, 
  {name: 'Ryan', conversation: [{direction: 'sent', message: 'Hello'}, {direction: 'sent', message: 'Hello2'}]}
];

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

const listOfChatsElement = document.querySelector('.list-of-chats');
listOfChatsElement.innerHTML = generateChatList();
