function random(number) {
  return Math.floor(Math.random() * number);
}

function bgChange(e) {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  e.target.style.backgroundColor = rndCol;
  // return rndCol;
}

const container = document.querySelector("#container");
const stwap = document.querySelector("#stop");
const box = document.getElementsByClassName('tile');
const reset = document.querySelector("#reset");
console.log(box.length);
let id = [];

container.addEventListener("click", (e) => {
    // let a = bgChange(e);
    
     id.push(setInterval(() =>{ //pushing up interval id's to store id 
      bgChange(e);
    } ,100)
  );
  console.log(id)
});

stwap.addEventListener("click" , () => {
  console.log(id);
  for(i = 0 ; i < id.length ; i++){
    clearInterval(id[i]); //clearing up id's by refrenencing up position in arrays 
    id[i] = null; //explicitly nullifying every elements reference in the array
  }
  // id = null
})

reset.addEventListener("click" , () => {
    console.log(box[1].style)
    console.log(box)
    for(i = 0 ; i < box.length ; i++){
      box[i].style.backgroundColor = "white";
    }
    // box[1].style.backgroundColor = "white";
});