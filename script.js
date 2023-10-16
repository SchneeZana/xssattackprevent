// scripts.js
document.addEventListener('DOMContentLoaded', (event) => {
    const url = document.location.search;
    const params = new URLSearchParams(url);

    // Fix for XSS vulnerability #1
    let userParam = params.get("name");
    let userName = "applicant";
    if (userParam !== null) {
        userName = DOMPurify.sanitize(userParam);  // Sanitization applied here
    }
    document.getElementById("welcome-text").textContent = `How do you do, ${userName}?`;  // Avoid using innerHTML

    // Fix for XSS vulnerability #2
    const input = document.getElementById("fav-meal-question");
    const log = document.getElementById("fav-meal-answer");

    input.addEventListener("input", function(e) {
        log.textContent = e.target.value;  // Avoid using innerHTML
    });

    // Fix for XSS vulnerability #3
    const htmlInput = document.getElementById("html-input");
    const htmlOutput = document.getElementById("html-output");
    const showButton = document.getElementById("show-html");

    showButton.addEventListener("click", function() {
        const sanitizedInput = DOMPurify.sanitize(htmlInput.value);  // Sanitization applied here
        htmlOutput.innerHTML = sanitizedInput;  // Safe to use since we sanitized it
    });

    // Fix for XSS vulnerability #4
    const redir = params.get("goto");
    if (redir) {
        if (redir.startsWith("http://") || redir.startsWith("https://")) { // Validate the URL
            window.location = redir;
        } else {
            console.error("Invalid URL provided!");
        }
    }
});
