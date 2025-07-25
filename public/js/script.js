// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// This is an example script, please modify as needed
const rangeInput = document.getElementById("customRange4");
const rangeOutput = document.getElementById("rangeValue");

// Set initial value
rangeOutput.textContent = rangeInput.value;

rangeInput.addEventListener("input", function () {
  rangeOutput.textContent = this.value;
});

//alear auto closur:


let guestCount = 1;
  function updateGuests(change) {
    guestCount = Math.max(1, guestCount + change);
    document.getElementById("guestCount").innerText = guestCount;
    document.getElementById("guestCountText").innerText = guestCount + (guestCount > 1 ? " guests" : " guest");
    document.getElementById("guestInput").value = guestCount;
  }



  