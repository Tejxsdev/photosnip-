const width = screen.width / 2;
let height = 0;
let counter = 0;
let canvas = document.getElementById("snap");
let photo = document.getElementById("photo");

let streaming = false;
document.getElementById("snap").style.display = "none";
function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

let video = null;

function startup() {
  video = document.getElementById("video");
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'user' }, audio: false })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });

  video.addEventListener(
    "canplay",
    function (e) {
      if (!streaming) {
        if (isMobile()) {
          height = width * (4 / 3);
        } else {
          height = video.videoHeight / (video.videoWidth / width);
        }
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    },
  );
}
function takePicture() {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    context.drawImage(video, 0, 0);

    const data = canvas.toDataURL("image/webp");
    photo.setAttribute("src", data);
  }
  document.getElementById("video").style.display = "none";
  document.getElementById("snap").style.display = "block";
}

document.getElementById("flip-cam").addEventListener("click", function (e) {
  counter++;
  if (counter % 2 == 0) {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
  }
  else {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
  }
})

document.getElementById("capture").addEventListener("click", function (e) {
  e.preventDefault();
  takePicture();
});
window.addEventListener("load", startup, false);