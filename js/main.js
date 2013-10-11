(function(i, ids){

  // Name: Name of the site
  // URL: Url of the site to go to
  // ID: The ID# of the iPhone/iPad app (between id and ?) see URL below of app link:
  // https://itunes.apple.com/us/app/facebook/id284882215?mt=8
  var icons = [
    { "name": "Facebook",      "url": "https://www.facebook.com/",   "id": 284882215 },
    { "name": "Designer News", "url": "http://news.layervault.com/", "id": 617221064 },
    { "name": "YouTube",       "url": "https://www.youtube.com/",    "id": 544007664 },
    { "name": "Pinterest",     "url": "http://www.pinterest.com/",   "id": 429047995 },
    { "name": "Behance",       "url": "http://www.behance.net/",     "id": 489667151 },
    { "name": "iHeartRadio",   "url": "http://www.iheart.com/",      "id": 290638154 }
  ];

  // Create ids string for AJAX lookup
  $.each(icons, function(i){
    ids = (ids ? ids+',' : '')+icons[i].id;
  });

  // Lookup the icons to use for the start page
  $.ajax('https://itunes.apple.com/lookup', {
    cache: true,
    dataType: 'jsonp',
    jsonpCallback: 'showIcons',
    data: { id: ids },
  })
  .done(function(data){
    // Now let us build this thing

    // We'll start by making the wrapper
    var $wrapper = $('<div/>')
      .attr('data-icons', data.resultCount)
      .addClass('grid__wrapper')
      .appendTo('body');

    // Create each icon and append to wrapper
    $.each(data.results, function(i){
      $('<div/>')
        .addClass('grid__item icon__wrapper')
        .hide()
        .append('<a href="'+icons[i].url+'" class="icon__item">'+
                '<img alt="'+icons[i].name+'" src="'+data.results[i].artworkUrl100+'">'+
                '</a>')
        .appendTo($wrapper)
        .delay(200*i)
        .fadeIn();
    });
  });

}());
