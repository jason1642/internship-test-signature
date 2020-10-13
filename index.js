// alert('Good luck!');

const canvas = document.querySelector("#signature-pad");

const signaturePad = new SignaturePad(canvas, {
  backgroundColor: 'rgba(255, 255, 255, 0)',
  penColor: 'rgb(0, 0, 0)'
});


// rescales the canvas to fix bug where pointer and what is being drawn is not at the same location
const resizeCanvas = () => {
  var ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
  signaturePad.clear(); // otherwise isEmpty() might return incorrect value
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
// signaturePad.toDataURL(); // save image as PNG
// signaturePad.toDataURL("image/jpeg"); // save image as JPEG
// signaturePad.toDataURL("image/svg+xml"); // save image as SVG

// Draws signature image from data URL.
// NOTE: This method does not populate internal data structure that represents drawn signature. Thus, after using #fromDataURL, #toData won't work properly.
// signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...");

// Returns signature image as an array of point groups
// const data = signaturePad.toData();

// Draws signature image from an array of point groups
// signaturePad.fromData(data);

// Clears the canvas
// signaturePad.clear();

// Returns true if canvas is empty, otherwise returns false
// signaturePad.isEmpty()
// Unbinds all event handlers
// signaturePad.off();

// Rebinds all event handlers
// signaturePad.on();

//code from https://github.com/szimek/signature_pad

const validateForm = () => {
  if (signaturePad.isEmpty()) {

    alert("Please provide your signature.");
    returnToPreviousPage();
    return false;
  } else {
    alert("Thank you for your submission!");
    return true;
  }

}

let image_url = signature_pad.toDataURL();
$("#quixi-form").submit(e => {
  $.ajax({
    type: "POST",
    url: "https://www.quixi.com/signature_data",
    data: {
      image_data: image_url
    },
    success: () => alert("success!")
  })
  e.preventDefault();
})