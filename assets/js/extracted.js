document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM fully loaded and JS started");

  const form = document.getElementById('newsletterForm');
  const toast = document.getElementById('toast');

  if (form) {
    console.log("📋 Newsletter form loaded");

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = form.email.value;
      console.log("🚀 Submitting newsletter form:", email);

      fetch('https://script.google.com/macros/s/AKfycbyOp1aePNxSP-EMkNHqubIz7AIV5Y-W8TcyzEtIUDQgeayXnK61YJ0TzkvkbRo4diol/exec', {
        method: 'POST',
        body: new URLSearchParams({ email })
      })
      .then(response => response.text())
      .then(data => {
        showToast("Successfully Subscribed!", "#28a745");
        form.reset();
      })
      .catch(error => {
        console.error("Newsletter error:", error);
        showToast(`Error: ${error.message}`, "#dc3545");
      });
    });
  }

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    console.log("📋 Contact form loaded");
    const submitBtn = contactForm.querySelector("button[type='submit']");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      let country = document.getElementById("country").value;
      const otherCountry = document.getElementById("other-country")?.value || "";
      const message = document.getElementById("message").value;
      const termsAccepted = document.getElementById("terms").checked;

      if (country === "Other" && otherCountry.trim() === "") {
        showToast("Please enter your country name.", "#dc3545");
        return;
      }

      if (country === "Other" && otherCountry.trim() !== "") {
        country = `Other - ${otherCountry.trim()}`;
      }

      if (!termsAccepted) {
        showToast("Please accept the terms to proceed.", "#dc3545");
        return;
      }

      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span class="spinner" style="margin-right: 8px; display:inline-block; width:16px; height:16px; border:2px solid #fff; border-radius:50%; border-top:2px solid transparent; animation: spin 1s linear infinite;"></span> Sending...`;

      showToast("Submitting your message...", "#007bff");

      fetch("https://script.google.com/macros/s/AKfycbzv-vuP4nx3avtiyT20h6ukvJj_hXVggn4TVW-6fq9uCY0OSYNfgE9iB7SyU_cN0SXMlw/exec", {
        method: "POST",
        body: new URLSearchParams({
          name,
          email,
          phone,
          country,
          message,
          terms: termsAccepted ? "Yes" : ""
        }),
      })
      .then(response => response.text())
      .then(data => {
        showToast("Message sent successfully!", "#28a745");
        contactForm.reset();
        const otherContainer = document.getElementById("other-country-container");
        if (otherContainer) otherContainer.style.display = "none";
      })
      .catch(error => {
        console.error("Contact form error:", error);
        showToast("Failed to send message: " + error.message, "#dc3545");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
    });
  }

  const countrySelect = document.getElementById("country");
  const otherContainer = document.getElementById("other-country-container");

  if (countrySelect && otherContainer) {
    console.log("📥 Country dropdown listener registered");
    countrySelect.addEventListener("change", function () {
      console.log("🔁 Country changed to:", countrySelect.value);
      otherContainer.style.display = (countrySelect.value === "Other") ? "contents" : "none";
    });
  }

  function showToast(message, bgColor) {
    if (toast) {
      toast.innerText = message;
      toast.style.backgroundColor = bgColor;
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.display = "none";
      }, 3000);
    }
  }
});

     track = document.getElementById("carouselTrack");
  let scrollX = 0;

  function autoScrollCarousel() {
    if (!track) return;
    scrollX += 1;
    if (scrollX >= track.scrollWidth / 2) {
      scrollX = 0;
    }
    track.scrollLeft = scrollX;
  }

  setInterval(autoScrollCarousel, 30);