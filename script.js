const width = screen.width/2; 
let height = 0; 

let streaming = false;

let video = null;

function startup() {
  video = document.getElementById("video");
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false, facingMode: "user"})
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });

  video.addEventListener(
    "canplay",
    function(e) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        video.set
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        streaming = true;
      }
    },
  );
}

window.addEventListener("load", startup, false);