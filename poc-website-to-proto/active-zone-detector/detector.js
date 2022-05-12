const paint = ({top,left,width,height}) => {
  // this should be done using canvas, but i'm lazy
  console.log(top,left,width,height)
  const square = document.createElement('div')
  square.style.position = 'absolute'
  square.style.left = left + 'px'
  square.style.top = top + 'px'
  square.style.width = width + 'px'
  square.style.height = height + 'px'
  square.style.backgroundColor = 'orange'
  square.style.border = 'orange'
  square.style.opacity = '0.5'
  document.body.appendChild(square)  
}


const detect = () => {
  // TODO:
  // - deduplicate stuff
  // - smartly remove subductions (needs more examples)


  // a href
  Array.from(document.getElementsByTagName('a')).forEach(link => {
    const {top, left, width, height} = link.getBoundingClientRect()
    paint({top: top + window.scrollY, left: left + window.scrollX, width, height})
  })
  // onclick
  Array.from(document.querySelectorAll('[onclick]')).forEach(link => {
    const {top, left, width, height} = link.getBoundingClientRect()
    paint({top: top + window.scrollY, left: left + window.scrollX, width, height})
  })
  // clickable elements
  listAllEventListeners().forEach(el => {
    console.log(el.node)
    if(el.type/* === 'onclick'*/) {
      
      const {top, left, width, height} = el.node.getBoundingClientRect()
      paint({top: top + window.scrollY, left: left + window.scrollX, width, height})
    }
  })
  // form stuff



}


function listAllEventListeners() {
  const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
  allElements.push(document);
  allElements.push(window);

  const types = [];

  for (let ev in window) {
    if (/^on/.test(ev)) types[types.length] = ev;
  }

  let elements = [];
  for (let i = 0; i < allElements.length; i++) {
    const currentElement = allElements[i];
    for (let j = 0; j < types.length; j++) {
      if (typeof currentElement[types[j]] === 'function') {
        elements.push({
          "node": currentElement,
          "type": types[j],
          "func": currentElement[types[j]].toString(),
        });
      }
    }
  }

  return elements.sort(function(a,b) {
    return a.type.localeCompare(b.type);
  });
}

