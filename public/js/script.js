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

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const params = new URLSearchParams(
      window.location.search,
    );

    if (params.get("sent") === "1") {
      alert(
        "Message Sent Successfully!",
      );

      // remove query so refresh won't show alert again
      window.history.replaceState(
        {},
        document.title,
        "/contact",
      );
    }
  },
);
