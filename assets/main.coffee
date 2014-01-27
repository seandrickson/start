window.onload = ->
  i = 0
  items = document.getElementById("wrapper").children
  do loopIt = (i) ->
    setTimeout ->
      items[i].className += " fadein"
      items[i].removeAttribute("style")
      loopIt(i) if ++i < items.length
      return
    , 200
    return
  return