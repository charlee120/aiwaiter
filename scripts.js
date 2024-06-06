const voiceMenuBtn = document.getElementById("voice-menu-btn");
const menuItems = document.getElementById("menu-items");
const voiceOrderBtn = document.getElementById("voice-order-btn");
const orderInput = document.getElementById("order-input");
const submitOrderBtn = document.getElementById("submit-order-btn");
const suggestionSection = document.getElementById("suggestion-section");
const suggestionInput = document.getElementById("suggestion-input");
const submitSuggestionBtn = document.getElementById("submit-suggestion-btn");
const dataConsentDialog = document.getElementById("data-consent-dialog");
const confirmationDialog = document.getElementById("confirmation-dialog");
const preparationAnimation = document.getElementById("preparation-animation");
const voiceFeedbackBtn = document.getElementById("voice-feedback-btn");
const feedbackInput = document.getElementById("feedback-input");
const submitFeedbackBtn = document.getElementById("submit-feedback-btn");

// Define sample menu items
const menu = [
    "Grilled Chicken",
    "Vegetable Stir Fry",
    "Pasta ",
    "Steak",
    "Chicken Biriyani",
    "Pulav",
    "Margherita Pizza",
    "Salad",
    "Burger",
    "Naan",
    "Panner masala"
];
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    orderInput.value = transcript;
};

// Voice menu button
voiceMenuBtn.addEventListener("click", () => {
    // List menu items
    menuItems.innerHTML = ""; // Clear previous items
    menu.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        menuItems.appendChild(listItem);
    });
    menuItems.classList.remove("hidden");
    document.getElementById("order-section").classList.remove("hidden");
});

voiceOrderBtn.addEventListener("click", () => {
    recognition.start();
});

submitOrderBtn.addEventListener("click", () => {
    const orderText = orderInput.value;
    document.getElementById("order-section").classList.add("hidden");
    suggestionSection.classList.remove("hidden");
});

submitSuggestionBtn.addEventListener("click", () => {
    const suggestionText = suggestionInput.value;
    console.log("Dietary preferences or restrictions:", suggestionText);
    suggestionSection.classList.add("hidden");
    dataConsentDialog.classList.remove("hidden");
});

document.getElementById("consent-yes").addEventListener("click", () => {
    dataConsentDialog.classList.add("hidden");
    confirmationDialog.classList.remove("hidden");
});

document.getElementById("consent-no").addEventListener("click", () => {
    dataConsentDialog.classList.add("hidden");
    confirmationDialog.classList.remove("hidden");
});

document.getElementById("confirm-yes").addEventListener("click", () => {
    confirmationDialog.classList.add("hidden");
    preparationAnimation.classList.remove("hidden");
    setTimeout(() => {
        preparationAnimation.classList.add("hidden");
        document.getElementById("feedback-section").classList.remove("hidden");
    }, 5000); // Simulate preparation time
});

document.getElementById("confirm-no").addEventListener("click", () => {
    confirmationDialog.classList.add("hidden");
    document.getElementById("order-section").classList.remove("hidden");
});

voiceFeedbackBtn.addEventListener("click", () => {
    recognition.start();
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        feedbackInput.value = transcript;
    };
});

submitFeedbackBtn.addEventListener("click", () => {
    const feedbackText = feedbackInput.value;
    console.log("Feedback submitted:", feedbackText);
    alert("Thank you for your feedback!");
});