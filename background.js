let isDoggos = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({isDoggos: false}, function() {
    console.log('No newsworthy Doggos-- yet!');
  });
});
