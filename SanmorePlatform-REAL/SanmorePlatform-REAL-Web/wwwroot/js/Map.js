var dvMap;

function InitializeMap() {

    var mapDrawing = new MapDrawing();
    mapDrawing.init();

    drawOnMap.addEventListener("change", function () {

        if (drawOnMap.checked) {
            drawOnMapReDraw.disabled = false;
            mapDrawing.enableDrawing();
            mapDrawing.ActiveDrawing(false);
        } else {
            drawOnMapApply.disabled = true;
            drawOnMapReDraw.disabled = true;
            mapDrawing.disableDrawing();
        }
    });

    drawOnMapReDraw.addEventListener("click", function () {
        drawOnMapApply.disabled = true;
        if (typeof (mapDrawing.poly) !== "undefined") {
            mapDrawing.poly.setMap(null);
        }
        drawOnMapApply.disabled = true;
        mapDrawing.enableDrawing();
        mapDrawing.ActiveDrawing(false);
        
        //Refresh map's marker and property list if no area draw on map
        var data = {
            minLat: 0.0,
            minLng: 0.0,
            maxLat: 0.0,
            maxLng: 0.0
        };

        GetfilterProperty(data);        //Filter Map's markers and Property List based on area draw.
    });

    drawOnMapApply.addEventListener("click", function () {
        var data = mapDrawing.DrawData;
    });
}

//funnction to delete Markers from Map
let clusterMarker = [];
function deleteMarkers() {
    for (var i = 0; i < clusterMarker.length; i++) {
        clusterMarker[i].setMap(null);
    }
    clusterMarker = []
}

//Function to load markers on Map
function LoadMap(markers) {
    //Marker icon
    const iconBase = '../MapIcons/';

    const icons = {
        "1": {
            icon: iconBase + 'Multifamily.png'
        },
        "2": {
            icon: iconBase + '1-4residential.png'
        },
        "3": {
            icon: iconBase + 'Office.png'
        },
        "4": {
            icon: iconBase + 'Industrial.png'
        },
        "5": {
            icon: iconBase + 'retail.png'
        },
        "6": {
            icon: iconBase + 'Shopping Centre.png'
        },
        "7": {
            icon: iconBase + 'Specialty.png'
        },
        "8": {
            icon: iconBase + 'Health Care.png'
        },
        "9": {
            icon: iconBase + 'Hospitality.png'
        },
        "10": {
            icon: iconBase + 'sports.png'
        },
        "11": {
            icon: iconBase + 'Land.png'
        },
        "12": {
            icon: iconBase + 'ResidentialPortfolio.png'
        }
    };

    //Load Marker on Map
    for (i = 0; i < markers.length; i++) {

        var data = markers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: dvMap,
            title: data.title,
            icon: icons[data.propertyType].icon,

        });

        clusterMarker.push(marker);
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(data.description);
                infoWindow.open(dvMap, marker);
            });
        })(marker, data);
    }
}

//Draw area on Map
var drawOnMap = document.getElementById("DrawOnMap");

var drawOnMapApply = document.getElementById("DrawOnMapApply");
var drawOnMapReDraw = document.getElementById("DrawOnMapReDraw");
MapDrawing = function () {

}

MapDrawing.prototype = {
    ActiveDrawing: function (isMobile) {
        var self = this;
        var deviceEvents = self.getDeviceEvent(isMobile);
        google.maps.event.addDomListener(self.map.getDiv(),
            deviceEvents.mousedown,
            function (e) {
                self.drawFreeHand(deviceEvents.mousedown,
                    deviceEvents.mousemove, deviceEvents.mouseup, isMobile);
                self.cancelEvtNStopProp(e);
            });
    },

    getDeviceEvent: function (isMobileDevice) {
        var deviceEvents;
        if (isMobileDevice) {
            deviceEvents = {
                mousedown: 'touchstart',
                mousemove: 'mousemove',
                mouseup: 'mouseup'
            };
        } else {
            deviceEvents = {
                mousedown: 'mousedown',
                mousemove: 'mousemove',
                mouseup: 'mouseup'
            };
        }
        return deviceEvents;
    },

    enableDrawing: function () {
        var self = this;
        if (self.map !== null) {
            self.map.setOptions({
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: false,
                draggableCursor: 'crosshair',
                streetViewControl: false,
                overviewMapControl: false,
                mapTypeControl: false,
                scaleControl: false,
                rotateControl: false,
                fullscreenControl: false
            });
        }
    },

    disableDrawing: function () {
        var self = this;
        if (self.map !== null) {
            self.map.setOptions({
                draggable: true,
                zoomControl: true,
                scrollwheel: true,
                disableDoubleClickZoom: true,
                draggableCursor: null,
                streetViewControl: true,
                overviewMapControl: true,
                mapTypeControl: true,
                scaleControl: true,
                rotateControl: true,
                fullscreenControl: true
            });
        }
    },

    drawFreeHand: function (mousedown, mousemove, mouseup, isMobile) {
        var self = this;
        //the polygon
        var dOptions = {
            clickable: false,
            fillColor: '#BCDCF9',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#57ACF9',
            zIndex: 1
        };

        self.poly = new google.maps.Polyline(dOptions);
        self.poly.setMap(self.map);
        var events = google.maps.event;
        //move-listener
        var move = events.addListener(self.map, mousemove, function (e) { self.poly.getPath().push(e.latLng); });

        events.addListenerOnce(self.map, mouseup, function (e) {

            events.removeListener(move);

            var path = self.poly.getPath();
            self.poly.setMap(null);

            self.poly = new google.maps.Polygon(dOptions);
            self.poly.setMap(self.map);
            self.poly.setPaths(path);

            events.clearListeners(self.map.getDiv(), mousedown);

            var bounds = new google.maps.LatLngBounds();

            var myCoordinates = [];
            for (var i = 0; i < path.getLength(); i++) {
                var xy = path.getAt(i);
                var lat = xy.lat();
                var lng = xy.lng();
                bounds.extend(xy);
                myCoordinates.push({ Longitude: lng, Latitude: lat });
            }

            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();

            var data = {
                minLat: sw.lat(),
                minLng: sw.lng(),
                maxLat: ne.lat(),
                maxLng: ne.lng(),
                geographies: myCoordinates
            };

            GetfilterProperty(data);        //Filter Map's Marker and Property List based on area draw.

            if (data.geographies.length === 0) {
                self.disableDrawing();
                self.ActiveDrawing(isMobile);
            } else {
                self.DrawOnMapCallBack(data);
            }
        });
    },

    DrawOnMapCallBack: function (data) {
        this.DrawData = data;
        drawOnMapApply.disabled = false;
    },

    //removeFreeHand
    remFreeHand: function (isMobile) {
        var self = this;
        var deviceEvents = self.getDeviceEvent(isMobile);
        if (typeof (google) !== "undefined") {
            var clearListeners = google.maps.event.clearListeners;
            clearListeners(self.map, deviceEvents.mousemove);
            clearListeners(self.map, deviceEvents.mouseup);
            clearListeners(self.map.getDiv(), deviceEvents.mousedown);
        }
    },

    cancelEvtNStopProp: function (event) {
        var ev = event ? event : window.event; //Moz support requires
        //passing the event argument manually
        //Cancel the event
        ev.cancelBubble = true;
        ev.returnValue = false;
        if (ev.stopPropagation) ev.stopPropagation();
        if (ev.preventDefault) ev.preventDefault();
    },

    init: function () {
        var self = this;

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng("31.000000", "-100.000000"),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle[true],
                //position: google.maps.ControlPosition[null]
            },
            disableDefaultUI: false,
            draggable: true,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            panControl: true,
            streetViewControl: true,
            overviewMapControl: true,
            mapTypeControl: true,
            scaleControl: true,
            rotateControl: true,
            fullscreenControl: true
        };

        self.map = new google.maps.Map
            (document.getElementById('dvMap'), mapOptions);

        dvMap = self.map;

      
    }
};