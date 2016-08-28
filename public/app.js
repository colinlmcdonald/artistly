$( document ).ready(function() {
  var __errors__ = {};
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
        processArtists(data.artists.items);
      } else {
        __errors__['no-artist'] = true;
        errorMessage('Sorry, no artists matched this search.')
      }
    });
  };

  function requestSpotifyArtistSongs(artist) {
    $.get('https://api.spotify.com/v1/artists/' + artist.id + '/top-tracks?country=US', function(data) {
      if (data.tracks.length) {
        processArtistSongs(data, artist);
      } else {
        __errors__['no-songs'] = true;
        errorMessage('Sorry, this artist has no top songs.')
      }
    })
  }

  function processArtistSongs(songs, artist) {
    console.log(songs);
    console.log(artist);
    var artistAndSongs = _.template([
      "<div class='container>",
      "<div class='row'>",
      "<div class='col-sm-5'>",
        "<h2 class='artist-name'><%= artist.name %></h2>" + 
        "<% if(artist.images.length) { %>" +
          "<img src=<%= artist.images[0].url %> class='img-fluid artist-image' alt='No Image Available' >" + 
        "<% } else { %>" +
          "<img src='no_image_available.jpeg' class='img-fluid artist-image' data-artist-id=<%= artist.id %>>" +
        "<% } %>" +
      "</div>",
      "<div class='col-sm-5 col-sm-offset-1 songs-container'>",
        "<h2>Popular Songs</h2>",
        "<% _.each(songs, function(song, i) { %>" +
          "<div class='song-container' data-song-preview=<%= song.preview_url %> >" +
            "<p class='artist-song-number'><%= i + 1 %></p>" +
            "<div class='song-name-album-container'>" +
              "<p class='artist-song'><%= song.name %></p>" +
              "<p class='artist-song-album'><%= song.album.name %></p>" +
            "</div>" +
            "<div class='pull-right'>" +
              "<i class='glyphicon glyphicon-play-circle'></i>" +
            "</div>" +
          "</div>" +
        "<% }) %>",
      "</div>",
      "</div>",
      "</div>"
    ].join('\n'))
    $("#artist-info").html(artistAndSongs({
      artist: artist,
      songs: songs.tracks
    }));
    $(".song-container").click(function() {
      var songPreview = $(this).data('song-preview');
      var player = $('#audio-player').attr('src', songPreview);
      $(this).find('i').attr('class', 'glyphicon glyphicon-pause');
      console.log(player);
      player.on('ended', function() {
        console.log('hello');
      })

    });
  }

  function processArtists(data) {
    var artists = _.template([
      "<div class='container'>",
      "<% _.each(artists, function(artist, i) { %>" +
        "<% if (i === 0 || i % 4 === 0) { %>" +
          "<div class='row'></div>" +
        "<% } %>" +
          "<div class='col-sm-3' id='artists'>" +
            "<h3 class='artist-name'><%= artist.name %></h3>" + 
            "<% if(artist.images.length) { %>" +
              "<img src=<%= artist.images[0].url %> class='img-fluid artist-image' alt='No Image Available' data-artist-index=<%=i%> >" + 
            "<% } else { %>" +
              "<img src='no_image_available.jpeg' class='img-fluid artist-image' data-artist-id=<%= artist.id %>>" +
            "<% } %>" +
          "</div>" +
      "<% }) %>",
      "</div>"
    ].join('\n'))
    $("#artist-info").html(artists({artists: data}));
    $(".artist-image").click(function() {
      var $el = $(this);
      var index = $el.data('artist-index');
      var artist = data[index];
      requestSpotifyArtistSongs(artist)
    })
  };
});
