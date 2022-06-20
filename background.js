//Initializes variables in the chrome storage once the extension is installed
chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.set({defaultMode: true, protanopiaMode: false, deuteranopiaMode: false, tritanopiaMode: false}, function() {
    });
});


//Sends a message to the tab everytime the tab is updated. The message prompts a feColorMatrix filter to be created
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status == 'complete'){

        chrome.tabs.sendMessage(tab.id, {greeting: "createFilter"}, function(response) {
            console.log(response.farewell);
        })
    }
});
