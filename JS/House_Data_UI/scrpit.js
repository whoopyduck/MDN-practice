const streetSelect = document.getElementById("choose-street");
const bedroomSelect = document.getElementById("choose-bedrooms");
const bathroomSelect = document.getElementById("choose-bathrooms");
const form = document.querySelector("form");

async function fetchHouseData(){
  try{

    const response = await fetch("https://mdn.github.io/shared-assets/misc/houses.json");

    if(!response.ok){

      throw new Error(`HTTP Error Message :- ${response.status}`)

    }

    const data = await response.json();

    console.log(data);
  }

  catch (error) {

    console.log(`Error message:- ${error}`);

  }

}

const resultCount = document.getElementById("result-count");
const output = document.getElementById("output");

let houses;

 function initializeForm() {
  
}

function renderHouses(e) {
  // Stop the form submitting
  e.preventDefault();

  // Add rest of code here
}

// Add a submit listener to the <form> element
form.addEventListener("submit", renderHouses);

// Call fetchHouseData() to initialize the app
fetchHouseData();
