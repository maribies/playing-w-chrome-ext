let isDoggos = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({isDoggos: false}, function() {
    console.log('Not newsworthy Doggos-- yet!');
  });
});