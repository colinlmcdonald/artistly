var templates = (function() {
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

  var errorMessage = _.template(
    "<div class='error-message'><%= error %></div>"
  )

  return {
    artists: artists,
    artistAndSongs: artistAndSongs,
    errorMessage: errorMessage
  }
})()