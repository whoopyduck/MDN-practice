const form = document.querySelector("form");
const input = document.querySelector("#item");

form.addEventListener("click" , (e) => {
    if(e.target.tagName == "BUTTON"){
        if(input.value == false)
        {
            e.preventDefault();
            alert("Please Enter Some value");
        }
        else{
            e.preventDefault();
            console.log(`${e.target.tagName} ${input.value}`);
        }
    }
   
});