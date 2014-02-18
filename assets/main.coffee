window.onload = ->
  i = 0
  className = 'fadein'
  el = document.getElementById('wrapper').children
  do loopIt = (i) ->
    elem = el[i]
    setTimeout ->
      if elem.classList
        elem.classList.add className
      else
        elem.className += ' ' + className
      elem.removeAttribute('style')
      loopIt(i) if ++i < el.length
      return
    , 200
    return
  return