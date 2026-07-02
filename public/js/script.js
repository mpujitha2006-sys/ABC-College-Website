 // Contact Form Success Alert

const form = document.querySelector("#contactForm");

if (form) {
  form.addEventListener("submit", function () {
    localStorage.setItem("messageSent", "true");
  });
}

if (localStorage.getItem("messageSent") === "true") {
  alert("Message Sent Successfully!");
  localStorage.removeItem("messageSent");
}

// Smooth Scroll

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {
    anchor.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        document
          .querySelector(
            this.getAttribute("href"),
          )
          ?.scrollIntoView({
            behavior: "smooth",
          });
      },
    );
  });

// Back to Top Button

const topBtn =
  document.getElementById("topBtn");

if (topBtn) {
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 300) {
        topBtn.style.display = "block";
      } else {
        topBtn.style.display = "none";
      }
    },
  );

  topBtn.addEventListener(
    "click",
    function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  );
}

// Admin Search

const searchInput =
  document.getElementById(
    "searchInput",
  );

if (searchInput) {
  searchInput.addEventListener(
    "keyup",
    function () {
      const value =
        this.value.toLowerCase();

      const rows =
        document.querySelectorAll(
          "tbody tr",
        );

      rows.forEach((row) => {
        row.style.display =
          row.textContent
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";
      });
    },
  );
}