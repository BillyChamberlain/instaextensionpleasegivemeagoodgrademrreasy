const params = new URLSearchParams(window.location.search);
const tabId = Number(params.get('tabId'));
const continueButton = document.querySelector('#continueButton');

continueButton.addEventListener('click', () => {
  continueButton.disabled = true;
  continueButton.textContent = 'Returning...';
  chrome.runtime.sendMessage({ type: 'continue-instagram', tabId });
});