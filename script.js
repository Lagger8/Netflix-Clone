// Simulating user authentication state
let isLoggedIn = false;

// Dynamic Sign In/Sign Out button update
document.addEventListener('DOMContentLoaded', function () {
    const authButton = document.getElementById('authButton');
    
    if (authButton) { // Check if authButton exists on the page
        updateAuthButton(authButton);

        // Toggle login state on button click
        authButton.addEventListener('click', function () {
            if (isLoggedIn) {
                isLoggedIn = false;
                window.location.reload(); // Reload the page after sign out
            }
        });
    }
});

function updateAuthButton(button) {
    if (isLoggedIn) {
        button.textContent = 'Sign Out';
        button.href = '#'; // Placeholder for sign-out functionality
    } else {
        button.textContent = 'Sign In';
        button.href = 'sign-in.html'; // Redirect to sign-in page
    }
}

// Add hover effect to movie sections
function addHoverEffectToMovies(sectionId) {
    const movieSection = document.getElementById(sectionId);

    if (movieSection) {
        movieSection.addEventListener('mouseover', function (e) {
            if (e.target.tagName === 'IMG') {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.transition = 'transform 0.3s ease';
            }
        });

        movieSection.addEventListener('mouseout', function (e) {
            if (e.target.tagName === 'IMG') {
                e.target.style.transform = 'scale(1)';
            }
        });
    }
}

// Apply hover effect to multiple sections
document.addEventListener('DOMContentLoaded', function () {
    ['popular', 'trending', 'watch-again'].forEach(addHoverEffectToMovies);
});

// Movie hover effect with title overlay
const movieGrid = document.getElementById('movieGrid');
if (movieGrid) {
    movieGrid.addEventListener('mouseover', function (e) {
        if (e.target.tagName === 'IMG') {
            const movieTitle = e.target.alt || e.target.parentElement.getAttribute('data-title');
            const overlay = document.createElement('div');
            overlay.textContent = movieTitle;
            overlay.classList.add('movie-overlay');
            e.target.parentElement.appendChild(overlay);
        }
    });

    movieGrid.addEventListener('mouseout', function (e) {
        if (e.target.tagName === 'IMG') {
            const overlay = e.target.parentElement.querySelector('.movie-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    });
}

// Auto-play movie carousel
let movieIndex = 0;
const movies = document.querySelectorAll('.movie');
if (movies.length) {
    function showNextMovie() {
        movies[movieIndex].classList.remove('active');
        movieIndex = (movieIndex + 1) % movies.length;
        movies[movieIndex].classList.add('active');
    }

    setInterval(showNextMovie, 3000); // Switch movies every 3 seconds
}

// Adding functionality for removing movies from "My List"
function addRemoveFunctionality(sectionId) {
    const listSection = document.getElementById(sectionId);
    
    if (listSection) {
        listSection.addEventListener('click', function (e) {
            if (e.target.tagName === 'IMG') {
                const confirmation = confirm(`Are you sure you want to remove ${e.target.alt} from your list?`);
                if (confirmation) {
                    e.target.parentElement.remove(); // Remove the movie from the list
                }
            }
        });
    }
}

// Apply hover and remove functionality to "My List" section
document.addEventListener('DOMContentLoaded', function () {
    addHoverEffectToMovies('my-list'); // Apply hover effect
    addRemoveFunctionality('my-list'); // Enable remove functionality
});

// Sign-in form logic for user authentication
document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.querySelector('.sign-in form');
    
    if (signInForm) {
        signInForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent actual form submission

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Basic login check
            if (email === 'user@example.com' && password === 'password123') {
                isLoggedIn = true;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                alert('Sign In successful! Redirecting to Home...');
                window.location.href = 'home.html'; // Redirect to home page after login
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }
});

// Check login status from localStorage when loading pages
document.addEventListener('DOMContentLoaded', function () {
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        const userEmail = localStorage.getItem('userEmail');
        console.log(`User ${userEmail} is logged in.`);
        
        // Update "Sign In" button to "Sign Out"
        const authButton = document.getElementById('authButton');
        if (authButton) {
            updateAuthButton(authButton);
        }
    }
});
