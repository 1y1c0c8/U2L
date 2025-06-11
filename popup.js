function hmsToSeconds(hr, min, sec) {
  hr = parseInt(hr) || 0;
  min = parseInt(min) || 0;
  sec = parseInt(sec) || 0;
  return hr * 3600 + min * 60 + sec;
}

document.getElementById('setLoopBtn').addEventListener('click', () => {
  const startHr = document.getElementById('startHr').value;
  const startMin = document.getElementById('startMin').value;
  const startSec = document.getElementById('startSec').value;

  const endHr = document.getElementById('endHr').value;
  const endMin = document.getElementById('endMin').value;
  const endSec = document.getElementById('endSec').value;

  const startTime = hmsToSeconds(startHr, startMin, startSec);
  const endTime = hmsToSeconds(endHr, endMin, endSec);

  if (startTime >= endTime) {
    document.getElementById('statusMsg').textContent = '錯誤：起點時間必須小於終點時間';
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        type: 'SET_LOOP',
        start: startTime,
        end: endTime,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          document.getElementById('statusMsg').textContent = '錯誤：無法注入 content script';
        } else {
          document.getElementById('statusMsg').textContent = '循環範圍已設定！';
        }
      }
    );
  });
});
