const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

const images = [
    {filename : "pic1.jpg" , alt : "Closeup of a human eye"} ,
    {filename : "pic2.jpg" , alt : "Rock that looks like a wave"},
    {filename : "pic3.jpg" , alt : "Purple and white pansies"},
    {filename : "pic4.jpg" , alt : "Section of wall from a Pharoah's Tomb"},
    {filename : "pic5.jpg" , alt : "Large moth on a leaf"}
];

const baseURL = "https://mdn.github.io/shared-assets/images/examples/learn/gallery/";

//to iterate over the array of objects
for (let image of images) {
    let img = document.createElement("img");
    // console.log(image)
    img.setAttribute("src" , `${baseURL}${image["filename"]}`);
    img.setAttribute("alt" , `${image.alt}`);
    img.setAttribute("tabindex" , 0);
    // console.log(img.getAttribute("alt"))

    //appending imgaes
    thumbBar.appendChild(img);
    img.addEventListener("click" , (e) => {
        updateDisplayedImage(e);
        // console.log(e.button)
    });
    img.addEventListener("keydown" , (e) => {
        if(e.key === "Enter"){
            updateDisplayedImage(e); //set image when clicked enter / mimic the first event listener
        }
    })
}

function updateDisplayedImage(e){
    //get the target event's image attributes 
    displayedImage.setAttribute("src" , `${e.target.src}`); 
    displayedImage.setAttribute("alt" , `${e.target.alt}`);
    // console.log(e.key);
}

btn.addEventListener("click" , (e) => {
    if(btn.getAttribute("class" , "dark") === "dark"){
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0.5)";
        // btn.removeAttribute("class","dark");
        btn.classList.toggle("dark");
        // btn.classList.remove("dark");
    }
    else{
        btn.textContent = "Darken";
        // btn.setAttribute("class" , "dark");
        btn.classList.toggle("dark");
        overlay.style.backgroundColor = "rgb(0 0 0 / 0.0)";
    }
})