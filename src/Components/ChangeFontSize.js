var min = 8;
var max = 20;

function changeFontSize(delta, tag) {
  let tags = document.querySelectorAll(tag);
  let s;
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].style.fontSize) {
      s = parseInt(tags[i].style.fontSize.replace("px", ""));
    } else {
      s = 44;
    } if (s != max) {
      s += delta;
    }
    tags[i].style.fontSize = s + "px"
  }
}

function increaseFontSize(tag) {
  changeFontSize(1, tag);
}

function decreaseFontSize(howMuch, tag) {
  changeFontSize(-howMuch, tag);
}

export default decreaseFontSize;