const API_KEY = '8f8bde5367d32d3a89adbad50194146e';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const movieDetails = document.getElementById('movie-details');

// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Fetch movie details
async function getMovieDetails() {
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
    const data = await res.json();
    displayMovieDetails(data);
}

function displayMovieDetails(movie) {
    const trailer = movie.videos.results.find(video => video.type === "Trailer");
    
    // Replace with the actual Goojara search link (or direct movie URL if known)
    const goojaraLink = `https://www.goojara.to/s?query=${encodeURIComponent(movie.title)}`;

    movieDetails.innerHTML = `
        <h1>${movie.title}</h1>
        <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
        <p>${movie.overview}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>

        ${trailer ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>` : '<p>No trailer available</p>'}

        <h2>Watch Now</h2>
        <a href="${goojaraLink}" target="_blank" rel="noopener noreferrer">▶ Watch on Goojara</a>

        <h2>Download</h2>
        <a href="${goojaraLink}" target="_blank" rel="noopener noreferrer">⬇ Download from Goojara</a>
    `;
}




getMovieDetails();
