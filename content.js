let currentSpeech = null;

// LISTENER
chrome.runtime.onMessage.addListener((request) => {

  if (request.action === "readPage") {
    window.speechSynthesis.cancel();
    let text = document.body.innerText;
    currentSpeech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(currentSpeech);
  }

  if (request.action === "stopReading") {
    window.speechSynthesis.cancel();
  }

  if (request.action === "voiceControl") {
    startVoiceControl();
  }

  if (request.action === "contrast") {
    enableHighContrast();
  }

  if (request.action === "fontSize") {
    increaseFontSize();
  }
  if (request.action === "decreaseFont") {
  decreaseFontSize();
}

  if (request.action === "simplify") {
    simplifyLayout();
  }

  if (request.action === "scan") {
    scanAccessibilityIssues();
  }

});

// VOICE CONTROL
function startVoiceControl() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";

  recognition.onresult = function(event) {
    let command = event.results[event.results.length - 1][0].transcript.toLowerCase();

    if (command.includes("scroll down")) {
      window.scrollBy(0, 400);
    }

    if (command.includes("scroll up")) {
      window.scrollBy(0, -400);
    }
  };

  recognition.start();
}

// HIGH CONTRAST
function enableHighContrast() {
  document.querySelectorAll("*").forEach(el => {
    el.style.backgroundColor = "black";
    el.style.color = "white";
  });
}

// FONT SIZE
let zoomLevel = 1;

function increaseFontSize() {
  zoomLevel += 0.1;
  document.body.style.zoom = zoomLevel;
}
function decreaseFontSize() {
  zoomLevel -= 0.1;
  document.body.style.zoom = zoomLevel;
}


// SIMPLIFY LAYOUT
function simplifyLayout() {
  document.querySelectorAll("img, video, aside, footer").forEach(el => {
    el.style.display = "none";
  });
}

// AI SCAN
function scanAccessibilityIssues() {
  let smallText = 0;
  let lowContrast = 0;

  document.querySelectorAll("*").forEach(el => {
    let style = window.getComputedStyle(el);

    if (parseFloat(style.fontSize) < 12) {
      smallText++;
    }

    if (style.color === style.backgroundColor) {
      lowContrast++;
    }
  });

  alert(
    "AI Scan Complete!\n\n" +
    "Small Text Elements: " + smallText + "\n" +
    "Low Contrast Elements: " + lowContrast
  );
}
