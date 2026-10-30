document.addEventListener("DOMContentLoaded", () => {
    const gridTarget = document.getElementById("newsletter-grid-target");

    fetch("documents.json")
        .then(response => {
            if (!response.ok) throw new Error("Index sheet missing.");
            return response.json();
        })
        .then(data => {
            // Looks specifically inside the 'Documents/Newsletters' subfolder tree on Drive
            const folderKey = Object.keys(data).find(key => key.toLowerCase().includes("newsletter"));
            const folderData = data[folderKey];

            if (!folderData || !folderData.files || folderData.files.length === 0) {
                gridTarget.innerHTML = `<p class="loading-placeholder">No newsletters posted yet.</p>`;
                return;
            }

            gridTarget.innerHTML = ""; // Clear loader string text
            folderData.files.forEach(file => {
                const cleanName = file.name.replace(/\.[^/.]+$/, "");
                const row = document.createElement("div");
                row.className = "minutes-file-row";
                row.innerHTML = `
                    <span class="minutes-file-icon">📰</span>
                    <a href="${file.path}" class="minutes-download-link" target="_blank">${cleanName}</a>
                `;
                gridTarget.appendChild(row);
            });
        })
        .catch(err => {
            console.error(err);
            gridTarget.innerHTML = `<p class="loading-placeholder" style="color:#d32f2f;">⚠️ Waiting for sync pipeline activation.</p>`;
        });
});
