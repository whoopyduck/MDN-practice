const inputField = document.body.querySelector("#numfield");
const output = document.body.querySelector("#output");
const select = document.body.querySelector("select");
const test = document.body.querySelector(".op");
const button1 = document.body.querySelector("#btn1");
// inputField.setAttribute("value" , 1)
output.value  = inputField.valueAsNumber;
console.log(typeof inputField.value)
console.log(typeof inputField.valueAsNumber)
console.log(select.value)
// test.innerText = "Sup";


button1.addEventListener("click" , () => {
    let x = inputField.valueAsNumber;
    output.value = x * 30;
    // console.log(select.options.length)
    // console.log(select.length)
        console.log(currencies.usd.convert(x))
        for(let i =0 ; i < select.options.length ; i++){
                console.log(select.value)
        }
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
                    let converted = x * 0.58;
                    return converted;
                }
        }
}
