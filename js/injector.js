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

    // 3. Inject Veteran Grid Content (Only on veteran.html)
    const path = window.location.pathname;
    const currentPage = path.split("/").pop().replace(".html", "") || "index";

    if (currentPage === 'veteran') {
        const gridPlaceholder = document.getElementById("center-content-block");
        if (gridPlaceholder) {
            fetch("veteran-grid.html")
                .then(response => {
                    if (!response.ok) throw new Error("Grid layout error");
                    return response.text();
                })
                .then(data => { gridPlaceholder.innerHTML = data; })
                .catch(err => console.error("Grid Error:", err));
        }
    }
});
