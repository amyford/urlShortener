$('button').click(function() {

  var aUrl = $('#url').val();

  $.ajax('http://localhost:3000/', {
    method: 'post',
    crossDomain: true,
    data: {
      url: aUrl
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    success: function (data) {

    $('#content').empty();

    var newUrl = $('<p>');
    var newLink = 'http://localhost:3000/'+ data.shortURL;
    newUrl.text(newLink);
    $('#content').append(newUrl);

    }
  });
});
