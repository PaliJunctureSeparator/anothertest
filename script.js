const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".entry i"),
infoText = wrapper.querySelector(".info-text"),
removeIcon = wrapper.querySelector(".search span");
let audio;

function data(result, entry){
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${entry}"</span>. Please, try to search for another word.`;
    }else{
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        document.querySelector(".entry p").innerText = result[0].entry;
        document.querySelector(".meaning span").innerText = definitions.definition;
    }
}

function search(entry){
    fetchApi(entry);
    searchInput.value = entry;
}

function fetchApi(entry){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${entry}"</span>`;
    let url = `https://suttacentral.net/api/dictionaries/lookup?from=pli&to=id${entry}`;
    fetch(url).then(response => response.json()).then(result => data(result, entry)).catch(() =>{
        infoText.innerHTML = `Can't find the meaning of <span>"${entry}"</span>. Please, try to search for another word.`;
    });
}

searchInput.addEventListener("keyup", e =>{
    let entry = e.target.value.replace(/\s+/g, ' ');
    if(e.key == "Enter" && entry){
        fetchApi(entry);
    }
});

volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});
