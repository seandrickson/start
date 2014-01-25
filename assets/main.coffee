window.onload = ->
  items = document.getElementById("wrapper").children
  (myLoop = (i)->
    setTimeout ->
      items[i].className += " fadein"
      items[i].removeAttribute "style"
      myLoop i if ++i < items.length
    , 200
   ) 0