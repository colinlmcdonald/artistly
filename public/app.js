$( document ).ready(function() {
  $('#submit-artist').submit(function(event) {
    event.preventDefault();
    var artist = $('#input-artist').val();
    $('#input-artist').val('');
    if (artist.length === 0) {
      errorMessage('Please enter an artist\'s name');
      __errors__['no-name'] = true;
    } else {
      if (__errors__['no-name']) {
        __errors__['no-name'] = false;
        clearError();
      }
      if (__errors__['no-artist'] || __errors__['no-image']) {
        __errors__['no-artist'] = false;
        __errors__['no-image'] = false;
        clearError();
      }
      requestSpotifyArtist(artist);
    }
  });
});

function errorMessage(msg, picture) {
  var $error = document.createElement('div');
  $error.innerText = msg;
  $error.className = 'error-message';
  if (picture) {
    $('#artist-picture').html($error);
  } else {
    $("#artist-info").html($error);
    $('#artist-picture').html('');
  }
};

function clearError() {
  $('#artist-info').html('');
  $('#artist-picture').html('');
};

function requestSpotifyArtist(artist) {
  artist = encodeURI(artist);
  $.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist', function(data) {
    if (data.artists.items.length) {
      processData(data.artists.items[0]);
    } else {
      __errors__['no-artist'] = true;
      errorMessage('Sorry, no artists matched that search.')
    }
  });
};

function processData(data) {
  var name = _.template("<h3><%=name%></h3>");
  var picture = _.template("<img src='<%=image%>' class='img-fluid'>")
  $("#artist-info").html(name({name: data.name}));
  if (!data.images.length) {
    __errors__['no-image'] = false;
    errorMessage('Sorry, there is no image for this search.', true)
  } else {
    $("#artist-picture").html(picture({image: data.images[0].url}))
  }
};