document.addEventListener("DOMContentLoaded", () => {
    const documentTarget = document.getElementById("minutes-document-target");

    fetch("documents.json")
        .then(response => {
            if (!response.ok) throw new Error("Index sheet missing.");
            return response.json();
        })
        .then(data => {
            // Looks specifically inside the 'Documents/Meeting Minutes' subfolder tree on Drive
            const folderKey = Object.keys(data).find(key => key.toLowerCase().includes("minutes"));
            const folderData = data[folderKey];

            if (!folderData || !folderData.files || folderData.files.length === 0) {
                documentTarget.innerHTML = `<p class="loading-placeholder">No recent minutes posted.</p>`;
                return;
            }

            documentTarget.innerHTML = ""; // Clear loader string text
            folderData.files.forEach(file => {
                const cleanName = file.name.replace(/\.[^/.]+$/, ""); // Removes '.pdf'
                const row = document.createElement("div");
                row.className = "minutes-file-row";
                row.innerHTML = `
                    <span class="minutes-file-icon">📄</span>
                    <a href="${file.path}" class="minutes-download-link" target="_blank">${cleanName}</a>
                `;
                documentTarget.appendChild(row);
            });
        })
        .catch(err => {
            console.error(err);
            documentTarget.innerHTML = `<p class="loading-placeholder" style="color:#d32f2f;">⚠️ Waiting for sync pipeline activation.</p>`;
        });
});
