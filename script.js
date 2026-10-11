const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close mobile menu after selecting a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Automatically select a membership plan in the enquiry form
document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    const interest = document.querySelector("#interest");

    const options = {
      Foundation: "Foundation membership",
      Performance: "Performance membership",
      Elite: "Personal training"
    };

    interest.value = options[plan] || "";
  });
});

// Update copyright year
document.querySelector("#year").textContent = new Date().getFullYear();

// Prepare enquiry message
// This demo does not send or store personal information.
const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!enquiryForm.checkValidity()) {
    enquiryForm.reportValidity();
    return;
  }

  const formData = new FormData(enquiryForm);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const interest = formData.get("interest");
  const message = formData.get("message").trim();

  const enquiryText = [
    "IRON CULT — Membership Enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Interested in: ${interest}`,
    `Message: ${message}`
  ].join("\n");

  formStatus.replaceChildren();

  const description = document.createElement("p");
  description.textContent =
    "Your enquiry has been prepared. This demo does not send it to a gym.";

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "btn btn-outline";
  copyButton.textContent = "SHOW ENQUIRY TEXT";

  const preview = document.createElement("textarea");
  preview.readOnly = true;
  preview.rows = 7;
  preview.value = enquiryText;
  preview.setAttribute("aria-label", "Prepared enquiry text");
  preview.style.marginTop = "10px";

  copyButton.addEventListener("click", () => {
    preview.hidden = !preview.hidden;
    copyButton.textContent = preview.hidden
      ? "SHOW ENQUIRY TEXT"
      : "HIDE ENQUIRY TEXT";
  });

  preview.hidden = true;

  formStatus.append(description, copyButton, preview);
  formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
});