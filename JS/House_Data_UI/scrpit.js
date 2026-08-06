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
  //Streets Selector
 let temparray = [];
 temparray.push(houses[0].street)
 let count = 0;

let Rcount = 0;
 for(let i = 0 ; i < houses.length ; i++ ){

      if(houses[i].street === temparray[count]){
       //count is essential , as houses loop goes on the temparray does not have enough of houses index
       // wrong logic (houses[i].street === temparray[i])
      }

      else {
        count++;
        temparray.push(houses[i].street);
      }
 }
//Gemini's logic
let uniquerooms = [];
 for(let i = 0 ; i < houses.length ; i++){
  let streets = houses[i].street;
  if(!(uniquerooms.includes(streets))){
    uniquerooms.push(streets);
  }
 }
 console.log(temparray)
console.log(uniquerooms)
 for (street of temparray){
  let option = document.createElement("option");
  option.setAttribute('value' , `${street}`);
  option.textContent = street;
  streetSelect.appendChild(option);
 }

 //Rooms Selector
let Rooms = 0;
let Bathrooms = 0;
 for(let i = 0 ; i < houses.length ; i++){

  if(houses[i].bedrooms > Rooms){
    Rooms = houses[i].bedrooms;
  }
   if (houses[i].bathrooms > Bathrooms){
    Bathrooms = houses[i].bathrooms;
  }
}
console.log(Rooms);
console.log(Bathrooms);
//Bedroom Appending
for(let i = 1 ; i <= Rooms ; i++){
  let Bedroom_options = document.createElement("option");
  Bedroom_options.text = i;
  Bedroom_options.value = i;
  bedroomSelect.appendChild(Bedroom_options);
}
//Bathrooms Appending
for (let i = 1 ; i <= Bathrooms ; i++){
  let Bathrooms_options = document.createElement("option")
  Bathrooms_options.text = i;
  Bathrooms_options.value = i;
  bathroomSelect.appendChild(Bathrooms_options);
}
}
let filtered;
function renderHouses(e) {
  // Stop the form submitting
  e.preventDefault();
  // Add rest of code here
  let filtered_streets = houses.filter((item) =>
    {
    if(streetSelect.value === item.street || streetSelect.value === " "){
        if(Number(bedroomSelect.value) === item.bedrooms || bedroomSelect.value === " "){
            if(Number(bathroomSelect.value) === item.bathrooms || bathroomSelect.value === " "){
              return item;
            }
        }
      // return item;
    }
    // console.log(item)
  })

  console.log(filtered_streets)
//  let filtered_bedrooms = filtered_streets.filter((item) =>
//   {
//     console.log(item.bedrooms)
//     if(Number(bedroomSelect.value) === item.bedrooms){
//       return item;
//     }
//   })
//   console.log(filtered_bedrooms);
}

// Add a submit listener to the <form> element
form.addEventListener("submit", renderHouses);

// Call fetchHouseData() to initialize the app
fetchHouseData();
