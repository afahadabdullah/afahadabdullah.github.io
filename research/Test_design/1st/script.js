// script.js
let previousActive = 'publications'; // Initialize with the default active section

function toggleContent(contentId) {
    const contents = document.querySelectorAll('.content');
    const buttons = document.querySelectorAll('.toggle-buttons button');

    contents.forEach(content => {
        content.classList.remove('active');
    });

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const content = document.getElementById(contentId);
    const button = document.getElementById(contentId + '-btn');

    content.classList.add('active');
    button.classList.add('active');
}

