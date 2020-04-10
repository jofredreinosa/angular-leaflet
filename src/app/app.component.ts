import { Component, OnInit } from '@angular/core';

// declare a variable to handle Leaflet map
declare let L;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-leaflet';
  map: any;

  constructor() {}

  ngOnInit() {
    // add tile layer with maxZoom and googleSat map
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      detectRetina: true,
      maxZoom: 22,
      maxNativeZoom: 19,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // set boundaries map
    var bounds = {
      'north': 7.805457, // latitude
      'south': 7.775419, // latitude
      'east':  -72.193323, // longitude
      'west': -72.232925 // longitude
    }

    // set map center and limits 
    var southwest = L.latLng(bounds.south, bounds.west);
    var northeast = L.latLng(bounds.north, bounds.east);
    var fitBounds = L.latLngBounds(southwest, northeast);

    //create map
    this.map = L.map('map', {
      center: southwest,
      zoom: 14,
      maxBounds: fitBounds,
      minZoom: 2,
      maxZoom: 22,
      layers: [googleSat]
    });
    // add markers to map
    this.addMarkers();
  }
  
  // method to set markers and added to map
  addMarkers() {
    let self = this;
    // array with markers
    var clusterMarkers = [{
      lat: 7.781059,
      lng: -72.226942,
      title: "Mercado la Guayana",
      icon: './../assets/leaflet/images/marker-icon.png',
    },
    
    {
      lat: 7.779172,
      lng: -72.230843,
      title: "Club Demócrata",
      icon: './../assets/leaflet/images/marker-icon.png',
    },

    {
      lat: 7.785100,
      lng: -72.226892,
      title: "Antituberculoso",
      icon: './../assets/leaflet/images/marker-icon.png',
    },

    {
      lat: 7.788422,
      lng: -72.227698,
      title: "Universidad Católica",
      icon: './../assets/leaflet/images/marker-icon.png',
    },

    {
      lat: 7.791552,
      lng: -72.213325,
      title: "U.L.A.",
      icon: './../assets/leaflet/images/marker-icon.png',
    },

    {
      lat: 7.792881,
      lng: -72.201694,
      title: "Unet Edificio A",
      icon: './../assets/leaflet/images/marker-icon.png',
    },

    {
      lat: 7.792881,
      lng: -72.201694,
      title: "Unet Cafetín Edificio A",
      icon: './../assets/leaflet/images/marker-icon.png',
    },

    {
      lat: 7.797150,
      lng: -72.219433,
      title: "Iglesia Santa Teresa",
      icon: './../assets/leaflet/images/marker-icon.png',
    }];

    // create marker Cluster Group
    var markers = L.markerClusterGroup();

    // bind popups and events to each marker
    for (var i = 0; i < clusterMarkers.length; i++) {
			var mark = clusterMarkers[i];
			var title = mark.title;
			var Icon = L.icon({
				iconUrl: mark.icon, // set image to icon
				iconSize: [30, 30], // size of the icon
				iconAnchor: [13, 23], // point of the icon which will correspond to marker's location
				popupAnchor: [2, -20] // point from which the popup should open relative to the iconAnchor
      });

      // create a marker
			var marker = L.marker(new L.LatLng(mark.lat, mark.lng), {
				icon: Icon,
			});

      // add description to a marker
      marker.description = title;
      
      // bind description to a popup
      marker.bindPopup(marker.description);
      
      // add marker to map
			markers.addLayer(marker);

      // Mouse over event open popup
			marker.on('mouseover', function (e) {
				this.openPopup();
      });
      
      // Mouse out event close popup
			marker.on('mouseout', function (e) {
				this.closePopup();
      });
      
      // Click event on marker
			marker.on('click', function (e) {
				this.closePopup();
				alert('Click en: '+e.target.description);
			});
		}

    // show popup on mouse over on cluster
    // create a list of descriptions for each marker on cluster
		markers.on('clustermouseover', function (a) {
      // create a html <ul>  to show markers descriptins
      var popUpText = '<div style="margin-lef:auto; margin-right:auto"><ul>';

      // get all markers on cluster
      var items = a.layer.getAllChildMarkers();

      // create li html elements with every marker description
			items.forEach(element => {
				popUpText += '<li>' + element.description + '</li>';
      });

      // close html tags for ul
      popUpText += '</ul></div>';

      // set cluster popup
			var popUpLat = a.latlng.lat ;
			var popUpLng = a.latlng.lng ;
			var popup = L.popup().setLatLng([popUpLat, popUpLng]).setContent(popUpText)
				.openOn(self.map);
		});

    // close popup on mouse out on cluster
		markers.on('clustermouseout', function (a) {
			self.map.closePopup();
    });

    // add markers to map
		this.map.addLayer(markers);
  }
}
