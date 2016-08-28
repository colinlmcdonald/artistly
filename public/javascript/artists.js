var artists = (function() {
  var errors = {};

  function requestSpotifyArtist(artist) {
    artist = encodeURI(artist);
    $.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist', function(data) {
      if (data.artists.items.length) {
        processArtists(data.artists.items);
      } else {
        errors['no-artist'] = true;
        displayError('Sorry, no artists matched this search.')
      }
    });
  };

  function checkArtistSubmission(artist) {
    if (artist.length === 0) {
      displayError('Please enter an artist\'s name');
      errors['no-name'] = true;
    } else {
      if (errors['no-name']) {
        errors['no-name'] = false;
        clearError();
      }
      if (errors['no-artist']) {
        errors['no-artist'] = false;
        clearError();
      }
      console.log(errors);
      requestSpotifyArtist(artist);
    }
  }

  function processArtists(data) {
    $("#artist-info").html(templates.artists({artists: data}));
    $(".artist-image").click(function() {
      var index = $(this).data('artist-index');
      var artist = data[index];
      songs.requestSpotifyArtistSongs(artist)
    })
  };

  function displayError(msg) {
    $('.error-container')
      .html(templates.errorMessage({error: msg}))
      .show()
  };

  function clearError() {
    $('.error-container').hide();
  };

  return {
    checkArtistSubmission: checkArtistSubmission
  }
})()