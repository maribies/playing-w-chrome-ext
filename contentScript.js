chrome.runtime.sendMessage('doggos', (response) => {
  console.log('received data', response);
  // initializeUI(response);
});