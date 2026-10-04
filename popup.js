//Button event listeners
defaultButton.addEventListener("click", async() => {

    chrome.storage.sync.set({defaultMode: true, protanopiaMode: false, deuteranopiaMode: false, tritanopiaMode: false});

    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: loadFilter,
    });
})

protanopiaButton.addEventListener("click", async () => {

    chrome.storage.sync.set({defaultMode: false, protanopiaMode: true, deuteranopiaMode: false, tritanopiaMode: false});

    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: loadFilter,
    });
})

deuteranopiaButton.addEventListener("click", async () => {

    chrome.storage.sync.set({defaultMode: false, protanopiaMode: false, deuteranopiaMode: true, tritanopiaMode: false});

    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: loadFilter,
    });
})

tritanopiaButton.addEventListener("click", async () => {

    chrome.storage.sync.set({defaultMode: false, protanopiaMode: false, deuteranopiaMode: false, tritanopiaMode: true});

    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: loadFilter,
    });
})

//Highlight the active mode
const modeButtons = document.querySelectorAll("button[data-mode]");

function highlightActive(modes) {
    modeButtons.forEach((button) => {
        button.classList.toggle("active", !!modes[button.dataset.mode]);
    });
}

modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        highlightActive({[button.dataset.mode]: true});
    });
});

chrome.storage.sync.get(["defaultMode", "protanopiaMode", "deuteranopiaMode", "tritanopiaMode"], (modes) => {
    if (!Object.values(modes).some(Boolean)) modes = {defaultMode: true};
    highlightActive(modes);
});
