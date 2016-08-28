$( document ).ready(function() {

  $('#submit-artist').submit(function(event) {
    event.preventDefault();
    var artist = $('#input-artist').val();
    $('#input-artist').val('');
    artists.checkArtistSubmission(artist);
  });
  
});
