const button_add = document.querySelector("button");
const input = document.querySelector("#item");
const ul = document.querySelector("ul");

function first(e){
e.preventDefault();
if(input.value == false) { //Checking for blank inputs
    alert("Please Enter some value!");
}
else{
    //Creating li and appending them
    let inputval = input.value;
    input.value = "";
    let li = document.createElement("li");
    // li.textContent = inputval;
    let span = document.createElement("span");
    let button_del = document.createElement("button");
    span.textContent = inputval;
    button_del.innerHTML = "Delete";
    li.appendChild(span);
    li.appendChild(button_del);
    button_del.addEventListener("click" , (e) =>{
        li.remove();
    })

    ul.appendChild(li);
}
}

button_add.addEventListener("click" , (e) =>
{
    first(e);
}
);

