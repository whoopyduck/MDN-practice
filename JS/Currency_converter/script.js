const inputField = document.body.querySelector("#numfield");
const output = document.body.querySelector("#output");
const select = document.body.querySelector("select");
const test = document.body.querySelector(".op");
const button1 = document.body.querySelector("#btn1");
const resetbtn = document.body.querySelector("#reset");
// inputField.setAttribute("value" , 1)

let arrayone = inputField.value.split(" "); //Splitting input value once 
console.log(arrayone)
console.log(typeof inputField.value)
console.log(typeof inputField.valueAsNumber)
console.log(select.value)

let num = Number(arrayone[0]);
let initial_num = num; //important to store the initial number as be used for to return to default state
let reset = `${num} ${select.value.toUpperCase()}`; //Adding the by default selected value along with default number 
inputField.value = reset;
// test.innerText = "Sup";
 
console.log(arrayone);
// console.log(num)

select.addEventListener("change" , () => {
    inputField.value = `${num} ${select.value.toUpperCase()}`; //on change , concatinating the string with num value and then select option value which is selected by user
});
function checkwhite(white){
        if(!(white.includes(" "))){ //inversing the whitespace finding as we need whitespace that separates the number and string , which then useful for splitting the string to array
            alert("Please space after entering no.");
            inputField.value = reset ;
            output.value = `INR ${currencies[select.value].convert(initial_num)}`
            return false;
        }
        else{
            return true;
        }
}
button1.addEventListener("click" , () => {
    let check = inputField.value;
    checkwhite(check);
    arrayone = inputField.value.split(" "); //Splitting again to overwrite the default value with the user entered one
    num = Number(arrayone[0]);
    console.log(arrayone[0])
    console.log(arrayone)
    let x = num;
    if (checkwhite(check) === true){
        output.value = `INR ${currencies[select.value].convert(x)}`; //to not let this line run , if the result is false then Nan occurs
    }
});
resetbtn.addEventListener("click" , () =>{
       inputField.value = reset;
       select.value = select[0].value
    //    console.log(select.value);
    //    console.log(select.options[1].value)
       output.value = `INR ${currencies[select.value].convert(initial_num)}`
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
                    let converted = parseFloat(x * 0.58).toFixed(2);
                    // let converted = (x * 0.58).toFixed(2);
                    return converted;
                }
        }
}
output.value  = `INR ${currencies[select.value].convert(num)}`; // used for the first timer 