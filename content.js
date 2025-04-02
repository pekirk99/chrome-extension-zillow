function sendAddressIfExists() {
    const element = document.getElementsByName("contact.address1")[0];

    if (element) {
        const address = element._value ? element._value.trim() : "";
        if (address) {
            console.log("[Content Script]: Found address:", address);
            chrome.runtime.sendMessage({ address });
        } else {
            console.error("[Content Script]: Element found but '_value' is empty or undefined.");
        }
    } else {
        console.error("[Content Script]: Element 'contact.address1' not found.");
    }
}

sendAddressIfExists();

const observer = new MutationObserver(sendAddressIfExists);
observer.observe(document.body, { childList: true, subtree: true });

console.log("[Content Script]: Observing DOM for changes.");
