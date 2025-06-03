// background.js

const enabledIcon = {
    path: {
        "16": "icons/enabled.png",
        "48": "icons/enabled.png",
        "128": "icons/enabled.png"
    }
};

const disabledIcon = {
    path: {
        "16": "icons/disabled.png",
        "48": "icons/disabled.png",
        "128": "icons/disabled.png"
    }
};

// Listen for any tab update (e.g. navigation or reload)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
        chrome.storage.sync.get("cleanerEnabled", (data) => {
            const isEnabled = data.cleanerEnabled ?? true;
            chrome.action.setIcon({
                tabId,
                path: isEnabled ? enabledIcon.path : disabledIcon.path
            });
        });
    }
});
