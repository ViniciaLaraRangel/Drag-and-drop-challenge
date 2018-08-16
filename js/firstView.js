const initialBox = document.getElementsByClassName('col-md-3');
const finalBox = document.getElementById('final-box');

let dragItem;
document.addEventListener('drag', (e) => {
    e.dataTransfer.setData("image/.jpg", e.target.id);

}, false)
document.addEventListener('dragstart', () => {
dragItem = event.target;
}, false)
document.addEventListener('dragend', () => {
}, false)
document.addEventListener('dragover', (e) => {
    event.preventDefault(e);
}, false)
document.addEventListener('drop', (e) => {
    if (event.target === finalBox || event.target === initialBox) {
        let data = e.dataTransfer.getData("image/.jpg");
            initialBox.innerHTML = '';
          event.target.appendChild(dragItem);
    }
}, false)