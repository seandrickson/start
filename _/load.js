(function() {
      var icons = document.getElementById('icons').children,
            i;
      for (i = 0; i < icons.length; i++) {
            var go = icons[i];
            displayItem(i, go);
      }

      function displayItem(i, go) {
            setTimeout(function() {
                  go.style.display = "block";
            }, i * 200);
      }
}());