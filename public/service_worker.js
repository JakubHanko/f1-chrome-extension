const NOTIFICATION_TYPE = "f1-event-notification";

const getAlarmMessage = (sessionTime, sessionName) => {
  if (Date.now() > sessionTime) {
    return `${sessionName} has already started!`;
  }

  const minutesUntilSession = Math.floor((sessionName - Date.now()) / 60000);

  return `${sessionName} starts in ${minutesUntilSession} minute${minutesUntilSession == 1 ? "" : "s"}!`;
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === NOTIFICATION_TYPE) {
    chrome.storage.sync
      .get("alarmData")
      .then(({ alarmData }) =>
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: alarmData.raceName,
          message: getAlarmMessage(
            alarmData.sessionTime,
            alarmData.sessionName
          ),
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
        sessionName: message.sessionName,
        sessionTime: message.sessionTime
      }
    });
  } else if (message.type === "clear") {
    chrome.alarms.clearAll();
    chrome.storage.sync.clear();
  }
});
