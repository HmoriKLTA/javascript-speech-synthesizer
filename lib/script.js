// Create a new speech synthesis utterance object
const msg = new SpeechSynthesisUtterance();
// Array to hold available voices
let voices = [];
// Dropdown for selecting voice
const voicesDropdown = document.querySelector('[name="voice"]');
// Get all range inputs and the textarea for options (rate, pitch, text)
const options = document.querySelectorAll('[type="range"], [name="text"]');
// Speak and Stop buttons
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
// Set the initial text to speak from the textarea
msg.text = document.querySelector('[name="text"]').value;

// Populate the voices dropdown with available English voices
const populateVoices = (e) => {
    voices = e.currentTarget.getVoices();
    voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value ="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set the selected voice on the utterance object
const setVoice = (e) => {
    msg.voice = voices.find(voice => voice.name === e.currentTarget.value);
}

// Speak or stop speaking, depending on the argument
const toggle = (startOver = true) => {
    speechSynthesis.cancel(); // Stop any current speech
    if(startOver) {
        speechSynthesis.speak(msg); // Start speaking
    }
}

// Update utterance options (rate, pitch, text) and restart speech
const setOption = (e) => {
    msg[e.currentTarget.name] = e.currentTarget.value;
    toggle();
}

// Listen for voiceschanged event to populate the dropdown
speechSynthesis.addEventListener('voiceschanged', populateVoices);
// Listen for changes in the voice dropdown
voicesDropdown.addEventListener('change', setVoice);
// Listen for changes in range inputs and textarea
options.forEach(option => option.addEventListener('change', setOption));
// Listen for Speak button click
speakButton.addEventListener('click', toggle);
// Listen for Stop button click
stopButton.addEventListener('click', () => toggle(false));

