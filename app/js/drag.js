// Learnt and adapted from: http://tech.pro/tutorial/650/javascript-draggable-elements from a user comments post/code (@TheDesigner in 2009-ish).

// Global variables without any specified type (type will be determined when used in the functions below).
var obj, x, y, prev_x, prev_y;

function drag(e) {
  // Yep, use the object I just clicked on.
  obj = e.target;
  // Set current X coordinate minus distance left from offsetParent node.
  prev_x = x - obj.offsetLeft;
  // Set current Y coordinate minus distance top from offsetParent node.
  //prev_y = y - obj.offsetTop;
  // Change the object's color so it looks like it's usable/moveable.
  //obj.style.background = "#00ff00";
}

function move(e, sharedState) {
  // Always track and record the mouse's current position.
  if (e.pageX) {
    x = e.pageX; // X coordinate based on page, not viewport.
    //y = e.pageY; // Y coordinate based on page, not viewport.
  }
  //  else if (e.clientX) {
  //    x=clientX; // X coordinate based on viewport.
  //    y=clientY; // Y coordinate based on viewport.
  //  }

  // If the object specifically is selected, then move it to the X/Y coordinates that are always being tracked.
  if (obj) {
    obj.style.left = x - prev_x + "px";
    //obj.style.top = (y - prev_y) + 'px';

    //sharedState.clip = x * document.body.clientWidth;
    sharedState.clip = x;
  }
}

function drop() {
  // Revert to the default css style.
  //obj.style.background = "";
  // Remove the attached event from the element so it doesn't keep following your mouse. :)
  obj = false;
}

export default function dragElementX(identifier, sharedState) {
  let elem = document.querySelector(identifier);
  elem.onmousedown = drag;
  document.onmousemove = function(e) {
    move(e, sharedState);
  };
  document.onmouseup = drop;
}
