const artworksBtn = document.getElementById("artworksBtn");
const artistsBtn = document.getElementById("artistsBtn");
const results = document.getElementById("results");
const statusMessage = document.getElementById("statusMessage");
const sectionTitle = document.getElementById("sectionTitle");
const sectionDescription = document.getElementById("sectionDescription");

const artworksUrl =
  "https://api.artic.edu/api/v1/artworks?limit=6&fields=title,artist_title,date_display,image_id";

const artistsUrl =
  "https://api.artic.edu/api/v1/artists?limit=6&fields=title,birth_date,death_date";

/* ===== ARTWORK GALLERY ===== */
artworksBtn.addEventListener("click", function () {
  sectionTitle.textContent = "Artwork Gallery";
  sectionDescription.textContent =
    "Displaying artwork images and details from the Art Institute of Chicago API.";

  statusMessage.textContent = "Loading artworks...";
  results.innerHTML = "";

  fetch(artworksUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      statusMessage.textContent = "";
      results.innerHTML = "";

      data.data.forEach(function (artwork) {
        const card = document.createElement("div");
        card.classList.add("card");

        let imageHTML = `<div class="no-image">No image available</div>`;

        if (artwork.image_id) {
          const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`;
          imageHTML = `<img src="${imageUrl}" alt="${artwork.title || "Artwork image"}" class="art-image">`;
        }

        card.innerHTML = `
          ${imageHTML}
          <div class="card-content">
            <h3>${artwork.title || "Untitled"}</h3>
            <p><strong>Artist:</strong> ${artwork.artist_title || "Unknown"}</p>
            <p><strong>Date:</strong> ${artwork.date_display || "Unknown"}</p>
          </div>
        `;

        results.appendChild(card);
      });
    })
    .catch(function (error) {
      statusMessage.textContent = "Error loading artworks.";
      console.error("Artwork fetch error:", error);
    });
});

/* ===== ARTISTS ===== */
artistsBtn.addEventListener("click", function () {
  sectionTitle.textContent = "Artist Directory";
  sectionDescription.textContent =
    "Displaying artist information from the Art Institute of Chicago API.";

  statusMessage.textContent = "Loading artists...";
  results.innerHTML = "";

  fetch(artistsUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      statusMessage.textContent = "";
      results.innerHTML = "";

      data.data.forEach(function (artist) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <div class="card-content">
            <h3>${artist.title || "Unknown Artist"}</h3>
            <p><strong>Born:</strong> ${artist.birth_date || "Unknown"}</p>
            <p><strong>Died:</strong> ${artist.death_date || "Unknown"}</p>
          </div>
        `;

        results.appendChild(card);
      });
    })
    .catch(function (error) {
      statusMessage.textContent = "Error loading artists.";
      console.error("Artist fetch error:", error);
    });
});