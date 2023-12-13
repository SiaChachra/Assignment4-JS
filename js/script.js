// Function to fetch music data based on a search term using iTunes API
function fetchMusicData() {
    // Retrieve the search term entered by the user
    let searchTerm = document.getElementById('search-term').value.trim();

    // Checking if the search term is empty
    if (!searchTerm) {
        // Display a message prompting to enter a search term
        document.getElementById('music-data').innerHTML = '<p>Please enter an artist name to search.</p>';
        return;
    }

    // Construct the API URL with the encoded search term
    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=music`;

    // Making an API request to fetch music data
    fetch(apiUrl)
        .then(response => {
            // Convert the response to JSON
            return response.json();
        })
        .then(data => {
            // Checking if no results were found
            if (data.results.length === 0) {
                // Throw an error if no results are found
                throw new Error('No results found for the given artist');
            }

            // Get the array of music tracks from the response
            const tracks = data.results;
            // Start building the HTML content to display the results
            let htmlContent = `<h2>Music Results for "${searchTerm}"</h2><ul>`;

            // Loop through each track 
            tracks.forEach(track => {
                htmlContent += `<li>${track.artistName} - ${track.trackName}</li>`;
            });

            htmlContent += '</ul>';

            document.getElementById('music-data').innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error:', error);
            // Display an error message
            document.getElementById('music-data').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
