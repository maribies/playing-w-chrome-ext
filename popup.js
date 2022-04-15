// Selector for changing the images and text to doggos
let changeToDoggos = document.getElementById("changeToDoggos");

chrome.storage.sync.get("isDoggos", ({ isDoggos }) => {
  setExtensionImage(isDoggos);
});

function setExtensionImage(isDoggos) {
  // FIXME: These should not be hardcoded.
  !isDoggos ? 
    changeToDoggos.style = "background-image: url('https://pbs.twimg.com/profile_images/1478141668159148033/IOD8SZvx_400x400.jpg');" 
    : changeToDoggos.style = "background-color: red;";
};

// When the button is clicked, inject setPagetoDoggos into current page
changeToDoggos.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.get("isDoggos", ({ isDoggos }) => {
    chrome.storage.sync.set({isDoggos: !isDoggos}, function() {
      setExtensionImage(isDoggos);
    });
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPagetoDoggos,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPagetoDoggos() {
  chrome.storage.sync.get("isDoggos", ({ isDoggos }) => {
    const images = [...document.querySelectorAll("img"), ...document.querySelectorAll("picture > *[srcset]")];

    // TODO: Need to select and replace images and text here.
    // Just placeholders for now.
    const doggoImg = "https://pbs.twimg.com/profile_images/1478141668159148033/IOD8SZvx_400x400.jpg";
    if (!isDoggos) {
      // Just reload the page if the extension is clicked again.
      location.reload();
    } else {
      document.body.style.backgroundColor = 'violet';
      images.map(i => {
        i.src = doggoImg;
        i.srcset = doggoImg;
      });
    }
  });
}