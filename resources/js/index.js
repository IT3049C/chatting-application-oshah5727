const nameInput = document.getElementById(`my-name-input`);
const messageInput = document.getElementById(`my-message`);
const sendButton = document.getElementById(`send-button`);
const chatBox = document.getElementById(`chat`);
const serverURL = `https://it3049c-chat.fly.dev/messages`;


async function fetchMessages() {
  try {
    const response = await fetch(serverURL);
    if (!response.ok) throw new Error(`Failed to fetch messages`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching messages:`, error);
    return [];  
  }
}

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


async function updateMessagesInChatBox() {
  const myName = nameInput.value;
  const messages = await fetchMessages();
  let formattedMessages = ``;

  messages.forEach(message => {
    formattedMessages += formatMessage(message, myName);
  });
  chatBox.innerHTML = formattedMessages;
}

updateMessagesInChatBox();

const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessagesInChatBox, MILLISECONDS_IN_TEN_SECONDS);


async function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  };

  try {
    const response = await fetch(serverURL, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify(newMessage)
    });

    if (!response.ok) {
      throw new Error(`Failed to send message`);
    }

    await updateMessagesInChatBox();
    messageInput.value = ``;  
  } catch (error) {
    console.error(`Error sending message:`, error);
  }
}

sendButton.addEventListener(`click`, function(event) {
  event.preventDefault();
  const sender = nameInput ? nameInput.value : ``;
  const message = messageInput ? messageInput.value : ``;
  
  if (message.trim()) {
    sendMessages(sender, message);
  }

  updateMessagesInChatBox();

});