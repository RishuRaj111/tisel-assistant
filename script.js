let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.volume=1;
    text_speak.lang="hi-US"
    // console.log(window.SpeechSynthesis.getVoices()[99].name)
    
    
//    text_speak.name= 'Microsoft Amina Online (Natural) - Arabic (Algeria)'
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day = new Date();
    let hours= day.getHours();
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours<16 ){
        speak("Good Afternoon Sir")
    }
    else{
        speak("Good Evening Sir")
    }
}
 window.addEventListener('load',()=>{
    wishMe()
    console.log("Running wishMe...")
 })

//  function populateVoiceList() {
//     if (typeof speechSynthesis === "undefined") {
//       return;
//     }
  
//     const voices = speechSynthesis.getVoices();
  
//     for (let i = 0; i < voices.length; i++) {
//       const option = document.createElement("option");
//       option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
//       if (voices[i].default) {
//         option.textContent += " — DEFAULT";
//       }
  
//       option.setAttribute("data-lang", voices[i].lang);
//       option.setAttribute("data-name", voices[i].name);
//       document.getElementById("voiceSelect").appendChild(option);
//     }
//   }
  
//   populateVoiceList();
//   if (
//     typeof speechSynthesis !== "undefined" &&
//     speechSynthesis.onvoiceschanged !== undefined
//   ) {
//     speechSynthesis.onvoiceschanged = populateVoiceList;
//   }

 

 let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
 let recognition = new speechRecognition()
 recognition.onresult = ((event)=>{
    console.log(event)
    // let currentIndex = event.resultIndex
    let transcript = event.results[0][0].transcript
    content.innerText = transcript
   takeCommand(transcript.toLowerCase())
    console.log(transcript)
    
    })
 recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};
 btn.addEventListener('click',()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
 })

 
 function takeCommand(message){
    btn.style.display="flex"
    voice.style.display="none"
    if(message.includes("hello") || message.includes("hey") || message.includes("hi")){
        speak("Hello sir,how can i help you")
    }
    else if(message.includes("who are you?")){
        speak("I am a AI assistant. I can help you with various tasks like searching, weather forecast, news etc.")
    }
    else if(message.includes("open youtube")){
        speak("opening youtube")
        window.open("https://youtube.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("opening whatsapp")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
        let time = new Date().toLocaleTimeString(undefined,{hours:"numeric",minutes:"numeric"})
        speak(time)
    }
    
    else if(message.includes("date")){
        let date = new Date().toLocaleDateString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }
    else{
        // Remove unwanted keywords like the AI's name before searching
        let unwantedKeywords = ["tisel", "tyson", "t cell", "diesel"];
        
        // Create a regular expression to match any unwanted keywords
        let regex = new RegExp(unwantedKeywords.join("|"), "gi");

        // Clean the message by removing unwanted keywords
        let cleanedMessage = message.replace(regex, "").trim();

        // Respond and perform a search if there's any text left
        if (cleanedMessage) {
            let finalText = "This is what I found on the internet regarding " + cleanedMessage;
            speak(finalText);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(cleanedMessage)}`, "_blank");
        } else {
            speak("I couldn't understand your request. Please try again.");
        }
    }
 }  

 