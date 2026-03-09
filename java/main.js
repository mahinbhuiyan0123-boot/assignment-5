const cards = document.getElementById("cards")
let allcards = [];

async function loadcatagories() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data);
    allcards = data.data;
    document.getElementById("cardcount").innerText = data.data.length;
    data.data.forEach(card => {
        displaycard(card)
    });
}
loadcatagories();
function managespinner(status) {
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");

    }
    else { document.getElementById("spinner").classList.add("hidden") }
}
function displaycard(c) {

    // console.log(c)
    let borderclass = "border-green-500";
    let image = "../assets/Open-Status.png";
    if (c.status === "closed") {
        borderclass = "border-purple-500";
        image = "../assets/Closed- Status .png"
    }
    let priorityClass = "bg-red-200 text-red-600";

    if (c.priority) {
        const priority = c.priority.toLowerCase().trim();
        if (priority === "medium") {
            priorityClass = "bg-yellow-100 text-yellow-700";
        } else if (priority === "low") {
            priorityClass = "bg-gray-200 text-gray-700";
        }
    }

    console.log("Issue status:", c.status);
    const card = document.createElement("div");
    card.className = `card bg-white p-3 flex flex-col justify-between space-y-2 rounded border-t-4 ${borderclass}`;
    card.innerHTML = `
   <div class="nav flex justify-between"><img src="${image}" alt="">
                <p class="${priorityClass} w-16 text-center rounded-lg">${c.priority}</p>
            </div>
            <h3 class="font-semibold line-clamp-1">${c.title}</h3>
            <p class="text-gray-400 line-clamp-2">${c.description}</p>
            <div id="enhance" class="flex justify-start gap-2">
                
            </div>
            <hr>
            <p class="name text-gray-400 truncate">#${c.id}
                by ${c.author}</p>
            <p class="date text-gray-400 truncate">${c.updatedAt}</p>
    `;
    const enhance = card.querySelector("#enhance");
    enhance.innerHTML = "";
    // console.log(enhance)
    if (c.labels.length === 1 && c.labels[0] === "bug") {
        enhance.innerHTML = ` <p class="bg-green-200 text-green-700 border green-blue-700  rounded-xl flex items-center gap-1">
               <i class="fa-solid fa-star"></i>ENHANCEMENT</p>
    `;
    }
    else {
        enhance.innerHTML = `<p class="bg-red-300 text-red-400 border border-red-400 gap-2 w-15 rounded-xl"><i
                        class="fa-solid fa-bug"></i>BUG</p>
                <p class="bg-yellow-100 text-yellow-700 border border-yellow-700 gap-2 px-2 rounded-xl "><i
                        class="fa-solid fa-circle-radiation"></i>HELP WANTED
                </p>`;

    }
    cards.appendChild(card);
    card.addEventListener("click", () => openModal(c));

}
const allbtn = document.getElementById("allbtn");
const openbtn = document.getElementById("openbtn");
const closebtn = document.getElementById("closebtn");

async function selectcatagory(id) {

    allbtn.classList.remove("bg-blue-500", "text-white");
    openbtn.classList.remove("bg-gray-500", "text-white");
    closebtn.classList.remove("bg-gray-500", "text-white");

    cards.innerHTML = "";


    if (id === "allbtn") {
        // managespinner(true);
        allbtn.classList.remove("bg-gray-500");
        allbtn.classList.add("bg-blue-500", "text-white");
        openbtn.classList.add("bg-gray-500", "text-white");
        closebtn.classList.add("bg-gray-500", "text-white");

        allcards.forEach(card => {
            displaycard(card);
        });
        document.getElementById("cardcount").innerText = allcards.length;
        managespinner(false);
    }
    else if (id === "openbtn") {
        // managespinner(true);
        openbtn.classList.add("bg-blue-500", "text-white");
        allbtn.classList.add("bg-gray-500", "text-white");
        closebtn.classList.add("bg-gray-500", "text-white");

        const filtered = allcards.filter(card => card.status === "open");

        filtered.forEach(card => {
            displaycard(card);
        });
        document.getElementById("cardcount").innerText = filtered.length;
        // managespinner(false);
    }
    else if (id === "closebtn") {
        // managespinner(true);
        closebtn.classList.add("bg-blue-500", "text-white");
        openbtn.classList.add("bg-gray-500", "text-white");
        allbtn.classList.add("bg-gray-500", "text-white");

        const filtered = allcards.filter(card => card.status === "closed");

        filtered.forEach(card => {
            displaycard(card);
        });
        document.getElementById("cardcount").innerText = filtered.length;
        // managespinner(false);

    }
}

function openModal(card) {
    document.getElementById("modalTitle").innerText = card.title;
    document.getElementById("modalAuthor").innerText = "Opened by " + card.author;
    document.getElementById("modalDate").innerText = new Date(card.updatedAt).toLocaleDateString();
    document.getElementById("modalDescription").innerText = card.description;
    document.getElementById("modalAssignee").innerText = card.assignee || "Unassigned";
    document.getElementById("modalPriority").innerText = card.priority;


    const labelContainer = document.getElementById("modalLabels");
    labelContainer.innerHTML = "";
    card.labels.forEach(label => {
        const tag = document.createElement("span");
        tag.className = "bg-red-200 text-red-700 px-2 rounded";
        tag.innerText = label;
        if (tag.innerText === "medium") {
            tag.className = "bg-yellow-100 text-yellow-700";
        } else if (tag.innerText === "low") {
            tag.className = "bg-gray-200 text-gray-700";
        }
        labelContainer.appendChild(tag);
    });

    document.getElementById("my_modal_5").showModal();
}
const searchinput = document.getElementById("searchinput");
searchinput.addEventListener("input", () => {
    const query = searchinput.value.toLowerCase().trim();

    const filtered = allcards.filter(card =>
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query) ||
        card.author.toLowerCase().includes(query)
    );
    cards.innerHTML = "";
    filtered.forEach(displaycard);
});






