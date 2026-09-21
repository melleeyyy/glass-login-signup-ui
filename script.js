/* ============================================================
   GlassAuth — Login & Signup UI logic
   Vanilla JavaScript, no dependencies.
   ============================================================ */

/* ---------- Helpers ---------- */

const $ = (selector) => document.querySelector(selector);

/**
 * Show a toast notification.
 * @param {string} message - Text to display.
 * @param {"success"|"error"} [type] - Visual style of the toast.
 */
function showToast(message, type = "success") {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = "toast show " + type;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "toast " + type;
  }, 3200);
}

/**
 * Set an inline error message under an input and mark it invalid.
 */
function setError(inputId, messageId, message) {
  const input = document.getElementById(inputId);
  const msg = document.getElementById(messageId);
  if (input) input.classList.add("invalid");
  if (msg) msg.textContent = message;
}

/**
 * Clear an inline error message.
 */
function clearError(inputId, messageId) {
  const input = document.getElementById(inputId);
  const msg = document.getElementById(messageId);
  if (input) input.classList.remove("invalid");
  if (msg) msg.textContent = "";
}

/** Simple email format check. */
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* ---------- Password visibility toggles ---------- */

document.querySelectorAll(".toggle-password").forEach((eye) => {
  eye.addEventListener("click", () => {
    const input = eye.parentElement.querySelector("input");
    if (!input) return;

    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    eye.classList.toggle("fa-eye", showing);
    eye.classList.toggle("fa-eye-slash", !showing);
  });
});

/* ---------- Password strength meter (signup) ---------- */

const signupPassword = document.getElementById("password");
const strengthMeter = document.getElementById("strength-meter");
const strengthText = document.getElementById("strength-text");

if (signupPassword && strengthMeter) {
  signupPassword.addEventListener("input", () => {
    const value = signupPassword.value;
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    const labels = ["Password strength", "Weak", "Fair", "Good", "Strong"];

    strengthMeter.className = "strength-meter" + (value ? " strength-" + score : "");
    if (strengthText) strengthText.textContent = labels[score];
  });
}

/* ---------- Login page ---------- */

const loginForm = document.getElementById("login-form");

if (loginForm) {
  // Restore a remembered username if present.
  const remembered = localStorage.getItem("glassauth_username");
  if (remembered) {
    const username = document.getElementById("username");
    const rememberBox = document.getElementById("remember-me");
    if (username) username.value = remembered;
    if (rememberBox) rememberBox.checked = true;
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const rememberBox = document.getElementById("remember-me");
    let ok = true;

    if (username === "") {
      setError("username", "username-error", "Please enter your username or email.");
      ok = false;
    } else {
      clearError("username", "username-error");
    }

    if (password.length < 6) {
      setError("password", "password-error", "Password must be at least 6 characters.");
      ok = false;
    } else {
      clearError("password", "password-error");
    }

    if (!ok) return;

    // Remember-me (frontend demo — never store real passwords like this).
    if (rememberBox && rememberBox.checked) {
      localStorage.setItem("glassauth_username", username);
    } else {
      localStorage.removeItem("glassauth_username");
    }

    showToast("Login successful! (demo — no backend connected)");
    loginForm.reset();
  });
}

/* ---------- Signup page ---------- */

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const terms = document.getElementById("terms");
    let ok = true;

    if (username.length < 3) {
      setError("username", "username-error", "Username must be at least 3 characters.");
      ok = false;
    } else {
      clearError("username", "username-error");
    }

    if (!isEmail(email)) {
      setError("email", "email-error", "Please enter a valid email address.");
      ok = false;
    } else {
      clearError("email", "email-error");
    }

    if (password.length < 8) {
      setError("password", "password-error", "Password must be at least 8 characters.");
      ok = false;
    } else {
      clearError("password", "password-error");
    }

    if (confirmPassword !== password || confirmPassword === "") {
      setError("confirm-password", "confirm-password-error", "Passwords do not match.");
      ok = false;
    } else {
      clearError("confirm-password", "confirm-password-error");
    }

    const termsError = document.getElementById("terms-error");
    if (terms && !terms.checked) {
      if (termsError) termsError.textContent = "Please accept the terms to continue.";
      ok = false;
    } else if (termsError) {
      termsError.textContent = "";
    }

    if (!ok) return;

    showToast("Account created successfully! (demo — no backend connected)");
    signupForm.reset();
    if (strengthMeter) strengthMeter.className = "strength-meter";
    if (strengthText) strengthText.textContent = "Password strength";
  });
}

/* ---------- Forgot password modal (login page) ---------- */

const forgotModal = document.getElementById("forgot-modal");
const forgotForm = document.getElementById("forgot-form");

if (forgotModal) {
  const openModal = () => forgotModal.classList.add("open");
  const closeModal = () => forgotModal.classList.remove("open");

  document.getElementById("forgot-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  document.getElementById("forgot-close")?.addEventListener("click", closeModal);

  forgotModal.addEventListener("click", (e) => {
    if (e.target === forgotModal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("forgot-email").value.trim();

      if (!isEmail(email)) {
        setError("forgot-email", "forgot-email-error", "Please enter a valid email address.");
        return;
      }

      clearError("forgot-email", "forgot-email-error");
      closeModal();
      forgotForm.reset();
      showToast("Reset link sent to " + email + " (demo)");
    });
  }
}
