// import utils
import { convertDateToHourDayMonthYear } from "/format.js";
import { getLocations } from "/fetch.js";

// get data
const locations = await getLocations();

// arcgis
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/PopupTemplate",
], (Map, MapView, Graphic, GraphicsLayer, PopupTemplate) => {
  // create map
  var map = new Map({
    basemap: "streets-relief-vector",
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
    zoom: 15,
    highlightOptions: {
      color: "rgb(123, 211, 234)",
    },
  });

  // create popup template
  var locationPopupTemplate = new PopupTemplate({
    title: "{location_name}",
    content: [
      {
        type: "text",
        text: "<b>Tọa độ: </b> [{longitude}, {latitude}]",
      },
      {
        type: "text",
        text: "<b>Loại địa điểm:</b> {location_type}",
      },
      {
        type: "text",
        text: "<b>Địa chỉ:</b> {location_address}",
      },
      {
        type: "text",
        text: "<b>Đánh giá:</b> {location_rating}/5 - {location_total_rating} lượt",
      },
      {
        type: "text",
        text: "<b>Số điện thoại:</b> {location_phone_number}",
      },
      {
        type: "text",
        text: "<b>Website:</b> {location_website}",
      },
      {
        type: "text",
        text: "<b>Ngày tạo:</b> {created_at}",
      },
      {
        type: "text",
        text: "<b>Cập nhật:</b> {updated_at}",
      },
    ],
    overwriteActions: true,
    actions: [
      {
        title: "Cập nhật thông tin",
        id: "action-edit-info",
        className: "esri-icon-edit",
      },
      {
        title: "Phóng to",
        id: "action-zoom-out",
        className: "esri-icon-zoom-out-magnifying-glass",
      },
      {
        title: "Thu nhỏ",
        id: "action-zoom-in",
        className: "esri-icon-zoom-in-magnifying-glass",
      },
    ],
  });

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
    longitude: location.location_coordinate.longitude,
    latitude: location.location_coordinate.latitude,
    location_name: location.location_name,
    location_type: location.location_type,
    location_address: location.location_address,
    location_description: location.location_description ?? "Không có",
    location_rating: location.location_rating ?? "0",
    location_total_rating: location.location_total_rating ?? "0",
    location_phone_number: location.location_phone_number ?? "Không có",
    location_website: location.location_website ?? "Không có",
    created_at: convertDateToHourDayMonthYear(location.created_at),
    updated_at: convertDateToHourDayMonthYear(location.updated_at),
    symbol: {
      type: "simple-marker",
      color: [0, 153, 51],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    },
    popupTemplate: locationPopupTemplate,
  }));

  points.forEach(function (data) {
    graphicsLayer.add(createGraphic(data));
  });

  map.add(graphicsLayer);
});
