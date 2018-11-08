menu.addEventListener("click",myFunction);
exitmenu.addEventListener("click",myFunction);


$(document).ready(function(){
    $(document).mouseup(function(e){
       var nav = $('.nav');
       var detail = $('.detail');
       if (!nav.is(e.target) // The target of the click isn't the container.
       && nav.has(e.target).length === 0
       && detail.css('display') === 'block') // Nor a child element of the container
       {
          myFunction();
       }

    });
}); 



function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
};

function myBoutonDeroulant(clicked_id) {
	var button = document.getElementById("detail-item"+clicked_id);
		if (button.className === "detail-item") {
			button.className += " visible"; 
		} else {
			button.className = "detail-item";
		};

      var button = document.getElementById("bouton-deroulant"+clicked_id);
    if (button.className === "bouton bouton-deroulant") {
      button.className += " visible"; 
    } else {
      button.className = "bouton bouton-deroulant";
    }
	
};

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
		var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 45.53, lng: -73.62},
          zoom: 8,
          mapTypeId: 'roadmap'
        });

 
var layer = new google.maps.FusionTablesLayer({
          query: {
            select: '\'Geocodable address\'',
            from: '1VXd0HSKpxyjjwu2yOWBwZlrnfTxvGQXE5q65z76q'
          },
		  options: {
        styleId: 2,
        templateId: 2
      }
        });
layer.setMap(map);

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);


  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
	
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
	map.setZoom(14);
  });
}



      

