const NOTIFICATION_TYPE = "f1-event-notification";

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === NOTIFICATION_TYPE) {
    chrome.storage.sync
      .get("alarmData")
      .then(({ alarmData }) =>
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png", // TODO
          title: alarmData.raceName,
          message: `${alarmData.sessionName} starts in 30 minutes!`,
          priority: 2,
          requireInteraction: true
        })
      )
      .then(() => {
        chrome.storage.sync.clear();
        chrome.alarms.clearAll();
      });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === NOTIFICATION_TYPE) {
    chrome.alarms.create(NOTIFICATION_TYPE, {
      delayInMinutes: message.delay
    });
    chrome.storage.sync.set({
      alarmData: {
        raceName: message.raceName,
        sessionName: message.sessionName
      }
    });
  } else if (message.type === "clear") {
    chrome.alarms.clearAll();
    chrome.storage.sync.clear();
  }
});
