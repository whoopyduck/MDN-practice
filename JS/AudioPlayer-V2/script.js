const mother = document.querySelector(".mother");
const input = document.querySelector("#inputbtn");
const resetbutton = document.querySelector("#reset");
const childdiv = document.getElementById("child");
const divthree = document.querySelector(".three");
const Player = document.querySelector(".Player");
const controls = document.querySelector(".controls");
const Ejectbutton = document.getElementById("Eject")
const Backbutton = document.getElementById("Backward")
const Forwardbutton = document.getElementById("Forward")

let srcarray = [];

// 1. EVENT DELEGATION FOR PLAYLIST CLICKS
childdiv.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.tagName === "P") {
    let fileData = e.target.dataset.src;
    let name = e.target.dataset.name;
    let key = e.target.dataset.key;
    renderPlayer(fileData, name, key);
  }
});

// Eject Button Event Listener
Ejectbutton.addEventListener("click" , (e) => {
  // FIX 2: Pause media before clearing DOM on Eject
  e.preventDefault();
    const activeMedia = Player.querySelector("audio, video");
    if (activeMedia) activeMedia.pause();
    Player.innerHTML = "";
})

// 2. MAIN STAGE RENDERER (Your original if/else structure)
function renderPlayer(fileData, name, key) {
  const playeraud = document.createElement("audio");
  const playervid = document.createElement("video");
  const player_para = document.createElement("p");
  // removebutton.textContent = "Eject";

  // Check file extension using original logic
  if (name.toLowerCase().endsWith(".mp4")) {
    Player.innerHTML = "";
    playervid.src = fileData;
    playervid.controls = true;
    playervid.width = 300;
    playervid.height = 200;
    
    // FIX 1: Attach key to track active player
    playervid.dataset.activeKey = key;

    player_para.textContent = name;
    Player.appendChild(playervid);
    Player.appendChild(player_para);
  } else {
    Player.innerHTML = "";
    playeraud.src = fileData;
    playeraud.controls = true;
    
    // FIX 1: Attach key to track active player
    playeraud.dataset.activeKey = key;

    player_para.textContent = name;
    Player.appendChild(playeraud);
    Player.appendChild(player_para);
  }
}

// 3. SIDEBAR ITEM RENDERER (Your original layout)
function renderMediaItem(fileData, fileName, uniqueKey) {
  const srcfile = URL.createObjectURL(fileData);
  const mediakey = uniqueKey;
  srcarray.push(srcfile);

  const para = document.createElement("p");
  const section = document.createElement("div");

  para.textContent = fileName;
  para.classList.add("para-one");
  para.dataset.src = srcfile;
  para.dataset.name = fileName;
  para.dataset.key = mediakey;
  section.appendChild(para);

  const reset_indv = document.createElement("button");
  reset_indv.textContent = "Remove";
  section.append(reset_indv);

  // INDIVIDUAL REMOVAL
  reset_indv.addEventListener("click", async (e) => {
    e.preventDefault();

    // FIX 3: If active track in .three is deleted, stop & clear .three
    const activeMedia = Player.querySelector("audio, video");
    if (activeMedia && activeMedia.dataset.activeKey === mediakey) {
      activeMedia.pause();
      Player.innerHTML = "";
    }

    URL.revokeObjectURL(srcfile);
    await localforage.removeItem(mediakey);
    
    // Clean URL from tracker array
    srcarray = srcarray.filter((url) => url !== srcfile);

    section.remove();
  });

  childdiv.appendChild(section);
}

// 4. LOAD PERSISTENT DATA ON REFRESH
window.addEventListener("DOMContentLoaded", async () => {
  try {
    await localforage.iterate((value, key) => {
      renderMediaItem(value.fileData, value.name, key);
    });
    console.log("Restored saved tracks from localForage!");
  } catch (err) {
    console.error("Failed to load saved tracks:", err);
  }
});

// 5. GLOBAL RESET BUTTON
resetbutton.addEventListener("click", async (e) => {
  e.preventDefault();

  // Pause active media before clearing
  const activeMedia = Player.querySelector("audio, video");
  if (activeMedia) activeMedia.pause();

  srcarray.forEach((item) => {
    URL.revokeObjectURL(item);
  });
  srcarray = [];

  await localforage.clear();
  childdiv.innerHTML = "";
  Player.innerHTML = "";
  console.log("Database cleared. Empty!");
});

// 6. FILE UPLOAD HANDLER
input.addEventListener("change", async (e) => {
  const filelist = e.target.files;

  for (const files of filelist) {
    const lowerName = files.name.toLowerCase();
    if (!(lowerName.endsWith(".mp3") || lowerName.endsWith(".mp4"))) {
      alert("Please Select MP3 or MP4 Files");
      continue;
    }

    const uniqueKey = `track_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    await localforage.setItem(uniqueKey, {
      name: files.name,
      fileData: files
    });

    renderMediaItem(files, files.name, uniqueKey);
  }
});