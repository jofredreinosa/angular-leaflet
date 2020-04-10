import { Component, OnInit } from '@angular/core';
declare let L;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-leaflet';
  map: any;
  constructor() {

  }

  ngOnInit() {
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    var bounds = {
      'north': 7.805457,
      'south': 7.775419,
      'east':  -72.193323,
      'west': -72.232925
    }
    var southwest = L.latLng(bounds.south, bounds.west);
    var northeast = L.latLng(bounds.north, bounds.east);
    var fitBounds = L.latLngBounds(southwest, northeast);
    this.map = L.map('map', {
      center: southwest,
      zoom: 14,
      maxBounds: fitBounds,
      minZoom: 12,
      maxZoom: 18,
      layers: [googleSat]
    });
    this.cargarMarcadores();
  }
  
  cargarMarcadores() {
    let self = this;
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
    }
    ]

    var markers = L.markerClusterGroup();
    for (var i = 0; i < clusterMarkers.length; i++) {
			var a = clusterMarkers[i];
			var title = a.title;
			var Icon = L.icon({
				iconUrl: a.icon,

				iconSize: [30, 30], // size of the icon

				iconAnchor: [13, 23], // point of the icon which will correspond to marker's location

				popupAnchor: [2, -20] // point from which the popup should open relative to the iconAnchor
			});
			var marker = L.marker(new L.LatLng(a.lat, a.lng), {
				icon: Icon,
			});

			marker.description = title;
			marker.bindPopup(marker.description);
			markers.addLayer(marker);

			marker.on('mouseover', function (e) {
				this.openPopup();
			});
			marker.on('mouseout', function (e) {
				this.closePopup();
			});
			marker.on('click', function (e) {
				this.closePopup();
				alert('Click en: '+e.target.description);
				console.log(e);
			});
		}

		markers.on('clustermouseover', function (a) {
			var popUpText = '<div style="margin-lef:auto; margin-right:auto"><ul>';
			var items = a.layer.getAllChildMarkers();
			items.forEach(element => {
				popUpText += '<li>' + element.description + '</li>';
			});
			popUpText += '</ul></div>';
			var popUpLat = a.latlng.lat ;
			var popUpLng = a.latlng.lng ;
			var popup = L.popup().setLatLng([popUpLat, popUpLng]).setContent(popUpText)
				.openOn(self.map);
		})

		markers.on('clustermouseout', function (a) {
			self.map.closePopup();
		})
		this.map.addLayer(markers);
  }
}
