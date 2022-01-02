menu.addEventListener("click", openOnClick);
exitmenu.addEventListener("click", closeOnClick);
window.addEventListener('DOMContentLoaded', init);

const publicSpreadsheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1mdBYi9kPLC3FmvmQeHBsNX_tERlMxEXVt77RoDw1llA/values/Sheet1?key=AIzaSyCGxsCpKqE7y0M6j4GlE4VHhjDnLYUUIrw';

function init() {
  return fetch(publicSpreadsheetUrl)
  .then(res => res.json()).then(data => {
    Papa.parse(Papa.unparse(data.values), {header: true, complete: initAutocomplete})
})
  .catch(err => console.log('Error in init function: ', err))
};

$(document).ready(function(){
    $(document).mouseup(function(e){
       var nav = $('.nav');
       var detail = $('.detail');
       if (!nav.is(e.target) // The target of the click isn't the container.
       && nav.has(e.target).length === 0
       && detail.css('display') === 'block') // Nor a child element of the container
       {
          closeOnClick();
       }

    });
}); 

$(document).ready(function(){
  var d = new Date();
  var element = document.getElementById("footer-company-name");
  var node = document.createTextNode(d.getFullYear() + ' ');
  element.insertBefore(node,element.childNodes[1]);
});

function openOnClick() {
    var x = document.getElementById("myTopnav");
    x.className += " responsive";
};

function closeOnClick() {
  var x = document.getElementById("myTopnav");
  x.className = "nav";
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


// access google maps API
function initAutocomplete(data) {

    if (!data) {
      const error = new Error('Error: No data was retrieved');
      throw error;
    }

    //init map
		map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 45.53, lng: -73.62},
          zoom: 8,
          mapTypeId: 'roadmap'
        });

  var adressList = data;

  // console.log(adressList);
  markers = [];
  
  for (i = 0; i < adressList.length; i++) {
    createMarker(i);
  };

  function createMarker(i) {
        var lat = parseFloat(adressList[i]["Latitude"]);
        var lng = parseFloat(adressList[i]["Longitude"]);
        var newLatLng = new google.maps.LatLng(lat, lng);

        var InfoWindow = new google.maps.InfoWindow(
            { content: '<b>'+adressList[i]["NOM"]+'</b><br>'+adressList[i]["ADRESSE"]+'<br>'+adressList[i]["VILLE"],
              size: new google.maps.Size(100,50)
            });

        var marker = new google.maps.Marker({
            position: newLatLng,
            map: map, 
            title:adressList[i]["NOM"]
        }); 

        markers.push(marker);

        google.maps.event.addListener(map, 'click', function() {
          if (InfoWindow) {
            InfoWindow.close();
          }
        });
        
        google.maps.event.addListener(marker, 'click', function() {
          if (InfoWindow) {
            InfoWindow.close();
          }
          InfoWindow.open(map,marker);
      }); 


  };

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



      

