fetch(`/admin/map/getLocations`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    let locations = data.locations;
    require([
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
    ], function (Map, MapView, Graphic, GraphicsLayer) {
      // create map
      var map = new Map({
        basemap: "topo-vector",
      });

      // enable mouse event on map
      map.on("load", function () {
        map.graphics.enableMouseEvents();
      });

      // create view
      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [108.45689899086118, 11.929765013176969],
        zoom: 10,
        highlightOptions: {
          color: "rgb(123, 211, 234)",
        },
      });

      var point_template_tree = {
        title: "{Name}",
        content: "Khu du lịch này ở <b>{Address}</b>. <br>" + "{longitude}, {latitude}",
      };

      // create graphic
      var createGraphic = function (data) {
        return new Graphic({
          geometry: data,
          symbol: data.symbol,
          attributes: data,
          popupTemplate: data.popupTemplate,
        });
      };

      var graphicsLayer = new GraphicsLayer();

      let points = locations.map((location) => ({
        type: "point",
        longitude: location.coordinate.longitude,
        latitude: location.coordinate.latitude,
        Name: location.name,
        Address: location.address,
        symbol: {
          type: "simple-marker",
          color: [0, 153, 51],
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        popupTemplate: point_template_tree,
      }));

      points.forEach(function (data) {
        graphicsLayer.add(createGraphic(data));
      });

      map.add(graphicsLayer);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
