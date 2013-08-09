(function(icons, i) {
      function displayItem(i, thisicon) {
            setTimeout(function() {
                  thisicon.style.display = "block";
            }, i * 200);
      }

      for (i = 0; i < icons.length; i++) {
            var thisicon = icons[i];
            displayItem(i, thisicon);
      }
}(document.getElementById('icons').children));
