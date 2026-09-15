const mother = document.querySelector(".mother");
const input = document.querySelector("#inputbtn");
const resetbutton = document.querySelector("#reset");
const childdiv = document.getElementById("child");

let srcarray = [];


childdiv.addEventListener("click" , (e) =>{
  if(e.target.tagName === "P"){
    console.log(e.target.dataset.src);
  }
})

// Helper function to handle DOM creation and Object URL generation
function renderMediaItem(fileData, fileName , uniqueKey) {
  const srcfile = URL.createObjectURL(fileData);
  const mediakey = uniqueKey;
  srcarray.push(srcfile);

  // const audio = document.createElement("audio");
  // const video = document.createElement("video");
  const para = document.createElement("p");
  const section = document.createElement("div");

  para.textContent = fileName;
  para.setAttribute("for" , `${mediakey}`)
  para.classList.add("para-one");
  para.dataset.src = srcfile;
  section.appendChild(para);
  

  if (fileName.toLowerCase().endsWith(".mp4")) {
    // video.src = srcfile;
    // video.controls = true;
    // video.width = 300;
    // video.height = 200;
    // video.setAttribute("id" , `${mediakey}`);
    // para.appendChild(video);
    section.appendChild(para);
  } else {
    // audio.src = srcfile;
    // audio.setAttribute("id" , `${mediakey}`);
    // audio.controls = true;
    // para.appendChild(audio);
    section.appendChild(para);
  }
  const reset_indv = document.createElement("button");
  reset_indv.textContent = "Remove";
  section.append(reset_indv)
  //imp
reset_indv.addEventListener("click" , async (e) =>{
    e.preventDefault();
    URL.revokeObjectURL(srcfile);
    await localforage.removeItem(mediakey);
    section.remove();
  })

  childdiv.appendChild(section);
}

// 1. LOAD PERSISTENT DATA ON REFRESH
window.addEventListener("DOMContentLoaded", async () => {
  try {
    await localforage.iterate((value, key) => {
      // value contains { name, fileData }
      renderMediaItem(value.fileData, value.name , key);
    });
    console.log("Restored saved tracks from localForage!");
  } catch (err) {
    console.error("Failed to load saved tracks:", err);
  }
});

// 2. RESET BUTTON (Clears DOM, revokes URLs, and wipes localForage)
resetbutton.addEventListener("click", async (e) => {
  e.preventDefault();
  srcarray.forEach((item) => {
    URL.revokeObjectURL(item);
  });
  srcarray = [];
  
  await localforage.clear();
  childdiv.innerHTML = "";
  console.log("Database cleared. Empty!");
});

// 3. INPUT CHANGE (Saves to localForage and renders immediately)
input.addEventListener("change", async (e) => {
  const filelist = e.target.files;
  console.log(filelist);
  
  for (const files of filelist) {
    const lowerName = files.name.toLowerCase();
    if (!(lowerName.endsWith(".mp3") || lowerName.endsWith(".mp4"))) {
      alert("Please Select MP3 or MP4 Files");    
      continue;
    }
    
    console.log(files);

    // Save raw File object into localForage with a unique key
    const uniqueKey = `track_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    console.log(uniqueKey)
    console.log(Date.now())
    await localforage.setItem(uniqueKey, {
      name: files.name,
      fileData: files // localForage saves Blobs/Files natively!
    });

    // Render it right away
    renderMediaItem(files, files.name , uniqueKey);
  }
});