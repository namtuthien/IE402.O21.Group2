const socket = io();
document.addEventListener("DOMContentLoaded", function () {
  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
  ], function (Map, MapView, Graphic, GraphicsLayer) {
    let linePath = [];

    var map = new Map({
      basemap: "streets-navigation-vector",
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [106.80277787702147, 10.869795842182537], // Longitude, latitude
      zoom: 17,
    });

    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    function updateGraphics() {
      graphicsLayer.removeAll();

      // Add the polyline to the graphics layer
      if (linePath.length > 1) {
        var polyline = {
          type: "polyline",
          paths: linePath,
        };

        var lineSymbol = {
          type: "simple-line",
          color: [0, 0, 255], // Blue color
          width: 2,
        };

        var polylineGraphic = new Graphic({
          geometry: polyline,
          symbol: lineSymbol,
        });

        graphicsLayer.add(polylineGraphic);
      }

      // Add the current location as a point
      if (linePath.length > 0) {
        var location = linePath[linePath.length - 1];
        var point = {
          type: "point",
          longitude: location[0],
          latitude: location[1],
        };

        var markerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
        };

        var pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
        });

        graphicsLayer.add(pointGraphic);
      }
    }

    socket.on("location update", function (tourGuideLocations) {
      console.log(tourGuideLocations[tourGuideLocations.length - 1]);
      linePath = tourGuideLocations;
      updateGraphics();
    });
  });
});
