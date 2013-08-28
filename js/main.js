(function(i, ids){
  $.getJSON('js/icons.json')
  .done(function(icons){

    $.each( icons, function(i){
      ids = ids ? ids + ',' : '';
      ids += icons[i].id;
    });

    $.ajax( 'https://itunes.apple.com/lookup', {
      cache: true,
      dataType: 'jsonp',
      jsonpCallback: 'showIcons',
      data: { id: ids },
    })
    .done(function(data){
      $.each(data.results, function(i){
        $('<div/>').addClass('grid__item icon__wrapper').hide()
          .append('<a href="'+icons[i].url+'" class="icon__item">'+
            '<img alt="'+icons[i].name+'" src="'+data.results[i].artworkUrl100+'"></a>')
          .appendTo('#icons')
          .delay(200 * i).fadeIn();
      });
    });

  });
}());
