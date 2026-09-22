const params = new URLSearchParams(window.location.search);
const tabId = Number(params.get('tabId'));
const continueButton = document.querySelector('#continueButton');

window.setTimeout(() => {
  document.body.classList.add('crash-settled');
}, 2800);

continueButton.addEventListener('click', () => {
  continueButton.disabled = true;
  continueButton.textContent = 'Returning...';
  chrome.runtime.sendMessage({ type: 'continue-instagram', tabId });
});