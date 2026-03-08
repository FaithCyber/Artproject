// ===== Select page elements =====
const artworksBtn = document.getElementById("artworksBtn");
const artistsBtn = document.getElementById("artistsBtn");
const results = document.getElementById("results");
const statusMessage = document.getElementById("statusMessage");
const sectionTitle = document.getElementById("sectionTitle");
const sectionDescription = document.getElementById("sectionDescription");


// ===== ARTWORKS ENDPOINT =====
artworksBtn.addEventListener("click", function () {

    sectionTitle.textContent = "Artwork Collection";
    sectionDescription.textContent = "Displaying artwork information from the Art Institute of Chicago API.";

    statusMessage.textContent = "Loading artworks...";
    results.innerHTML = "";

    fetch("https://api.artic.edu/api/v1/artworks?limit=6")
        .then(response => response.json())
        .then(data => {

            statusMessage.textContent = "";

            data.data.forEach(artwork => {

                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <h3>${artwork.title || "Untitled"}</h3>
                    <p><strong>Artist:</strong> ${artwork.artist_title || "Unknown"}</p>
                    <p><strong>Date:</strong> ${artwork.date_display || "Unknown"}</p>
                    <hr>
                `;

                results.appendChild(card);

            });

        })
        .catch(error => {
            statusMessage.textContent = "Error loading artworks.";
            console.log(error);
        });

});


// ===== ARTISTS ENDPOINT =====
artistsBtn.addEventListener("click", function () {

    sectionTitle.textContent = "Artist Directory";
    sectionDescription.textContent = "Displaying artist information from the Art Institute of Chicago API.";

    statusMessage.textContent = "Loading artists...";
    results.innerHTML = "";

    fetch("https://api.artic.edu/api/v1/artists?limit=6")
        .then(response => response.json())
        .then(data => {

            statusMessage.textContent = "";

            data.data.forEach(artist => {

                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <h3>${artist.title || "Unknown Artist"}</h3>
                    <p><strong>Born:</strong> ${artist.birth_date || "Unknown"}</p>
                    <p><strong>Died:</strong> ${artist.death_date || "Unknown"}</p>
                    <hr>
                `;

                results.appendChild(card);

            });

        })
        .catch(error => {
            statusMessage.textContent = "Error loading artists.";
            console.log(error);
        });

});