const mother = document.querySelector(".mother")
const input = document.querySelector("#inputbtn");
// const audio  = document.createElement("audio");
const resetbutton = document.querySelector("#reset");
const childdiv = document.getElementById("child");

let srcarray = [];
resetbutton.addEventListener("click" , (e) => {
  e.preventDefault();
  srcarray.forEach((item) => {
    URL.revokeObjectURL(item);
  })
  srcarray = [];
  console.log(srcarray.length === 0 ? "Empty" : "Not Empty");
  childdiv.innerHTML = "";
})

input.addEventListener("change" , (e) =>{
  const filelist = e.target.files;
  console.log(filelist)
  for (const files of filelist){
    if(!(files.name.toLowerCase().endsWith("mp3") || files.name.toLowerCase().endsWith("mp4"))){
      alert("Please Select MP3 or MP4 Files");     
          continue;
      }
      console.log(files)
      const srcfile = URL.createObjectURL(files) //creating a blob obj of uploaded file
      console.log(srcfile);
      srcarray.push(srcfile);
      //Elements creation
      const audio  = document.createElement("audio");
      const video = document.createElement("video");
      const para = document.createElement("p");
      para.textContent = files.name;
      para.classList.add("para-one");
      childdiv.appendChild(para);
      if(files.name.toLowerCase().endsWith(".mp4")){
        video.src = srcfile;
        video.controls = true;
        video.width = 300;
        video.height = 200;
        childdiv.appendChild(video);
      }
      else{
        audio.src = srcfile;
        audio.controls = true;
        childdiv.appendChild(audio);
      }
      
    }
    }
)