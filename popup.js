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