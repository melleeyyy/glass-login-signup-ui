# GlassAuth — Glassmorphism Login & Signup UI

A modern, fully responsive **Glassmorphism Login & Signup UI** built using **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no dependencies.

> This is an upgraded version of the original [login-signup-ui](https://github.com/Ali-AEY/login-signup-ui) project, rewritten with real form validation, a password strength meter, remember-me support and a forgot-password flow. All credit for the original design idea goes to the original author.

## Live Demo

**https://melleeyyy.github.io/glass-login-signup-ui/**

## Preview

Modern glass-style authentication pages with:

- Login Page
- Signup Page
- Password Show/Hide Toggle (on every password field)
- Live Password Strength Meter
- Inline Form Validation
- Remember Me (saves username locally)
- Forgot Password Modal
- Toast Notifications
- Fully Responsive Design (mobile friendly)

---

## Built With

- HTML5
- CSS3 (Glassmorphism, Flexbox, Animations)
- JavaScript (Vanilla — zero libraries)

---

## Features

### Validation
- Username must be at least 3 characters (signup)
- Email format is checked on signup and on the reset form
- Password must be at least 6 characters (login) / 8 characters (signup)
- Confirm-password matching is enforced
- Terms & conditions must be accepted
- All errors are shown inline, right under the input

### Password Strength Meter
The signup password field scores your password live across 4 levels — **Weak / Fair / Good / Strong** — based on length, mixed case, digits and symbols.

### Remember Me
On the login page, checking *Remember Me* saves your username in `localStorage` and pre-fills it on your next visit. (Frontend demo only — never store real passwords in the browser.)

### Forgot Password
A glass-style modal on the login page collects your email and confirms with a toast notification. Ready to be wired to a real backend.

---

## Folder Structure

```
glass-login-signup-ui/
│
├── login.html      → Login page (also served at the site root via index.html)
├── signup.html     → Signup page
├── style.css       → All styling (glassmorphism + responsive)
├── script.js       → All interactive logic
└── background.jpg  → Background photo
```

---

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/melleeyyy/glass-login-signup-ui.git
```

2. Open `login.html` in your browser — that's it, no build step needed.

### Optional: run with a local server

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

---

## Customization

- **Colors** — the accent gradient lives in `.auth-btn` in `style.css` (`linear-gradient(90deg, #a6ce39, #3d6d0c)`).
- **Background** — the site uses `background.jpg` (the original photo). To change it, replace the file or update the `background-image` URL in `.hero` in `style.css`. Any JPG/PNG/SVG of your own works — just update the URL.
- **Card blur** — tweak `backdrop-filter: blur(18px)` on `.auth-card`.
- **Validation rules** — all rules are in plain functions at the top of `script.js`.

---

## Roadmap / Future Improvements

- Backend authentication (Node / Firebase / Supabase)
- Email verification
- Social login buttons (Google, GitHub)
- Dark / light theme switch
- Multi-language support

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file.

---

## Author

**Malik Ey**

GitHub: https://github.com/melleeyyy
