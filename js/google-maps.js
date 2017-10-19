var map;
var bounds;
var largeInfowindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 3
  });

  largeInfowindow = new google.maps.InfoWindow();
  bounds = new google.maps.LatLngBounds();
};

$('#submit').click(function() {
  getFormInput();
});

// Create marker when pressing enter on form input for message
$('#message').keypress(function(keyPressed) {
  var key = keyPressed.which;
  // Enter key
  if(key == 13) {
    getFormInput();
    return false;
  };
});

function getFormInput() {
  var lat = parseInt($('input[name="lat"]').val(), 10);
  var lng = parseInt($('input[name="lng"]').val(), 10);
  var message = $('input[name="message"]').val();
  var newMarker = {message: message, position: {lat: lat, lng: lng}}

  addNewMarker(newMarker);
};

function addNewMarker(newMarker) {
  var position = newMarker.position;
  var message = newMarker.message;
  var marker = new google.maps.Marker({
    position: position,
    message: message,
    animation: google.maps.Animation.DROP
  });
  updateMap(marker)
  // Create an onclick event to open an infowindow at each marker.
  marker.addListener('click', function() {
    populateInfoWindow(this, largeInfowindow);
  });
}

function populateInfoWindow(marker, infowindow) {
  // Make sure the infowindow is not already opened on this marker
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.message + '</div>');
    infowindow.open(map, marker);
    // Clear marker property if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  };
};

function updateMap(marker) {
  marker.setMap(map);
  bounds.extend(marker.position);
  map.fitBounds(bounds);
};
