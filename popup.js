function sendAction(action) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: action});
  });
}

document.getElementById("read").onclick = () => sendAction("readPage");
document.getElementById("stop").onclick = () => sendAction("stopReading");
document.getElementById("voice").onclick = () => sendAction("voiceControl");
document.getElementById("contrast").onclick = () => sendAction("contrast");
document.getElementById("font").onclick = () => sendAction("fontSize");
document.getElementById("decrease").onclick = () => sendAction("decreaseFont");
document.getElementById("simplify").onclick = () => sendAction("simplify");
document.getElementById("scan").onclick = () => sendAction("scan");
