const btn = document.querySelector("#Play");
const btn2 = document.querySelector("#Stop");

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}
function run(){
   const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

function scream(){
    console.log("GOYYY")
}
let clear1 , clear2 ;

btn.addEventListener("mouseover", () => { //Will run two functions with one second and 1 milisecond gap -> setInterval
 clear1 = setInterval(run, 100)   //Storing seInterval object in a var 
 clear2 = setInterval(scream , 1000)
});

btn2.addEventListener("mouseover", () => {
    clearInterval(clear1);  //using that var to clear out setInterval
    clearInterval(clear2);  //by using global function
    document.body.style.backgroundColor = "white";
})

//Experimental Feature
/*btn.addEventListener("mouseout", () => {
    clearInterval(clear1);                    
    clearInterval(clear2);  
    document.body.style.backgroundColor = "white";
}) */
