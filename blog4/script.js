// Replace with your Firebase project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2L31O2VtvaXWe-ktH77iMagARxdNqB88",
  authDomain: "climpy-e9dab.firebaseapp.com",
  projectId: "climpy-e9dab",
  storageBucket: "climpy-e9dab.appspot.com",
  messagingSenderId: "194247994975",
  appId: "1:194247994975:web:422d737a1bd25c0a4335ea",
  measurementId: "G-0R00GJTLX5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); // or .SESSION


// Check the authentication state when the page loads
firebase.auth().onAuthStateChanged((user) => {
  updateButtonVisibility(user);
});

// JavaScript to toggle dark and bright modes
const body = document.body;
const toggleBtn = document.getElementById('toggle-btn');
const toggleSwitch = document.querySelector('.toggle-switch');

// Function to handle the toggle switch state change
function handleDarkModeToggle() {
  body.classList.toggle('dark-mode');
  // Also toggle the dark mode for each section
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    section.classList.toggle('dark-mode');
  });
}

// toggleBtn.addEventListener('change', handleDarkModeToggle);



// Select the login and logout buttons
const loginButton = document.getElementById('form-open');
const logoutButton = document.getElementById('logout-button');


// Function to update button visibility based on authentication state
function updateButtonVisibility(user) {
  if (user) {
    // User is logged in, show the logout button and hide the login button
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
    // enableTutorialLinks();
  } else {
    // User is logged out, show the login button and hide the logout button
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
    // disableTutorialLinks();
  }
}


// Function to check authentication status and redirect if not authenticated
function checkAuthenticationAndRedirect(url) {
    const user = firebase.auth().currentUser;

    if (user) {
        // User is authenticated, allow them to access the tutorial
        window.location.href = url;
    } else {
        // User is not authenticated, display a message or redirect to login page
        alert("You must be logged in to access this tutorial.");
        // You can also redirect to the login page like this:
        // window.location.href = "/login.html";
    }
}


// Event listener for the logout button
logoutButton.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('Logged out');
    })
    .catch(error => {
      console.error('Logout error:', error.message);
    });
});


// Attach an event listener to the tutorial links
const tutorialLinks = document.querySelectorAll('.tutorial-link');
tutorialLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        // Prevent the default link behavior
        event.preventDefault();
        
        // Get the href attribute of the clicked link
        const tutorialUrl = event.currentTarget.getAttribute('href');

        // Check authentication and redirect
        checkAuthenticationAndRedirect(tutorialUrl);
    });
});


const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => {
  home.classList.add("show");
  document.body.classList.add("disable-scroll");
  });
formCloseBtn.addEventListener("click", () => {
  home.classList.remove("show");
  document.body.classList.remove("disable-scroll");
});


pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');




function login() {
  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;
  const errorMessage = document.getElementById('error-message-login');

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (user.emailVerified) {
        errorMessage.innerText = '';
        loginEmailInput.value = '';
        loginPasswordInput.value = '';
        home.classList.remove("show");
      } else {
        firebase.auth().signOut()
        errorMessage.innerText = 'Please verify your email before logging in.';
      }
    })
    .catch(error => {
      console.error('Login error:', error.message);
      errorMessage.innerText = 'Invalid credentials. Please try again.';
      console.log('Error:', error);
    });
}


function register() {
  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;
  const confirmPasswordSignup = document.getElementById('register-confirm-password').value;
  const passwordMismatchSignup = document.getElementById('password-mismatch');
  const successMessageSignup = document.getElementById('success-message-signup');

  // Check if passwords match
  if (password !== confirmPasswordSignup) {
    passwordMismatchSignup.innerText = 'Passwords do not match. Please try again.';
    successMessageSignup.innerText = ''; // Clear the success message
    return; // Exit the function without attempting registration
  }

  // If passwords match, proceed with registration
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Send email verification
      userCredential.user.sendEmailVerification();
      firebase.auth().signOut()
      return;
    })
    .then(() => {
      passwordMismatchSignup.innerText = ''; // Clear the error message
      successMessageSignup.innerText = 'Registration successful. Please check your email to verify.';
      console.log('Verification email sent. Please verify your email.');
    })
    .catch(error => {
      console.error('Registration error:', error.message);
    });
}


const forgotPasswordLink = document.getElementById('forgot-password');
forgotPasswordLink.addEventListener('click', () => {
  const email = prompt('Enter your email address:');
  if (email) {
    // Send a password reset email to the provided email address
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent. Please check your email.');
      })
      .catch(error => {
        console.error('Password reset error:', error.message);
        alert('An error occurred. Please try again later.');
      });
  }
});


