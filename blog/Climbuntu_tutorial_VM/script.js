let currentStep = 1;

function showDescription(stepNumber) {
  const descriptionBox = document.getElementById("description-box");
  const descriptionContent = document.getElementById("description-content");

  // Hide all descriptions
  const descriptionDivs = descriptionContent.getElementsByTagName("div");
  for (let i = 0; i < descriptionDivs.length; i++) {
    descriptionDivs[i].style.display = "none";
  }

  // Show the description for the selected step
  const stepDescription = document.getElementById(`step-${stepNumber}-description`);
  stepDescription.style.display = "block";
  // stepDescription.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  // stepDescription.scrollTop += 1000;
  // Update the current step
  currentStep = stepNumber;

  // start from the top after switching steps
  const offset = 150; // Specify the desired offset in pixels
  const scrollToOffset = stepDescription.offsetTop - offset;
  window.scrollTo({ top: scrollToOffset, behavior: 'smooth' });


  // Enable or disable navigation buttons based on the current step
  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");

  previousButton.disabled = currentStep === 1;
  nextButton.disabled = currentStep === 4;

  // Remove active class from all steps
  const steps = document.getElementsByClassName("step");
  for (let i = 0; i < steps.length; i++) {
    steps[i].classList.remove("active");
  }

  // Add active class to the selected step
  const selectedStep = document.getElementById(`step-${currentStep}`);
  selectedStep.classList.add("active");
}

function navigate(direction) {
  const newStep = currentStep + direction;
  showDescription(newStep);
}

// Existing JavaScript code

window.addEventListener('DOMContentLoaded', function () {
  const welcomeModal = document.getElementById('welcome-modal');
  const startButton = document.getElementById('start-button');
  const main = document.querySelector('main');

  startButton.addEventListener('click', function () {
    welcomeModal.style.display = 'none';
    main.classList.remove('blur');
  });

  welcomeModal.style.display = 'block';
  main.classList.add('blur');
});
