const inputField = document.body.querySelector("#numfield");
const output = document.body.querySelector("#output");
const select = document.body.querySelector("select");
const test = document.body.querySelector(".op");
const button1 = document.body.querySelector("#btn1");
// inputField.setAttribute("value" , 1)
output.value  = inputField.valueAsNumber;
console.log(typeof inputField.value)
console.log(typeof inputField.valueAsNumber)
// console.log(select.value)
// test.innerText = "Sup";


button1.addEventListener("click" , () => {
    let x = inputField.valueAsNumber;
    output.value = x * 30;
    console.log(x)
});

for(let i = 0 ; i < select.options.length ; i++){

    // console.log(select.options[i]);
    console.log(select)
}
