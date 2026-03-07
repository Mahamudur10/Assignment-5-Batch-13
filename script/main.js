const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
            displayIssues(data.data)
        })
}

const displayIssues = (issues) => {

    const container = document.getElementById("issues-container")
    container.innerHTML = ""

    issues.forEach(issue => {
        const div = document.createElement("div")
        div.classList = "card bg-white shadow-sm border-t-4 border-green-500"
        div.innerHTML = `
            <div class="card bg-white shadow-sm border-green-500">

                <div class="card-body p-4">
                    <div class="flex gap-1 justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="">
                        <span class="px-6 py-1 bg-[#feecec] text-[#ef4444] rounded-full text-center">${issue.priority}</span>
                    </div>
                    <h3 class="font-semibold text-sm">${issue.title}</h3>

                    <p class="text-xs text-gray-500 line-clamp-2">${issue.description}</p>

                    <div class="flex gap-2 mt-2">
                        <span class="badge badge-error badge-sm bg-[#feecec] text-[#ef4444] py-3 rounded-full"><i
                                class="fa-solid fa-bug"></i> BUG</span>
                        <span class="badge badge-warning badge-sm bg-[#fff8db] text-[#db7f13] py-3 rounded-full"><i
                                class="fa-regular fa-life-ring"></i>HELP WANTED</span>
                    </div>

                    <div class="border-t border-gray-100 mt-3">
                        <p class="text-xs text-gray-400 mt-3">#${issue.id} by ${issue.author}</p>
                        <p class="text-xs text-gray-400">${issue.createdAt}</p>
                    </div>
                </div>

            </div>

`
        container.appendChild(div)
    })

}

loadIssues()