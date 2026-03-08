const results = document.getElementById("results");
const artworksBtn = document.getElementById("artworksBtn");
const artistsBtn = document.getElementById("artistsBtn");

/* ===== ARTWORK ENDPOINT ===== */
artworksBtn.addEventListener("click", function () {

    results.innerHTML = "Loading artworks...";

    fetch("https://api.artic.edu/api/v1/artworks?limit=5")
        .then(response => response.json())
        .then(data => {

            results.innerHTML = "";

            data.data.forEach(artwork => {

                const item = document.createElement("div");

                item.innerHTML = `
                    <h3>${artwork.title}</h3>
                    <p>Artist: ${artwork.artist_title || "Unknown"}</p>
                    <p>Date: ${artwork.date_display || "Unknown"}</p>
                    <hr>
                `;

                results.appendChild(item);

            });

        })
        .catch(error => {
            results.innerHTML = "Error loading artworks.";
            console.log(error);
        });

});


/* ===== ARTIST ENDPOINT ===== */
artistsBtn.addEventListener("click", function () {

    results.innerHTML = "Loading artists...";

    fetch("https://api.artic.edu/api/v1/artists?limit=5")
        .then(response => response.json())
        .then(data => {

            results.innerHTML = "";

            data.data.forEach(artist => {

                const item = document.createElement("div");

                item.innerHTML = `
                    <h3>${artist.title}</h3>
                    <p>Birth: ${artist.birth_date || "Unknown"}</p>
                    <p>Death: ${artist.death_date || "Unknown"}</p>
                    <hr>
                `;

                results.appendChild(item);

            });

        })
        .catch(error => {
            results.innerHTML = "Error loading artists.";
            console.log(error);
        });

});