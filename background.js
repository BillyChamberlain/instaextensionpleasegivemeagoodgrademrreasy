const SESSION_MINUTES = 30;
const ALARM_PREFIX = 'instagram-session-';

function alarmName(tabId) {
  return `${ALARM_PREFIX}${tabId}`;
}

async function startSession(tab) {
  if (!tab.id || !tab.url) return;

  await chrome.storage.session.set({
    [`tab-${tab.id}`]: { url: tab.url }
  });
  await chrome.alarms.clear(alarmName(tab.id));
  chrome.alarms.create(alarmName(tab.id), { delayInMinutes: SESSION_MINUTES });
}

async function stopSession(tabId) {
  await chrome.alarms.clear(alarmName(tabId));
  await chrome.storage.session.remove(`tab-${tabId}`);
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'instagram-opened' && sender.tab) {
    startSession(sender.tab);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.url) return;
  if (changeInfo.url.includes('instagram.com')) {
    startSession(tab);
  } else {
    stopSession(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => stopSession(tabId));

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (!alarm.name.startsWith(ALARM_PREFIX)) return;

  const tabId = Number(alarm.name.slice(ALARM_PREFIX.length));
  const stored = await chrome.storage.session.get(`tab-${tabId}`);
  const session = stored[`tab-${tabId}`];
  if (!session) return;

  await chrome.storage.session.set({ [`pause-${tabId}`]: session });
  await chrome.storage.session.remove(`tab-${tabId}`);
  await chrome.tabs.update(tabId, {
    url: chrome.runtime.getURL(`index.html?tabId=${tabId}`)
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== 'continue-instagram') return;

  const tabId = Number(message.tabId);
  chrome.storage.session.get(`pause-${tabId}`).then(async (stored) => {
    const session = stored[`pause-${tabId}`];
    await chrome.storage.session.remove(`pause-${tabId}`);
    await chrome.tabs.update(tabId, {
      url: session?.url || 'https://www.instagram.com/'
    });
    sendResponse({ ok: true });
  });
  return true;
});