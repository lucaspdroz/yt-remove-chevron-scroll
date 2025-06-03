
(function () {
    // 🔧 Configurações centralizadas
    const config = {
        urlKeywords: ["youtube"], // Pode adicionar mais palavras, ex: ["youtube", "vimeo"]
        classNamesToRemove: [
            "ytp-fullerscreen-edu-chevron",
            "ytp-fullerscreen-edu-button",
            "ytp-chapter-container"
        ]
    };
    const currentUrl = window.location.href;
    const shouldRun = config.urlKeywords.some(keyword => currentUrl.includes(keyword));

    if (!shouldRun) return;

    chrome.storage.sync.get(["cleanerEnabled"], (result) => {
        const isEnabled = result.cleanerEnabled ?? true;

        if (!isEnabled) {
            console.log("[Cleaner] Desativado pelo usuário.");
            return;
        }

        console.log("[Cleaner] Ativado — limpando elementos...");

        const removeElements = () => {
            config.classNamesToRemove.forEach(className => {
                const elements = document.querySelectorAll(`.${className}`);
                elements.forEach(el => {
                    el.remove();
                    console.log(`[Cleaner] .${className} removido`);
                });
            });
        };

        removeElements();

        const observer = new MutationObserver(() => {
            removeElements();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
})();
