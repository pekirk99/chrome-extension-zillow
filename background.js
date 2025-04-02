chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.sidePanel.open({ windowId: tab.windowId });
  console.log("[Background Script]: Side panel opened.");
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.address) {
    console.log("[Background Script]: Received address from content script:", request.address);
    chrome.runtime.sendMessage({ address: request.address });
  } else {
    console.error("[Background Script]: Message received but no 'address' field:", request);
  }
});
