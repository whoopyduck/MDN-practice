const verseChoose = document.querySelector("select");
const poemDisplay = document.querySelector("pre");

verseChoose.addEventListener("change", () => {
  const verse = verseChoose.value;
  updateDisplay(verse);
});

function updateDisplay(verse){
    verse = verse.replace(" ", "").toLowerCase();
    const url = `${verse}.txt`;
    console.log(verse)
}