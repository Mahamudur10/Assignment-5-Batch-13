// Function to fetch issues
const fetchIssues = async () => {
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        return data.data; // return the array
    } catch (err) {
        console.error("Error fetching issues:", err);
        return [];
    }
}

// Function to display issues
const displayIssues = (issues) => {
    const container = document.getElementById("issues-container");
    container.innerHTML = "";

    issues.forEach(issue => {
        const div = document.createElement("div");
        div.classList = `card bg-white shadow-sm border-t-4 ${issue.status === "open" ? "border-green-500" : "border-purple-500"}`;
        const statusIcon = issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";

        // Priority badge
        let priorityBg, priorityText;
        switch(issue.priority.toLowerCase()) {
            case "high":
                priorityBg = "bg-[#feecec]";
                priorityText = "text-[#ef4444]";
                break;
            case "medium":
                priorityBg = "bg-[#fff6d1]";
                priorityText = "text-[#f59e0b]";
                break;
            case "low":
                priorityBg = "bg-[#eeeff2]";
                priorityText = "text-[#9ca3af]";
                break;
            default:
                priorityBg = "bg-gray-100";
                priorityText = "text-gray-600";
        }

        // Dynamic labels
        let labelsHTML = '';
        issue.labels.forEach(label => {
            let bgColor = 'bg-gray-200', textColor = 'text-gray-700';

            if(label.toLowerCase() === 'bug') {
                bgColor = 'bg-[#feecec]';
                textColor = 'text-[#ef4444]';
            } else if(label.toLowerCase() === 'help wanted') {
                bgColor = 'bg-[#fff8db]';
                textColor = 'text-[#db7f13]';
            } else if(label.toLowerCase() === 'enhancement') {
                bgColor = 'bg-[#e0f7fa]';
                textColor = 'text-[#0288d1]';
            } else if(label.toLowerCase() === 'documentation') {
                bgColor = 'bg-[#f3e5f5]';
                textColor = 'text-[#8e24aa]';
            }

            labelsHTML += `<span class="badge badge-sm ${bgColor} ${textColor} py-1 px-2 rounded-full text-xs">${label.toUpperCase()}</span> `;
        });

        // Inner HTML
        div.innerHTML = `
            <div class="card-body p-4">
                <div class="flex gap-1 justify-between items-center">
                    <img src="${statusIcon}" alt="">
                    <span class="px-4 py-1 rounded-full text-center font-semibold ${priorityBg} ${priorityText}">${issue.priority}</span>
                </div>
                <h3 class="font-semibold text-sm">${issue.title}</h3>
                <p class="text-xs text-gray-500 line-clamp-2">${issue.description}</p>

                <div class="flex gap-2 mt-2">
                    ${labelsHTML}
                </div>

                <div class="border-t border-gray-100 mt-3">
                    <p class="text-xs text-gray-400 mt-3">#${issue.id} by ${issue.author}</p>
                    <p class="text-xs text-gray-400">${issue.createdAt}</p>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

// Function to load and display issues
const loadIssues = async () => {
    const issues = await fetchIssues();
    displayIssues(issues);
}

// Initial load
loadIssues();

// Optional: Button to reload issues manually
document.getElementById("reloadBtn").addEventListener("click", () => {
    loadIssues();
});