const nameInput = document.getElementById(`my-name-input`);
const messageInput = document.getElementById(`my-message`);
const sendButton = document.getElementById(`send-button`);
const chatBox = document.getElementById(`chat`);

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
    return `
      <div class="mine messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${formattedTime}
        </div>
      </div>
    `;
  } else {
    return `
      <div class="yours messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${message.sender} ${formattedTime}
        </div>
      </div>
    `;
  }
}

function fetchMessages() {
  return [
    {
      id: 1,
      text: `This is a message from Opal :)`,
      sender: `Opal Shah`,
      timestamp: 1537410673072
    },
    {
      id: 2,
      text: `This is another message from Opal`,
      sender: `Opal Shah`,
      timestamp: 1537410673072
    },
    {
      id: 3,
      text: `This is a message from the system`,
      sender: `System`,
      timestamp: 1537410673072
    }
  ];
}

function updateMessagesInChatBox() {
  const myName = nameInput.value;
  const messages = fetchMessages();
  let formattedMessages = ``;

  messages.forEach(message => {
    formattedMessages += formatMessage(message, myName);
  });
  chatBox.innerHTML = formattedMessages;
}
updateMessagesInChatBox();

function sendMessages(sender, text) {
  const newMessage = {
    id: Date.now(), 
    sender: sender,
    text: text,
    timestamp: new Date().getTime() 
  };

  const formattedMessage = formatMessage(newMessage, sender);
  chatBox.innerHTML += formattedMessage;
}

sendButton.addEventListener(`click`, function(event) {
  event.preventDefault();
  const sender = nameInput.value;
  const message = messageInput.value;
  sendMessages(sender, message);
  messageInput.value = ``;
});


