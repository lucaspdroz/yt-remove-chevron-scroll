const ICONS = {
    enabled: {
        "16": "icons/enabled.png",
        "48": "icons/enabled.png",
        "128": "icons/enabled.png"
    },
    disabled: {
        "16": "icons/disabled.png",
        "48": "icons/disabled.png",
        "128": "icons/disabled.png"
    }
};

function setIconForTab(tabId, isEnabled) {
    chrome.action.setIcon({
        tabId,
        path: isEnabled ? ICONS.enabled : ICONS.disabled
    });
}

function updateIcon(tabId) {
    chrome.storage.sync.get("cleanerEnabled", (data) => {
        const isEnabled = data.cleanerEnabled ?? true;
        setIconForTab(tabId, isEnabled);
    });
}

// When a tab finishes loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        updateIcon(tabId);
    }
});

// When the user switches tabs
chrome.tabs.onActivated.addListener((activeInfo) => {
    updateIcon(activeInfo.tabId);
});
