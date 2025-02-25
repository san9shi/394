document.addEventListener("DOMContentLoaded", function () {
    const pages = [
        { name: "San9shi", url: "index.html" },
        { name: "?", url: "page1.html" },
        { name: "??", url: "page2.html" },
        { name: "???", url: "page3.html" }
    ];

    let currentPage = pages.findIndex(page => window.location.pathname.includes(page.url));
    if (currentPage === -1) currentPage = 0; // Si non trouvé, on met la page 0

    const pageIndicator = document.getElementById("pageIndicator");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageDropdown = document.getElementById("pageDropdown");
    const pageList = document.getElementById("pageList");

    // Met à jour l'affichage du numéro de page et la visibilité des flèches
    function updatePageIndicator() {
    pageIndicator.textContent = currentPage; // Affiche le numéro dans le rond

    // Ajout/suppression de la classe hidden au lieu de display: none
    prevPageBtn.classList.toggle("hidden", currentPage === 0);
    nextPageBtn.classList.toggle("hidden", currentPage === pages.length - 1);
}

    updatePageIndicator(); // Mise à jour initiale

    // Navigation avec les flèches
    prevPageBtn.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage--;
            window.location.href = pages[currentPage].url;
        }
    });

    nextPageBtn.addEventListener("click", function () {
        if (currentPage < pages.length - 1) {
            currentPage++;
            window.location.href = pages[currentPage].url;
        }
    });

    // Ouvrir/fermer le menu au clic sur le numéro
    pageIndicator.addEventListener("click", function () {
        pageDropdown.style.display = pageDropdown.style.display === "block" ? "none" : "block";
    });

    // Remplir la liste des pages et ajouter les événements de clic
    pageList.innerHTML = ""; 
    pages.forEach((page, index) => {
        const li = document.createElement("li");
        li.textContent = page.name; // Affiche le nom personnalisé
        li.addEventListener("click", function () {
            window.location.href = page.url; // Redirige vers la page sélectionnée
        });
        pageList.appendChild(li);
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener("click", function (event) {
        if (!pageIndicator.contains(event.target) && !pageDropdown.contains(event.target)) {
            pageDropdown.style.display = "none";
        }
    });
});
