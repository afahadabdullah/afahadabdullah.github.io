// Reference to the "users" node in your Firebase Realtime Database
const usersRef = firebase.database().ref('users');

// Variables to store counts
let totalUsers = 0;
const uniqueInstitutions = new Set();

// Retrieve data from the "users" node
usersRef.once('value', (snapshot) => {
  snapshot.forEach((userSnapshot) => {
    const user = userSnapshot.val();

    // Increment the total user count
    totalUsers++;

    // Check if the user has an associated institution
    if (user.institute) {
      // Add the institution to the Set to ensure uniqueness
      uniqueInstitutions.add(user.institute);
    }
  });

  // After iterating through all users, update the HTML elements
  const totalUsersElement = document.getElementById('totalUsers');
  const uniqueInstitutionsElement = document.getElementById('uniqueInstitutions');

  totalUsersElement.textContent = totalUsers + "+";
  uniqueInstitutionsElement.textContent = uniqueInstitutions.size + "+";
});
