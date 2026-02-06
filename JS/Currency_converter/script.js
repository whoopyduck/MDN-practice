const inputField = document.body.querySelector("#numfield");
const output = document.body.querySelector("#output");
const select = document.body.querySelector("select");
const test = document.body.querySelector(".op");
const button1 = document.body.querySelector("#btn1");
// inputField.setAttribute("value" , 1)
let arrayone = inputField.value.split(" ");

console.log(typeof inputField.value)
console.log(typeof inputField.valueAsNumber)
console.log(select.value)

let num = Number(arrayone[0]);
inputField.value = `${num} ${select.value.toUpperCase()}`;
// test.innerText = "Sup";
 
console.log(arrayone);
// console.log(num)

select.addEventListener("change" , () => {
    inputField.value = `${num} ${select.value.toUpperCase()}`;
});

button1.addEventListener("click" , () => {
    arrayone = inputField.value.split(" ");
    num = Number(arrayone[0]);
    console.log(arrayone[0])
    let x = num;
    output.value = `INR ${currencies[select.value].convert(x)}`;
});
const currencies = { 
        usd : { 
            convert(x){
                let converted = x * 90;
                return converted;
            }
        } , 

        eur : { 
            convert(x){
                let converted = x * 106;
                return converted;
            }
            
        } , 

        cad : { 
            convert(x){
                let converted = x * 66;
                return converted;
            }
            
        } , 

        jpy : { 
                convert(x){
                    let converted = (x * 0.58).toFixed(2);
                    return converted;
                }
        }
}
output.value  = `INR ${currencies[select.value].convert(num)}`;