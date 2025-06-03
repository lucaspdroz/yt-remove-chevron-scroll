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

document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("cleaner-toggle");

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        const tabId = tab.id;

        chrome.storage.sync.get(["cleanerEnabled"], (result) => {
            const isEnabled = result.cleanerEnabled ?? true;
            checkbox.checked = isEnabled;
            setIconForTab(tabId, isEnabled);
        });

        checkbox.addEventListener("change", () => {
            const checked = checkbox.checked;
            const confirmed = confirm(
                checked
                    ? "Ativar remoção automática?\nA página será recarregada."
                    : "Desativar limpeza automática?\nA página será recarregada."
            );

            if (!confirmed) {
                checkbox.checked = !checked;
                return;
            }

            chrome.storage.sync.set({ cleanerEnabled: checked }, () => {
                setIconForTab(tabId, checked);
                chrome.tabs.reload(tabId);
            });
        });
    });
});
