let mutationObserver: MutationObserver | undefined;

export function detectPageChanges(onPageChange: (newPage: string) => void) {
    let lastUrl = window.location.href;

    mutationObserver = new MutationObserver(() => {
        const url = window.location.href;
        console.log("mutation observer", { url, lastUrl, window });
        if (url !== lastUrl) {
            lastUrl = url;
            onPageChange(url);
        }
    });

    mutationObserver.observe(document, { subtree: true, childList: true });
}

export function stopPageChangeDetection() {
    if (mutationObserver) {
        mutationObserver.disconnect();
    }
}
