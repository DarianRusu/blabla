const currentUrlInput = document.querySelector('#currentUrl');

window.electronAPI.updateCurrentUrl((event, url) => {
  currentUrlInput.value = url;
});

function goToUrl() {
  window.electronAPI.goToCurrentUrl(currentUrlInput.value);
}

