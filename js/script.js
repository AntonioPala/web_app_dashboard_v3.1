const bell = document.getElementById('bell');
const bellPath = document.getElementById('bell-path');
const bellContainer = document.getElementsByClassName('bell-container')[0];
const messageDiv = document.getElementById('messages');
const messages = messageDiv.getElementsByClassName('message');
const noNotifications = document.getElementById('no-notifications');
const unreadMessages = document.getElementsByClassName('unread-message');
const readMessages = document.getElementsByClassName('read-message');
const markUnread = document.getElementsByClassName('mark-unread');
const undo = document.getElementById('undo');
const previous = document.getElementById('previous');
const x = document.getElementsByClassName('x');
const xAuto = document.getElementsByClassName('x x-auto');

let removed = 0;

bell.addEventListener('click', () => {
  if (messageDiv.style.display === '') {
    messageDiv.style.display = 'inline-block';
  } else {
      messageDiv.style.display = '';
  }
  for (let i = 0; i < messages.length; i++) {
    if (removed === 0 && messages[i].style.display !== 'none') {
      undo.style.display = 'none';
    }
  }
  if (removed !== messages.length) {
    noNotifications.style.display = 'none';
  }
})

bell.addEventListener('mouseenter', () => {
  bellPath.style.fill = 'white';
})

bell.addEventListener('mouseleave', () => {
  bellPath.style.fill = 'lightgrey';
})

for (let i = 0; i < messages.length; i++) {
  messages[i].addEventListener('click', (e) => {
    if (e.target.className.indexOf('message') >= 0) {
      const message = e.target;
      if (message.className === 'message unread-message') {
        message.className = 'message read-message';
        message.firstElementChild.style.display = 'inline-block';
      }
      if (messages.length === readMessages.length) {
        bellContainer.className = 'container';
        bell.style.animation = 'none';
      }
      messages[i].firstElementChild.nextElementSibling.className = 'x';
    }
  })
}

for (let i = 0; i < x.length; i++) {
  markUnread[i].addEventListener('click', (e) => {
    bellContainer.className = 'bell-container';
    bell.style.animation = '';
    e.target.parentNode.className = 'message unread-message';
    e.target.style.display = 'none';
    e.target.nextElementSibling.className = 'x x-auto';
  });
}

function spanEventHandler(span, unread) {
  span.addEventListener('click', () => {
    removed = messages.length - unreadMessages.length; /*This line of code makes the unreadNotifications element appear again*/
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].className === 'message unread-message') {
        messages[i].style.display = '';
        if (unreadMessages.length !== messages.length) {
          undo.style.display = '';
        }
      }
    }
    messageDiv.removeChild(unread);
  })
}

for (let i = 0; i < x.length; i++) {
  x[i].addEventListener('click', (e) => {
    const message = e.target.parentNode;
    message.style.display = 'none';
    removed += 1;
    if (removed >= 1) {
      undo.style.display = '';
    }
    if (unreadMessages.length > 0 && removed === messages.length) {
      undo.style.display = 'none';
      const unreadNotifications = document.createElement('p');
      unreadNotifications.className = 'unread-notifications';
      unreadNotifications.innerHTML = `You have
      <span id="previous" class="new-span" style="margin-right: 2px;">${unreadMessages.length}</span>
      unread notifications. <span class="close-message x x-auto">X</span>`;
      if (unreadMessages.length === 1) {
        unreadNotifications.innerHTML = `You have
        <span id="previous" class="new-span" style="margin-right: 2px;">${unreadMessages.length}</span>
        unread notification. <span class="close-message x x-auto">X</span>`;
      }
      const newSpan = unreadNotifications.getElementsByClassName('new-span')[0];
      const closeMessage = unreadNotifications.getElementsByClassName('close-message x x-auto');
      spanEventHandler(newSpan, unreadNotifications);
      for (let i = 0; i < closeMessage.length; i++) {
        closeMessage[i].addEventListener('click', () => {
          messageDiv.style.display = '';
        });
      }
      messageDiv.insertBefore(unreadNotifications, messageDiv.lastElementChild);
    }
    if (removed === messages.length && unreadMessages.length === 0) {
      noNotifications.style.display = '';
      undo.style.display = 'none';
    }
  })
}

previous.addEventListener('click', () => {
  removed = 0;
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.display = '';
  }
  noNotifications.style.display = 'none';
})

undo.addEventListener('click', () => {
  removed = 0;
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.display = '';
  }
  undo.style.display = 'none';
})
