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

document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("cleaner-toggle");

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        const tabId = tab.id;

        chrome.storage.sync.get(["cleanerEnabled"], (result) => {
            const isEnabled = result.cleanerEnabled ?? true;
            checkbox.checked = isEnabled;

            // Update icon on popup load
            chrome.action.setIcon({
                tabId,
                path: isEnabled ? enabledIcon.path : disabledIcon.path
            });
        });

        checkbox.addEventListener("change", () => {
            const checked = checkbox.checked;

            if (checked) {
                const confirmEnable = confirm("Ativar remoção automática?\nA página será recarregada.");
                if (confirmEnable) {
                    chrome.storage.sync.set({ cleanerEnabled: true }, () => {
                        chrome.action.setIcon({ tabId, path: enabledIcon.path });
                        chrome.tabs.reload(tabId);
                    });
                } else {
                    checkbox.checked = false;
                }
            } else {
                const confirmDisable = confirm("Desativar limpeza automática?\nA página será recarregada.");
                if (confirmDisable) {
                    chrome.storage.sync.set({ cleanerEnabled: false }, () => {
                        chrome.action.setIcon({ tabId, path: disabledIcon.path });
                        chrome.tabs.reload(tabId);
                    });
                } else {
                    checkbox.checked = true;
                }
            }
        });
    });
});
