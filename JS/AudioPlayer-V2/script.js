const mother = document.querySelector(".mother");
const input = document.querySelector("#inputbtn");
const resetbutton = document.querySelector("#reset");
const childdiv = document.getElementById("child");
const divthree = document.querySelector(".three");

let srcarray = [];

// 1. EVENT DELEGATION: Click playlist item -> Load into Main Player (.three)
childdiv.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    const fileData = e.target.dataset.src;
    const name = e.target.dataset.name;
    const key = e.target.dataset.key;
    renderPlayer(fileData, name, key);
  }
});

// 2. MAIN STAGE PLAYER RENDERER
function renderPlayer(fileData, name, key) {
  // Clear previous player completely
  divthree.innerHTML = "";

  const isVideo = name.toLowerCase().endsWith(".mp4");
  const mediaElement = document.createElement(isVideo ? "video" : "audio");
  const playerPara = document.createElement("p");
  const ejectButton = document.createElement("button");

  mediaElement.src = fileData;
  mediaElement.controls = true;
  mediaElement.dataset.activeKey = key; // Attach key so delete logic can inspect active track
  if (isVideo) {
    mediaElement.width = 300;
    mediaElement.height = 200;
  }

  playerPara.textContent = name;
  ejectButton.textContent = "Eject";

  ejectButton.addEventListener("click", (e) => {
    e.preventDefault();
    mediaElement.pause();
    divthree.innerHTML = "";
  });

  divthree.append(mediaElement, playerPara, ejectButton);
  mediaElement.play().catch(() => {
    // Catch auto-play policy restrictions gracefully
  });
}

// 3. SIDEBAR ITEM RENDERER
function renderMediaItem(fileData, fileName, uniqueKey) {
  const srcfile = URL.createObjectURL(fileData);
  const mediakey = uniqueKey;
  srcarray.push(srcfile);

  const section = document.createElement("div");
  const para = document.createElement("p");
  const resetIndv = document.createElement("button");

  para.textContent = fileName;
  para.classList.add("para-one");
  
  // Attach metadata via dataset for event delegation
  para.dataset.src = srcfile;
  para.dataset.name = fileName;
  para.dataset.key = mediakey;

  resetIndv.textContent = "Remove";

  // Individual Removal Handler
  resetIndv.addEventListener("click", async (e) => {
    e.preventDefault();

    // Check if the track being deleted is currently playing in .three
    const activePlayer = divthree.querySelector("audio, video");
    if (activePlayer && activePlayer.dataset.activeKey === mediakey) {
      activePlayer.pause();
      divthree.innerHTML = "";
    }

    // Revoke memory & remove from DB
    URL.revokeObjectURL(srcfile);
    await localforage.removeItem(mediakey);
    
    // Remove from active URLs tracking array
    srcarray = srcarray.filter((url) => url !== srcfile);

    section.remove();
  });

  section.append(para, resetIndv);
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
  
  // Pause any active playback before wiping
  const activePlayer = divthree.querySelector("audio, video");
  if (activePlayer) activePlayer.pause();

  srcarray.forEach((item) => URL.revokeObjectURL(item));
  srcarray = [];

  await localforage.clear();
  childdiv.innerHTML = "";
  divthree.innerHTML = "";
  console.log("Database cleared completely!");
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