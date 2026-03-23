let recognition;
let isListening = false;

// SPEAK FUNCTION
function speak(text){
let speech = new SpeechSynthesisUtterance(text);
speech.lang = "en-US";
speech.rate = 1;
speech.pitch = 1;
speechSynthesis.speak(speech);
}

// ADD MESSAGE TO UI
function addMessage(msg){
document.getElementById("chat").innerHTML += "<p>"+msg+"</p>";
}

// SEND COMMAND TO PYTHON BACKEND
async function sendCommand(cmd){
let res = await fetch("http://127.0.0.1:5000/command",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({cmd:cmd})
});
let data = await res.json();
return data.reply;
}

// START JARVIS
function startJarvis(){

if(isListening) return;

recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = "en-US";

recognition.start();
isListening = true;

speak("Jarvis activated");

recognition.onresult = async function(event){

let command = event.results[event.results.length - 1][0].transcript.toLowerCase();

addMessage("You: " + command);

// BASIC COMMANDS (FRONTEND FAST RESPONSE)

if(command.includes("stop listening")){
recognition.stop();
isListening = false;
speak("Jarvis stopped");
return;
}

if(command.includes("time")){
let time = new Date().toLocaleTimeString();
speak("Time is " + time);
addMessage("Jarvis: " + time);
return;
}

// BACKEND COMMANDS

let reply = await sendCommand(command);

speak(reply);
addMessage("Jarvis: " + reply);

};

recognition.onerror = function(){
speak("Error occurred");
};

}
