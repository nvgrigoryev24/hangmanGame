const
  wordEl = document.getElementById('word'),
  wrongLettersEl = document.getElementById('wrong-letters'),
  playAgainBtn = document.getElementById('play-button'),
  popup = document.getElementById('popup-container'),
  notification = document.getElementById('notification-container'),
  finalMessage = document.getElementById('final-message'),
  figureParts = document.querySelectorAll('.figure-part');


// Word Arrays
const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
      .split("")
      .map(letter => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>`)
      .join('')}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Gratz! You won!';
    popup.style.display = "flex";
  }
}

function updateWrongLettersEl() {

  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ""}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
    if (figureParts.length == errors) {
      finalMessage.innerText = 'You have LOST!';
      popup.style.display = "flex";
    }
  });
}

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', (e) => {
  const key = e.keyCode;
  if (key >= 65 && key <= 90 || key === 219 || key === 221 || key === 186 || key === 222 || key === 220 || key === 188 || key === 190) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
        console.log(`Correct Letters: `, correctLetters);
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        console.log(`Wrong Letters: `, wrongLetters);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart the game and play again
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});

displayWord();