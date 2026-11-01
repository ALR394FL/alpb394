document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Shared Global Header
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("header.html")
            .then(response => {
                if (!response.ok) throw new Error("Header download error");
                return response.text();
            })
            .then(data => { headerPlaceholder.innerHTML = data; })
            .catch(err => console.error("Header Error:", err));
    }

    // 2. Inject Shared Global Footer
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Footer download error");
                return response.text();
            })
            .then(data => { footerPlaceholder.innerHTML = data; })
            .catch(err => console.error("Footer Error:", err));
    }

    //  3.Add this condition inside your main DOMContentLoaded wrapper in js/injector.js
if (currentPage === "monthly-events" || currentPage === "events") {
    const flyersGrid = document.getElementById("flyers-grid-target");
    if (flyersGrid) {
        // Loads the list relative to where the site is running on GitHub Pages
        fetch("flyers/index.json")
            .then(res => {
                if (!res.ok) throw new Error("Flyers listing missing");
                return res.json();
            })
            .then(imageFiles => {
                if (!imageFiles.length) {
                    flyersGrid.innerHTML = `
                        <p style="grid-column: span 2; text-align: center; color: #aaa;">
                            No current event flyers scheduled. Check back soon!
                        </p>`;
                    return;
                }

                // Render each image instantly using local paths
                flyersGrid.innerHTML = imageFiles.map(fileName => {
                    const cleanLabel = fileName
                        .replace(/\.[^/.]+$/, "")
                        .replace(/[-_]/g, " ");

                    return `
                        <div class="officer-node event-flyer-node">
                            <a href="flyers/${fileName}" target="_blank">
                                <img src="flyers/${fileName}" alt="${cleanLabel}" />
                                <span class="event-title-text">${cleanLabel}</span>
                            </a>
                        </div>
                    `;
                }).join('');
            })
            .catch(err => {
                console.error("Flyer Loader Offline:", err);
                flyersGrid.innerHTML = `
                    <p style="grid-column: span 2; text-align: center; color: #ff5555;">
                        Temporarily unable to display event flyers.
                    </p>`;
            });
    }
}

});
