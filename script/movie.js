const API_KEY = '8f8bde5367d32d3a89adbad50194146e';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const moviesContainer = document.getElementById('movies-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentPage = 1; // Start at page 1

// Function to fetch movies with pagination
async function getMovies(page = 1) {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    displayMovies(data.results);
    
    // Enable/disable buttons
    prevButton.disabled = page === 1;
    nextButton.disabled = page >= data.total_pages;
}

// Function to display movies
function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
        `;
        
        // Navigate to details page on click
        movieEl.addEventListener('click', () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        moviesContainer.appendChild(movieEl);
    });
}

// Event listeners for pagination
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getMovies(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    getMovies(currentPage);
});

// Initial fetch
getMovies();

const searchInput = document.getElementById('search');

// Function to fetch and display searched movies
async function searchMovies(query) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    displayMovies(data.results);
}

// Listen for user input and trigger search
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchMovies(query);
    } else {
        getMovies(); // Show popular movies when search is empty
    }
});


function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
        `;
        
        // When clicked, go to movie details page
        movieEl.addEventListener('click', () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        moviesContainer.appendChild(movieEl);
    });
}

function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
        `;

        // Redirect to movie.html with the movie ID
        movieEl.addEventListener('click', () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        moviesContainer.appendChild(movieEl);
    });
}


function addToFavorites(id, title, poster) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if movie is already in favorites
    if (!favorites.some(movie => movie.id === id)) {
        favorites.push({ id, title, poster });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${title} added to favorites!`);
    } else {
        alert(`${title} is already in favorites!`);
    }
}


