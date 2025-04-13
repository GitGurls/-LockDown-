const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copymsg]");
const lengthSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate");
const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");

const symbols = '!@#$%^&*()_+=-[]{}|;:,.<>?';
let password = "";
let passwordLength = 10;

// Update length display
function handleSlider() {
    lengthSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
handleSlider();

lengthSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

// Random Generators
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandomInteger(0, 10);
}

function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}

function generateSymbol() {
    return symbols[getRandomInteger(0, symbols.length)];
}

// Set Indicator Color
function setIndicator(color) {
    indicator.style.backgroundColor = color;
}

// Calculate strength
function calcStrength() {
    let hasUpper = uppercaseCheck.checked;
    let hasLower = lowercaseCheck.checked;
    let hasNum = numbersCheck.checked;
    let hasSym = symbolsCheck.checked;

}
// Copy to clipboard
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        alert("Password copied!");
    } catch (e) {
        alert("Failed to copy");
    }
}

// Shuffle function
function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});

generateBtn.addEventListener("click", () => {
    if (passwordLength <= 0) return;

    let funcArr = [];
    if (uppercaseCheck.checked) funcArr.push(generateUpperCase);
    if (lowercaseCheck.checked) funcArr.push(generateLowerCase);
    if (numbersCheck.checked) funcArr.push(generateRandomNumber);
    if (symbolsCheck.checked) funcArr.push(generateSymbol);

    if (funcArr.length === 0) return;

    password = "";

    // Compulsory addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    // Remaining addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    // Shuffle
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;

    calcStrength();
});

const toggleBtn = document.getElementById("modeToggle");

toggleBtn.addEventListener("change", () => {
  document.body.classList.toggle("light");
});