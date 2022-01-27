// chrome.tabs.onInstalled.addListener((tab) => {
//   chrome.tabs.get(tab.tabId, (current_tab_info) => {
chrome.scripting.executeScript({
  target: { tabId: tab.tabId },
  files: ["foreground.js"],
});
//   });
// });
