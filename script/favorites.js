const favoritesContainer = document.getElementById('favorites-container');
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

// Load favorites from local storage
function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorite movies yet.</p>";
        return;
    }

    favoritesContainer.innerHTML = ''; // Clear old content
    favorites.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button class="remove-btn" onclick="removeFromFavorites(${movie.id})">❌ Remove</button>
        `;
        favoritesContainer.appendChild(movieEl);
    });
}

// Remove a movie from favorites
function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(movie => movie.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites(); // Refresh list
}

// Load favorites when the page loads
loadFavorites();
