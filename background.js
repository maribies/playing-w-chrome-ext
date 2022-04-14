let isDoggos = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({isDoggos: false}, function() {
    console.log('No newsworthy Doggos-- yet!');
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message = 'doggos') {
    getDoggos(sendResponse);
  }
  return true;
});

function getDoggos(sendResponse) {
let url = "https://api.twitter.com/2/tweets/search/recent?query=from%3Adog_rates";

fetch(url, { method: "GET", headers: 
  { "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8" ,
    "Authorization": "Bearer <TOKEN>"
  }
}
).then(function(response) {
  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: ' +
      response.status);
    sendResponse(response);
    return;
  }

  response.json().then(function(data) {
    console.log('data', data);
    sendResponse({data: data.data});
  });
}
).catch(error => {console.log('Error:', error); sendResponse(error)});
}
