const button1 = document.querySelector("#lick");
const button2 = document.querySelector("#reset");
const daddy = document.querySelector("#daddy");
const son = document.querySelector("#son");


button1.addEventListener("click" , (e) => {
    button1.textContent = "LOL dumdum";
    console.log(`${e.currentTarget.tagName} was clicked`);
})

son.addEventListener("click" , (e) => {
    // document.body.style.backgroundColor = "yellow";
    son.style.backgroundColor = "yellow";
    console.log(`${e.currentTarget.tagName} was clicked`);
})

daddy.addEventListener("click" , (e) => {
    daddy.style.backgroundColor = "Grey"
    console.log(`${e.currentTarget.tagName} was clicked`);
})

function warp_back (e){
    console.log(`${e.currentTarget.tagName} was clicked`);
    e.stopPropagation();
    button1.textContent = "Click me";
    daddy.style.backgroundColor = "red";
    son.style.backgroundColor = "green";
}

button2.addEventListener("click" , warp_back);