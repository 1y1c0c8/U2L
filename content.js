let startTime = null;
let endTime = null;
let isLooping = false;

function getVideoElement() {
  return document.querySelector('video');
}

function applyLoopLogic() {
  const video = getVideoElement();
  if (!video) return;

  video.addEventListener('timeupdate', () => {
    if (isLooping && startTime !== null && endTime !== null) {
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        video.play();
      }
    }
  });
}

function updateLoopTimes(newStart, newEnd) {
  startTime = newStart;
  endTime = newEnd;
  isLooping = true;
  console.log(`Looping set from ${startTime}s to ${endTime}s`);
}

// 接收來自 popup 或其他擴充元件組件的訊息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SET_LOOP') {
    updateLoopTimes(message.start, message.end);
    sendResponse({ status: 'loop_updated' });
  }
});

// 初始化
applyLoopLogic();
