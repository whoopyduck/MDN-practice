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
    houses = data ;
    initializeForm();
  }

  catch (error) {

    console.log(`Error message:- ${error}`);

  }

}

const resultCount = document.getElementById("result-count");
const output = document.getElementById("output");

let houses;

 function initializeForm() {
 let temparray = [];
 temparray.push(houses[0].street)
 let count = 0;
 for(let i = 0 ; i < houses.length ; i++ ){
      if(houses[i].street === temparray[count]){
       //count is essential , as houses loop goes on the temparray does not have enough of houses index
       // wrong logic (houses[i].street === temparray[i])
      }
      else if (houses[i].street != temparray[count]){
        count++;
        temparray.push(houses[i].street);
      }
 }
 console.log(temparray)
 for (street of temparray){
  let option = document.createElement("option");
  option.setAttribute('value' , 'street');
  option.textContent = street;
  streetSelect.appendChild(option);
 }
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
