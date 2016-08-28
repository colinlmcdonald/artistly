var songs = (function() {
  var song = {};
  
  var player = $('#audio-player');
  player.on('ended', function() {
    song.node.find('i').attr('class', 'glyphicon glyphicon-play-circle');
  })

  function requestSpotifyArtistSongs(artist) {
    $.get('https://api.spotify.com/v1/artists/' + artist.id + '/top-tracks?country=US', function(data) {
      processArtistSongs(data, artist);
    });
  }

  function processArtistSongs(songs, artist) {
    $('#artist-info').html(templates.artist({
      artist: artist,
    }));
    if (songs.tracks.length) {
      $('#songs-container').html(templates.songs({
        songs: songs.tracks
      }))
      playerFunctionality();
    } else {
        $('#songs-container').html(templates.errorMessage({error: 'Sorry, there are no top tracks for this artist.'}))
      }
  }

  function playerFunctionality() {
    $(".song-container").click(function() {
      var $el = $(this);
      var songPreview = $el.data('song-preview');
      var status = $el.find('i').attr('class');
      
      if (status === 'glyphicon glyphicon-play-circle') {
        if (song.preview === songPreview) {
          player.trigger('play');
          $el.find('i').attr('class', 'glyphicon glyphicon-pause');
        } else {
          $el.find('i').attr('class', 'glyphicon glyphicon-pause');
          player.attr('src', songPreview);
          if (song.node) {
            song.node.find('i').attr('class', 'glyphicon glyphicon-play-circle');
          } 
          song.node = $el;
          song.preview = songPreview;
        } 
      } else {
        $el.find('i').attr('class', 'glyphicon glyphicon-play-circle');
        player.trigger('pause');
      }
    });
  }

  return {
    requestSpotifyArtistSongs: requestSpotifyArtistSongs
  }
})()