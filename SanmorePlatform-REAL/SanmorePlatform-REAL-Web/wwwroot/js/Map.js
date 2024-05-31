var dvMap;

//const { AdvancedMarkerElement }; //= await google.maps.importLibrary("marker");

async function myfunction() {
    //console.log('Inside of myfunction');
    return google.maps.importLibrary("marker");
}

// Here we wait for the myfunction to finish
// and then returns a promise that'll be waited for aswell
// It's useless to wait the myfunction to finish before to return
// we can simply returns a promise that will be resolved later

// Also point that we don't use async keyword on the function because
// we can simply returns the promise returned by myfunction
function start() {
    return myfunction();
}


// Call start
/*(async () => {
    //console.log('before start');

    const { AdvancedMarkerElement } = await start();

    //console.log('after start');
})();*/

function InitializeMapBasic() {
 
    var mapDrawing = new MapDrawing();
    mapDrawing.init();
 
}

function InitializeMap() {

    var mapDrawing = new MapDrawing();
    mapDrawing.init();


    if (drawOnMap) {
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
async function LoadMap(markers) {
    //Marker icon
    //const iconBase = '../MapIcons/';
    const iconBase = 'https://localhost:7220/MapIcons/';

    const icons = {
        "1": {
            icon: iconBase + 'multifamily.svg'//Multifamily.png'
        },
        "2": {
            icon: iconBase + '1_4_residential.svg'//1-4residential.png'
        },
        "3": {
            icon: iconBase + 'office.svg'//Office.png'
        },
        "4": {
            icon: iconBase + 'industrial.svg'//Industrial.png'
        },
        "5": {
            icon: iconBase + 'retail.svg'//retail.png'
        },
        "6": {
            icon: iconBase + 'shopping_center.svg'//Shopping Centre.png'
        },
        "7": {
            icon: iconBase + 'storage_units.svg'//Specialty.png'
        },
        "8": {
            icon: iconBase + 'healthcare.svg'//Health Care.png'
        },
        "9": {
            icon: iconBase + 'hospitality.svg'//Hospitality.png'
        },
        "10": {
            icon: iconBase + 'sports_entertainment.svg'//sports.png'
        },
        "11": {
            icon: iconBase + 'land.svg'//Land.png'
        },
        "12": {
            icon: iconBase + 'residential_portfolio.svg'//ResidentialPortfolio.png'
        }
    };


    const { AdvancedMarkerElement } = await start();
    const { PinElement } = await start();

    //Load Marker on Map
    for (i = 0; i < markers.length; i++) {

        var data = markers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        //var marker = new google.maps.Marker({//AdvancedMarkerElement



        // A marker with a custom SVG glyph.
        const glyphImg = document.createElement('img');
        glyphImg.src = icons[data.propertyType].icon;

        const glyphSvgPinElement = new PinElement({
            glyph: glyphImg,
            background: '#FF0000',
            borderColor: '#000000'
        });

        try {
            var marker = new AdvancedMarkerElement({
                //position: myLatlng,
                //position: { lat: 32.7770737, lng: -97.394463 },//data.lat, data.lng
                position: { lat: Number(data.lat), lng: Number(data.lng) },
                map: dvMap,
                title: data.title,
                content: glyphSvgPinElement.element
            });
        }
        catch (err) {
            // handle the error
            console.log(err.message);
        }


        

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
            mapId: '9e253397b62cee19',
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


        var myEle = document.getElementById('dvMap');

        if (myEle) {
            self.map = new google.maps.Map
                (document.getElementById('dvMap'), mapOptions);

            dvMap = self.map;
        }
        

      
    }
};