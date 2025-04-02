document.addEventListener("DOMContentLoaded", () => {
    console.log("[Sidebar]: DOM fully loaded and script running.");

    chrome.runtime.onMessage.addListener((request) => {
      if (request.address) {
        console.log("[Sidebar]: Address received:", request.address);
        const inputField = document.getElementById("addressInput");
        
        if (inputField) {
            inputField.value = request.address;
            performSearch();
        } else {
            console.error("[Sidebar]: 'addressInput' element not found.");
        }
      } else {
        console.error("[Sidebar]: Message received but no address:", request);
      }
    });

    document.getElementById("submitButton").addEventListener("click", performSearch);
    document.getElementById("close-button").addEventListener("click", closeIframe);
});

function performSearch() {
    const inputField = document.getElementById("addressInput");
    if (!inputField) {
        console.error("[Sidebar]: Cannot perform search; 'addressInput' not found.");
        return;
    }

    const address = inputField.value.trim();
    if (!address) {
      console.error("[Sidebar]: Address is empty, search aborted.");
      alert("Please enter a valid address.");
      return;
    }

    const zillowURL = `https://www.zillow.com/homes/${encodeURIComponent(address)}`;
    const iframe = document.getElementById("zillowFrame");

    if (!iframe) {
        console.error("[Sidebar]: Cannot find 'zillowFrame' iframe.");
        return;
    }

    iframe.src = zillowURL;
    document.getElementById("iframe-container").style.display = "block";

    console.log("[Sidebar]: Zillow search triggered for:", address);
}

function closeIframe() {
    const iframeContainer = document.getElementById("iframe-container");
    const iframe = document.getElementById("zillowFrame");
    if (iframeContainer && iframe) {
        iframeContainer.style.display = "none";
        iframe.src = "";
        console.log("[Sidebar]: Zillow iframe closed and cleared.");
    } else {
        console.error("[Sidebar]: iframe or iframe container missing.");
    }
}
