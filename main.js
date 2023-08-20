/*
---- make the levels with a select box
---- add words to each level
---- add 3 seconds to yhe fisrt word only
---- save the score in local storage
---- break the logic
*/

let wordsObj = {
  easy: [
    "apple",
    "banana",
    "orange",
    "grape",
    "kiwi",
    "pear",
    "peach",
    "plum",
    "melon",
    "pineapple",
    "mango",
    "cherry",
    "strawberry",
    "blueberry",
    "raspberry",
    "blackberry",
    "lemon",
    "lime",
    "watermelon",
    "coconut",
    "apricot",
    "nectarine",
    "guava",
    "persimmon",
    "papaya",
  ],
  normal: [
    "elephant",
    "giraffe",
    "zebra",
    "lion",
    "tiger",
    "cheetah",
    "leopard",
    "jaguar",
    "panther",
    "lynx",
    "cougar",
    "bobcat",
    "serval",
    "ocelot",
    "aardvark",
    "hyena",
    "warthog",
    "gazelle",
    "antelope",
    "buffalo",
    "bison",
    "moose",
    "reindeer",
    "zebu",
    "yak",
    "okapi",
  ],
  hard: [
    "chocolate",
    "strawberry",
    "blueberry",
    "raspberry",
    "blackberry",
    "cranberry",
    "pomegranate",
    "gooseberry",
    "lingonberry",
    "elderberry",
    "boysenberry",
    "mulberry",
    "currant",
    "kiwifruit",
    "passion fruit",
    "dragon fruit",
    "durian",
    "lychee",
    "mangosteen",
    "rambutan",
    "jackfruit",
    "breadfruit",
    "guava",
    "papaya",
    "star fruit",
    "kiwi",
    "quince",
    "avocado",
    "pineapple",
    "coconut",
  ],
};

let words = [];

let levels = {
  easy: 6,
  normal: 4,
  hard: 2,
};

let levelSpan = document.querySelector(".level");
let secondsSpan = document.querySelector(".seconds");
let startBtn = document.querySelector(".start");
let wordContainer = document.querySelector(".the-word");
let input = document.getElementById("input");
let upCommingContainer = document.querySelector(".up-comming");
let timeSpan = document.querySelector(".time span");
let theScore = document.querySelector(".your-score");
let totalScore = document.querySelector(".total");

input.onpaste = () => false;
let selectedLevel = document.getElementById("levels");
let defaultLevel = "easy";
let defaultLevelTime = levels[defaultLevel];
fillHtml(defaultLevel, defaultLevelTime);
selectedLevel.oninput = () => {
  defaultLevel = selectedLevel.value;
  defaultLevelTime = levels[selectedLevel.value];
  fillHtml(defaultLevel, defaultLevelTime);
};

function fillHtml(defLevel, defLevelTime) {
  levelSpan.innerHTML = defLevel;
  secondsSpan.innerHTML = defLevelTime;
  timeSpan.innerHTML =
    theScore.innerHTML == 0 ? defLevelTime + 3 : defLevelTime;
  words = wordsObj[defLevel];
  totalScore.innerHTML = words.length;
}

startBtn.addEventListener("click", (e) => {
  e.target.remove();
  input.focus();
  genWords();
});

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let randomWordIndex = words.indexOf(randomWord);
  words.splice(randomWordIndex, 1);
  wordContainer.innerHTML = randomWord;
  upCommingContainer.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let upCommingWord = `<div>${words[i]}</div>`;
    upCommingContainer.innerHTML += upCommingWord;
  }
  startPalying();
}

function startPalying() {
  timeSpan.innerHTML = theScore.innerHTML == 0 ? defaultLevelTime + 3 : defaultLevelTime;;
  let start = setInterval(() => {
    timeSpan.innerHTML--;
    if (timeSpan.innerHTML === "0") {
      clearInterval(start);
      if (wordContainer.innerHTML === input.value.toLowerCase()) {
        input.value = "";
        theScore.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          document.querySelector("footer p").innerHTML = "congratulations";
          document.querySelector("footer p").style.color = "slateblue";
          document.querySelector("footer button").style.backgroundColor =
            "slateblue";
          document.querySelector("footer button").innerHTML = "play again";
          document.querySelector("footer").style.display = "block";
        }
      } else {
        document.querySelector("footer").style.display = "block";
      }
    }
  }, 1000);
}
