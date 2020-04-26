const
  wordEl = document.getElementById('word'),
  guessEl = document.getElementById('guess'),
  wrongLettersEl = document.getElementById('wrong-letters'),
  playAgainBtn = document.getElementById('play-button'),
  popup = document.getElementById('popup-container'),
  notification = document.getElementById('notification-container'),
  finalMessage = document.getElementById('final-message'),
  figureParts = document.querySelectorAll('.figure-part');


// Word Arrays
let obj = [
  {
    word: "елка",
    guess: "Зимой и летом одним цветом"
  },
  {
    word: "замок",
    guess: "не лает, не кусает, а в дом не пускает"
  },
  {
    word: "огурец",
    guess: "без окон, без дверей полна горница людей"
  },
];


let randomPick = obj[Math.floor(Math.random() * obj.length)];

let answerRandom = randomPick.word;
let guessRandom = randomPick.guess;

const correctLetters = [];
const wrongLetters = [];

function displayNewWord() {
  wordEl.innerHTML = `
  ${answerRandom
      .split("")
      .map(letter => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>`)
      .join('')}
  `;
  guessEl.innerHTML = `${guessRandom}`;
  console.log(answerRandom);

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === answerRandom) {
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
    if (answerRandom.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters
          .push(letter);
        displayNewWord();
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
  randomPick = obj[Math.floor(Math.random() * obj.length)];
  answerRandom = randomPick.word;
  guessRandom = randomPick.guess;
  displayNewWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});






console.log(`
Answer is: ${answerRandom}
Guess is: ${guessRandom}`);

displayNewWord();