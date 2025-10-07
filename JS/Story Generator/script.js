// 1. COMPLETE VARIABLE DEFINITIONS AND RANDOM FUNCTION

const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS
let characters = [
    "Willy the Goblin",
    "Big Daddy",
    "Father Christmas"
]
let places = [
    "the soup kitchen",
    "Disneyland",
    "the White House"
]
let events = [ 
    "spontaneously combusted",
    "melted into a puddle on the sidewalk",
    "turned into a slug and slithered away"
]

// console.log(returnRandomStoryString());
// 3. PARTIAL RETURN RANDOM STRING FUNCTION

function returnRandomStoryString() {
  const randdomCharacter = randomValueFromArray(characters);
  // console.log(returnRandomStoryString());
  const randomPlace = randomValueFromArray(places);
  const randomEvent = randomValueFromArray(events);
  let storyText = `It was 94 Fahrenheit outside, so ${randdomCharacter} went for a walk. When they got to ${randomPlace}, they stared in horror for a few moments, then ${randomEvent}. Bob saw the whole thing, but was not surprised — ${randdomCharacter} weighs 300 pounds, and it was a hot day.`
  
  return storyText;
}

// console.log(returnRandomStoryString());
// 4. EVENT LISTENER AND PARTIAL GENERATE FUNCTION DEFINITION

generateBtn.addEventListener("click", generateStory);

function generateStory() {
  let newStory = returnRandomStoryString();
  if (customName.value !== "") {
    const name = customName.value;
    // let storyText = returnRandomStoryString();
    // console.log(storyText);
    newStory = newStory.replaceAll("Bob" , name);
    console.log(newStory);
  }

  if (document.getElementById("uk").checked) {
    const weight = Math.round(300 % 14) + " Stones";
    const temperature = Math.round((94 - 32) * 5/9) + " Celsius";
    newStory = newStory.replaceAll("300 pounds",weight);
    newStory = newStory.replaceAll("94 Fahrenheit" , temperature);
    console.log(weight)
  }
  
  // TODO: replace "" with the correct expression
  story.textContent = newStory;
  story.style.visibility = "visible";
}

console.log(returnRandomStoryString());