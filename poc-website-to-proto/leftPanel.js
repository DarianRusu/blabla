const viewList = document.querySelector('#views');

window.electronAPI.addView((event, { ratio, data: imageDataURL }) => {
  const li = document.createElement('li');
  const image = document.createElement('img');
  image.src = imageDataURL;
  image.height = 300;
  image.width = image.height * ratio;

  li.appendChild(image);
  viewList.appendChild(li);
});
