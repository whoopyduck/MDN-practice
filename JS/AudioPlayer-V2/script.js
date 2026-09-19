const mother = document.querySelector(".mother");
const input = document.querySelector("#inputbtn");
const resetbutton = document.querySelector("#reset");
const childdiv = document.getElementById("child");

const divthree = document.querySelector(".three");
let srcarray = [];


childdiv.addEventListener("click" , (e) =>{
  e.stopPropagation()
  if(e.target.tagName === "P"){
   let fileData =  e.target.dataset.src;
   let name =  e.target.dataset.name;
   let key =  e.target.dataset.key;
    console.log(e.target.dataset.src);
    renderPlayer(fileData , name , key);
  }
})

//Media Function to make aud vid tags in tho DIV Three
function renderPlayer(fileData , name , key){
 const playeraud = document.createElement("audio");
  const playervid = document.createElement("video");
  const player_para = document.createElement("p");
  const removebutton = document.createElement("button");
  removebutton.textContent = "Eject";
      if (name.toLowerCase().endsWith(".mp4")) {
    divthree.innerHTML = "";
    playervid.src = fileData;
    playervid.controls = true;
    playervid.width = 300;
    playervid.height = 200;
    playervid.setAttribute("id" , `${key}`);
    player_para.textContent = name;
    divthree.appendChild(playervid);
    divthree.appendChild(player_para);
    // para.appendChild(video);
    
  } else {
    divthree.innerHTML = "";
    playeraud.src = fileData;
    playeraud.setAttribute("id" , `${key}`);
    playeraud.controls = true;
    player_para.textContent = name;
    divthree.appendChild(playeraud);
    divthree.appendChild(player_para);
  }
  removebutton.addEventListener("click" , (e) =>{
    e.preventDefault();
    // URL.revokeObjectURL(fileData);
    divthree.innerHTML = "";
    
  }) 
  divthree.appendChild(removebutton);
}

// Helper function to handle DOM creation and Object URL generation
function renderMediaItem(fileData, fileName , uniqueKey) {
  const srcfile = URL.createObjectURL(fileData);
  const mediakey = uniqueKey;
  srcarray.push(srcfile);

  // const playeraud = document.createElement("audio");
  // const playervid = document.createElement("video");
  const para = document.createElement("p");
  const section = document.createElement("div");

  para.textContent = fileName;
  // para.setAttribute("for" , `${mediakey}`)
  para.classList.add("para-one");
  para.dataset.src = srcfile;
  para.dataset.name = fileName;
  para.dataset.key = mediakey;
  section.appendChild(para);
  

  // if (fileName.toLowerCase().endsWith(".mp4")) {
  //   divthree.innerHTML = "";
  //   playervid.src = srcfile;
  //   playervid.controls = true;
  //   playervid.width = 300;
  //   playervid.height = 200;
  //   playervid.setAttribute("id" , `${mediakey}`);
    
  //   divthree.appendChild(playervid);
  //   // para.appendChild(video);
    
  // } else {
  //   divthree.innerHTML = "";
  //   playeraud.src = srcfile;
  //   playeraud.setAttribute("id" , `${mediakey}`);
  //   playeraud.controls = true;
    
  //   divthree.appendChild(playeraud);
  // }
  const reset_indv = document.createElement("button");
  reset_indv.textContent = "Remove";
  section.append(reset_indv)
  //imp
reset_indv.addEventListener("click" , async (e) =>{
    e.preventDefault();
    URL.revokeObjectURL(srcfile);
    await localforage.removeItem(mediakey);
    divthree.innerHTML = "";
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
  divthree.innerHTML = "";
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