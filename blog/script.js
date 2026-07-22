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
const database = firebase.database();


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

// Select the login and logout buttons
const loginButton = document.getElementById('form-open');
const logoutButton = document.getElementById('logout-button');
const userButton = document.getElementById('User-profile');
const loginButton1 = document.getElementById('form-open-1');
const userButton1 = document.getElementById('User-profile-1');

// Function to update button visibility based on authentication state
function updateButtonVisibility(user) {
  if (user) {
    // User is logged in, show the logout button and hide the login button
    loginButton.style.display = 'none';
    loginButton1.style.display = 'none';
    userButton.style.display = 'block';
    userButton1.style.display = 'block';
    logoutButton.style.display = 'block';
    document.body.classList.remove("disable-scroll");
    // enableTutorialLinks();
  } else {
    // User is logged out, show the login button and hide the logout button
    loginButton.style.display = 'block';
    loginButton1.style.display = 'block';
    userButton.style.display = 'none';
    userButton1.style.display = 'none';
    logoutButton.style.display = 'block';
    document.body.classList.remove("disable-scroll");
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

document.addEventListener("DOMContentLoaded", function () {
  const button1 = document.getElementById("form-open-1");
  const button2 = document.getElementById("form-open-1");

  button1.addEventListener("click", function () {
    formOpenBtn.click();
  });

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
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPasswordSignup = document.getElementById('register-confirm-password').value;
    const name = document.getElementById('register-name').value;
    const institute = document.getElementById('register-institute').value;
    const position = document.getElementById('register-position').value;
    const passwordMismatchSignup = document.getElementById('password-mismatch');
    const successMessageSignup = document.getElementById('success-message-signup');
    const errorMessageSignup = document.getElementById('error-message-signup');

    // Check if passwords match
    if (password !== confirmPasswordSignup) {
        passwordMismatchSignup.innerText = 'Passwords do not match. Please try again.';
        successMessageSignup.innerText = ''; // Clear the success message
        return; // Exit the function without attempting registration
    }

    // If passwords match, proceed with registration
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Add user data to Realtime Database
            const userId = userCredential.user.uid;
            const userData = {
                name: name,
                email: email,
                institute: institute,
                position: position
            };
            database.ref('users' + '/' + userId).set(userData);

            // Send email verification
            userCredential.user.sendEmailVerification();
            // firebase.auth().signOut(); // Sign out after registration
            // Delay for 2 seconds before signing out
            setTimeout(() => {
              firebase.auth().signOut()
                .then(() => {
                  // Successfully signed out
                })
                .catch((error) => {
                  // Handle sign-out error
                });
            }, 2000); // 2000 milliseconds (2 seconds)
            return;
        })
        .then(() => {
            passwordMismatchSignup.innerText = ''; // Clear the error message
            errorMessageSignup.innerText = ''
            successMessageSignup.innerText = 'Registration successful. Please check your email to verify.';
            console.log('Registration successful.');
        })

        .catch((error) => {
            successMessageSignup.innerText = '';
            errorMessageSignup.innerText = 'The email address is already in use by another account.';
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


const profileButton = document.querySelector("#User-profile")
const userPopup = document.getElementById('user-popup');
const closePopup = document.getElementById('close-popup');

profileButton.addEventListener('click', () => {
  userPopup.style.display = 'block';
  document.body.classList.add("disable-scroll");
});

closePopup.addEventListener('click', () => {
  userPopup.style.display = 'none';
  document.body.classList.remove("disable-scroll");
});

document.addEventListener("DOMContentLoaded", function () {
  const button2 = document.getElementById("User-profile-1");

  button2.addEventListener("click", function () {
    profileButton.click();
  });

});


// Function to update user profile information from Firebase Database
function updateUserProfileInfo(user) {
  const userNameElement = document.getElementById('user-name');
  const userEmailElement = document.getElementById('user-email');
  const userInstituteElement = document.getElementById('user-institute');
  const userPositionElement = document.getElementById('user-position');
  const logoutButton = document.getElementById('logout-button');

  if (user) {
    // Assuming you have the user's UID, which you can get from Firebase Auth
    const userUid = user.uid;

    // Reference to the user's data in the Firebase Realtime Database
    const userRef = database.ref('users/' + userUid);

    // Fetch user data from the database
    userRef.once('value', (snapshot) => {
      const userData = snapshot.val();

      // Check if user data exists
      if (userData) {
        userNameElement.textContent = userData.name || 'N/A';
        userEmailElement.textContent = userData.email || 'N/A';
        userInstituteElement.textContent = userData.institute || 'N/A';
        userPositionElement.textContent = userData.position || 'N/A';

        // Show the logout button
        logoutButton.style.display = 'block';
      } else {
        // Handle the case where user data is missing
        console.error('User data not found in the database.');
      }
    });
  } else {
    // If no user is logged in, provide default values or hide the content.
    userNameElement.textContent = 'Not logged in';
    userEmailElement.textContent = 'N/A';
    userInstituteElement.textContent = 'N/A';
    userPositionElement.textContent = 'N/A';

    // Hide the logout button
    logoutButton.style.display = 'none';
  }
}

// Update user profile information when the page loads and when the authentication state changes
firebase.auth().onAuthStateChanged((user) => {
  updateUserProfileInfo(user);
});




// Event listener for the logout button
logoutButton.addEventListener('click', () => {
  
  firebase.auth().signOut()
    .then(() => {
      console.log('Logged out');
      userPopup.style.display = 'none';
    })
    .catch(error => {
      console.error('Logout error:', error.message);
    });
});


document.addEventListener("DOMContentLoaded", function() {
  var navbarCollapse = document.querySelector(".navbar-collapse");
  var popupContent = document.querySelector(".popup-content");
  var closepopup = document.getElementById("close-popup")

  if (navbarCollapse && popupContent) {
    navbarCollapse.addEventListener("transitionend", function() {
      if (navbarCollapse.classList.contains("show")) {
        popupContent.style.marginTop = "350px";
        closepopup.style.marginTop = "360px";
      } else {
        popupContent.style.marginTop = "70px";
        closepopup.style.marginTop = "80px";
      }
    });
  }
});



