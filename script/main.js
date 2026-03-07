let allIssues = [];

// Spinner control
const toggleSpinner = (show) => {
    const spinner = document.getElementById("loading-spinner");
    if (!spinner) return;
    if (show) spinner.classList.remove("hidden");
    else spinner.classList.add("hidden");
};

// Fetch all issues
const fetchAllIssues = async () => {
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        return data.data || [];
    } catch (err) {
        console.error("Error fetching all issues:", err);
        return [];
    }
};

// Fetch single issue by ID
const fetchSingleIssue = async (id) => {
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error("Error fetching single issue:", err);
        return null;
    }
};

// Search issues from API
const searchIssues = async (query) => {
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        return data.data || [];
    } catch (err) {
        console.error("Error searching issues:", err);
        return [];
    }
};

// Display issues in cards
const displayIssues = (issues) => {
    const container = document.getElementById("issues-container");
    if (!container) return;
    container.innerHTML = "";

    issues.forEach(issue => {
        const div = document.createElement("div");
        div.classList = `card bg-white shadow-sm border-t-4 cursor-pointer hover:shadow-md transition-shadow ${issue.status === "open" ? "border-green-500" : "border-purple-500"}`;

        const statusIcon = issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";

        // Priority badge style
        let priorityBg, priorityText;
        switch(issue.priority.toLowerCase()) {
            case "high":
                priorityBg = "bg-[#feecec]"; priorityText = "text-[#ef4444]";
                break;
            case "medium":
                priorityBg = "bg-[#fff6d1]"; priorityText = "text-[#f59e0b]";
                break;
            case "low":
                priorityBg = "bg-[#eeeff2]"; priorityText = "text-[#9ca3af]";
                break;
            default:
                priorityBg = "bg-gray-100"; priorityText = "text-gray-600";
        }

        // Labels HTML
        let labelsHTML = '';
        issue.labels.forEach(label => {
            let bgColor = 'bg-gray-200', textColor = 'text-gray-700';
            let iconHTML = '';
            
            if(label.toLowerCase() === 'bug') { 
                bgColor = 'bg-[#feecec]'; 
                textColor = 'text-[#ef4444]';
                iconHTML = '<i class="fa-solid fa-bug mr-1 text-[10px]"></i>';
            }
            else if(label.toLowerCase() === 'help wanted') { 
                bgColor = 'bg-[#fff8db]'; 
                textColor = 'text-[#db7f13]';
                iconHTML = '<i class="fa-regular fa-life-ring mr-1 text-[10px]"></i>';
            }
            else if(label.toLowerCase() === 'enhancement') {
                bgColor = 'bg-[#e0f7fa]'; 
                textColor = 'text-[#0288d1]';
            } 
            else if(label.toLowerCase() === 'documentation') {
                bgColor = 'bg-[#f3e5f5]';
                textColor = 'text-[#8e24aa]';
            }

            labelsHTML += `<span class="badge badge-sm border-none ${bgColor} ${textColor} py-1 px-2 rounded-full text-[10px] font-bold flex items-center">${iconHTML}${label.toUpperCase()}</span> `;
        });

        div.innerHTML = `
            <div class="card-body p-4">
                <div class="flex justify-between items-center mb-2">
                    <img src="${statusIcon}" alt="status" class="w-4 h-4">
                    <span class="px-3 py-1 rounded-full text-[10px] font-bold ${priorityBg} ${priorityText}">${issue.priority.toUpperCase()}</span>
                </div>
                <h3 class="font-bold text-sm text-slate-800 mb-1">${issue.title}</h3>
                <p class="text-xs text-gray-500 line-clamp-2 mb-3">${issue.description}</p>
                <div class="flex flex-wrap gap-1 mb-4">${labelsHTML}</div>
                <div class="border-t border-gray-100 pt-3 mt-auto">
                    <p class="text-[10px] text-gray-400 font-medium">#${issue.id} by ${issue.author}</p>
                    <p class="text-[10px] text-gray-400">${issue.createdAt}</p>
                </div>
            </div>
        `;

        // Card click event
        div.addEventListener("click", async () => {
            toggleSpinner(true);
            const singleIssue = await fetchSingleIssue(issue.id);
            toggleSpinner(false);
            if(singleIssue) showModal(singleIssue);
        });

        container.appendChild(div);
    });
};

// Show modal
const showModal = (issue) => {
    const modal = document.getElementById("issue-modal");
    
    document.getElementById("modal-title").textContent = issue.title;
    document.getElementById("modal-description").textContent = issue.description;

    // Status Badge
    const statusBadge = document.getElementById("modal-status-badge");
    statusBadge.textContent = issue.status === 'open' ? 'Opened' : 'Closed';
    statusBadge.className = `badge badge-lg text-white py-1 px-3.5 rounded-full font-medium border-none ${issue.status === 'open' ? 'bg-[#00a96e]' : 'bg-[#a355ff]'}`;

    // Author & Date
    document.getElementById("modal-author-name").textContent = issue.author;
    document.getElementById("modal-date").textContent = issue.createdAt;

    // Labels
    const labelsDiv = document.getElementById("modal-labels");
    labelsDiv.innerHTML = "";
    issue.labels.forEach(label => {
        let labelStyle = 'bg-gray-100 text-gray-600';
        let iconHTML = '';

        if(label.toLowerCase() === 'bug') {
            labelStyle = 'bg-[#feecec] text-[#ef4444]';
            iconHTML = '<i class="fa-solid fa-bug mr-1 text-[10px]"></i>';
        } else if(label.toLowerCase() === 'help wanted') {
            labelStyle = 'bg-[#fff8db] text-[#db7f13]';
            iconHTML = '<i class="fa-regular fa-life-ring mr-1 text-[10px]"></i>';
        }

        const span = document.createElement("span");
        span.className = `badge border-none ${labelStyle} py-2 px-3 rounded-md text-[10px] font-bold flex items-center`;
        span.innerHTML = `${iconHTML}${label.toUpperCase()}`;
        labelsDiv.appendChild(span);
    });

    // Assignee & Priority
    document.getElementById("modal-assignee-name").textContent = issue.author;
    
    const priorityBadge = document.getElementById("modal-priority-badge");
    priorityBadge.textContent = issue.priority.toUpperCase();
    if(issue.priority.toLowerCase() === 'high') {
        priorityBadge.className = "badge badge-md bg-[#ef4444] text-white py-1 px-3 rounded-md font-semibold text-xs mt-1 border-none";
    } else if(issue.priority.toLowerCase() === 'medium') {
        priorityBadge.className = "badge badge-md bg-[#f59e0b] text-white py-1 px-3 rounded-md font-semibold text-xs mt-1 border-none";
    } else {
        priorityBadge.className = "badge badge-md bg-gray-400 text-white py-1 px-3 rounded-md font-semibold text-xs mt-1 border-none";
    }

    modal.showModal();
};

// Update count
const updateCountDiv = (status) => {
    let count = 0;
    if(status === "all") count = allIssues.length;
    else count = allIssues.filter(issue => issue.status === status).length;
    const countH2 = document.querySelector(".issues-count h2");
    if(countH2) countH2.textContent = `${count} Issues`;
};

// Filter issues
const filterIssues = (status) => {
    if(status === "all") displayIssues(allIssues);
    else displayIssues(allIssues.filter(issue => issue.status === status));
    updateCountDiv(status);
};

// Set active tab styling
const setActiveTab = (clickedTab) => {
    const tabs = document.querySelectorAll(".tabs button");
    tabs.forEach(tab => tab.classList.remove("tab-active", "bg-[#4a00ff]", "text-white"));
    clickedTab.classList.add("tab-active", "bg-[#4a00ff]", "text-white");
};

// Search Functionality
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const handleSearch = async () => {
    if(!searchInput) return;
    const query = searchInput.value.trim();
    toggleSpinner(true);
    let results = (query === "") ? allIssues : await searchIssues(query);
    toggleSpinner(false);
    displayIssues(results);
};

// Trigger search on click or enter
if(searchBtn) searchBtn.addEventListener("click", handleSearch);
if(searchInput) {
    searchInput.addEventListener("input", handleSearch); // live search while typing
}

// Initial load
const loadIssues = async () => {
    toggleSpinner(true);
    allIssues = await fetchAllIssues();
    displayIssues(allIssues);
    updateCountDiv("all");
    toggleSpinner(false);
};

// Tab click events
const tabs = document.querySelectorAll(".tabs button");
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const tabText = tab.textContent.toLowerCase();
        setActiveTab(tab);
        filterIssues(tabText);
    });
});

loadIssues();