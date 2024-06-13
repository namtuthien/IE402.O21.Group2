import { getTours, getLinesOfTour } from "/fetch.js";
import { convertDateToHourDayMonthYear } from "/format.js";

const results = await getLinesOfTour();
const tourRoutes = results.tourRoutes;
const tours = results.tours;

const navbarBtn = document.querySelector(".navbar-btn");
const navbarContent = document.querySelector(".navbar-content");
const navbar = document.querySelector(".navbar");
const navbarBtnIcon = document.querySelector("#btn-icon");
const tourItems = document.querySelectorAll(".tours-item");
const tourRight = document.querySelectorAll(".tour-right");
let navbarAction = true;
let navbarStatus = false;
navbarBtn.addEventListener("click", () => {
  if (navbarStatus) {
    navbarStatus = false;
    navbarContent.style.display = "none";
    navbar.style.width = 0;
    navbarBtn.style.left = 40;
    navbarBtn.style.width = 60;
    navbarBtn.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.5)";
    navbarBtnIcon.innerHTML = "menu";
    navbarBtn.style.borderTopLeftRadius = "100%";
    navbarBtn.style.borderBottomLeftRadius = "100%";
  } else {
    navbarStatus = true;
    navbar.style.width = 360;
    navbarBtn.style.left = 360;
    navbarBtn.style.borderTopLeftRadius = 0;
    navbarBtn.style.borderBottomLeftRadius = 0;
    setTimeout(() => {
      navbarBtn.style.width = 60;
      navbarBtn.style.boxShadow = "2px 0px 4px rgba(0, 0, 0, 0.2)";
      navbarContent.style.display = "block";
      navbarBtnIcon.innerHTML = "arrow_back_ios";
    }, 200);
  }
});

// ArcGIS
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/geometry/Polyline",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Editor",
  "esri/layers/FeatureLayer",
  "esri/core/reactiveUtils",
  "esri/form/FormTemplate",
], (
  Map,
  MapView,
  Graphic,
  Polyline,
  GraphicsLayer,
  Editor,
  FeatureLayer,
  reactiveUtils,
  FormTemplate
) => {
  // Tạo map
  const map = new Map({
    basemap: "streets-relief-vector",
  });

  // Kích hoạt sự kiện chuột trên bản đồ
  map.on("load", function () {
    map.graphics.enableMouseEvents();
  });

  // Tạo view
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [108.45689899086118, 11.929765013176969],
    zoom: 15,
    highlightOptions: {
      color: "rgb(123, 211, 234)",
    },
  });
  // Lấy bản đồ
  const viewDivContainer = document.querySelector("#viewDiv");

  const graphicsLayer = new GraphicsLayer();
  tourRoutes.forEach(function (tourRoute) {
    // Tạo Polyline cho mỗi đường
    var polyline = new Polyline();

    // Tạo đối tượng Graphic cho đường nối
    var polylineGraphic = new Graphic({
      geometry: {
        type: "polyline",
        paths: tourRoute.lines,
      },
      symbol: {
        type: "simple-line", // Loại đường
        color: [226, 119, 40], // Màu sắc của đường
        width: 4, // Độ rộng của đường
      },
      attributes: {
        tour_id: tourRoute.tour._id,
        tour_name: tourRoute.tour.tour_name,
        tour_price: tourRoute.tour.tour_price.toLocaleString("de-DE"),
        tour_total_ticket: tourRoute.tour.tour_total_ticket,
        tour_total_ticket_available: tourRoute.tour.tour_total_ticket_available,
        tour_description: tourRoute.tour.tour_description,
        tour_average_rating: tourRoute.tour.tour_average_rating
          ? tourRoute.tour.tour_average_rating
          : "#",
        tour_total_rating: tourRoute.tour.tour_total_rating,
        tour_number_of_days: tourRoute.tour.tour_number_of_days,
        tour_number_of_nights: tourRoute.tour.tour_number_of_nights,
        tour_starting_day: convertDateToHourDayMonthYear(tourRoute.tour.tour_starting_day),
        updated_at: convertDateToHourDayMonthYear(tourRoute.tour.updated_at),
        created_at: convertDateToHourDayMonthYear(tourRoute.tour.created_at),
      },
    });

    // Thêm đối tượng Graphic vào GraphicLayer
    graphicsLayer.add(polylineGraphic);
  });

  // Thêm GraphicLayer vào bản đồ
  // map.add(graphicsLayer);

  const featureLayer = new FeatureLayer({
    fields: [
      { type: "string", name: "tour_id", alias: "ID" },
      { type: "string", name: "tour_name", alias: "Tên tour" },
      { type: "string", name: "tour_price", alias: "Giá vé" },
      { type: "string", name: "tour_total_ticket", alias: "Tổng số vé" },
      { type: "string", name: "tour_total_ticket_available", alias: "Tổng số vé còn trống" },
      { type: "string", name: "tour_description", alias: "Mô tả" },
      { type: "string", name: "tour_average_rating", alias: "Đánh giá" },
      { type: "string", name: "tour_total_rating", alias: "Tổng số đánh giá" },
      { type: "string", name: "tour_number_of_days", alias: "Số ngày" },
      { type: "string", name: "tour_number_of_nights", alias: "Số đêm" },
      { type: "string", name: "tour_starting_day", alias: "Ngày khởi hành" },
      { type: "string", name: "updated_at", alias: "Ngày cập nhật" },
      { type: "string", name: "created_at", alias: "Ngày tạo" },
    ],
    popupTemplate: {
      title: "{tour_name}",
      content: [
        { type: "text", text: "<b>Tour ID:</b> {tour_id}" },
        { type: "text", text: "<b>Ngày khởi hành:</b> {tour_starting_day}" },
        { type: "text", text: "<b>Giá vé: </b> {tour_price}đ" },
        {
          type: "text",
          text: "<b>Số vé trống</b> {tour_total_ticket_available}/{tour_total_ticket}",
        },
        {
          type: "text",
          text: "<b>Đánh giá:</b> {tour_average_rating}/5 - {tour_total_rating} lượt",
        },
        {
          type: "text",
          text: "<b>Số ngày/Số đêm:</b> {tour_number_of_days}/{tour_number_of_nights}",
        },
        { type: "text", text: "<b>Ngày tạo:</b> {created_at}" },
        { type: "text", text: "<b>Cập nhật:</b> {updated_at}" },
      ],
      actions: [
        // { title: "Thêm địa điểm", id: "action-add-info", className: "esri-icon-add" },
        { title: "Cập nhật thông tin", id: "action-edit-info", className: "esri-icon-edit" },
        {
          title: "Phóng to",
          id: "action-zoom-out",
          className: "esri-icon-zoom-out-magnifying-glass",
        },
        { title: "Thu nhỏ", id: "action-zoom-in", className: "esri-icon-zoom-in-magnifying-glass" },
      ],
      overwriteActions: true,
    },
    source: graphicsLayer.graphics,
    objectIdField: "ID",
    geometryType: "polyline",

    spatialReference: { wkid: 4326 },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        color: [226, 119, 40],
        width: 4,
        outline: { color: [255, 255, 255], width: 6 },
      },
    },
    outFields: ["*"],
  });
  map.add(featureLayer);

  // Focus vào tour trên map và mở popup khi click vào item trên navbar
  tourRight.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (navbarAction) {
        tourItems.forEach((innerItem) => {
          innerItem.classList.remove("tours-item-active");
        });
        item.parentElement.classList.add("tours-item-active");

        const tourRoute = tourRoutes[index];
        const polylineGraphic = graphicsLayer.graphics.find(
          (graphic) => graphic.attributes.tour_id === tourRoute.tour._id
        );

        if (polylineGraphic) {
          const center = polylineGraphic.geometry.extent.center;
          const zoomLevel = 14;
          view
            .goTo({
              target: center,
              zoom: zoomLevel,
            })
            .then(() => {
              view.popup.open({
                features: [polylineGraphic],
                location: polylineGraphic.geometry.extent.center,
              });
            });
        }
      }
    });
  });

  // Focus đúng item trên navbar khi click vào tour trên map
  view.on("click", (event) => {
    if (navbarAction) {
      view.hitTest(event).then((response) => {
        const results = response.results;
        if (results.length > 0) {
          const resultFilter = results.filter((result) => result.layer === featureLayer)[0];
          const graphic = resultFilter?.graphic;
          if (graphic) {
            const tourId = graphic.attributes.tour_id;
            console.log(tourId);
            tourItems.forEach((item, index) => {
              if (tourRoutes[index].tour._id === tourId) {
                tourItems.forEach((innerItem) => {
                  innerItem.classList.remove("tours-item-active");
                });
                tourItems[index].classList.add("tours-item-active");

                const center = graphic.geometry.extent.center;
                const zoomLevel = 14;

                view
                  .goTo({
                    target: center,
                    zoom: zoomLevel,
                  })
                  .then(() => {
                    view.popup.open({
                      features: [graphic],
                      location: center,
                    });
                  });
              }
            });
          }
        }
      });
    }
  });

  let editor;
  view.when(() => {
    editor = new Editor({
      view: view,
      layerInfos: [
        {
          layer: featureLayer,
          visibleElements: { snappingControls: false },
          container: document.createElement("div"),
          formTemplate: {
            elements: [
              { type: "field", fieldName: "tour_id", label: "ID" },
              { type: "field", fieldName: "tour_name", label: "Tên tour" },
              { type: "field", fieldName: "tour_price", label: "Giá vé" },
              { type: "field", fieldName: "tour_total_ticket", label: "Tổng số vé" },
              {
                type: "field",
                fieldName: "tour_total_ticket_available",
                label: "Tổng số vé còn trống",
              },
              { type: "field", fieldName: "tour_description", label: "Mô tả" },
              { type: "field", fieldName: "tour_average_rating", label: "Đánh giá" },
              { type: "field", fieldName: "tour_total_rating", label: "Tổng số đánh giá" },
              { type: "field", fieldName: "tour_number_of_days", label: "Số ngày" },
              { type: "field", fieldName: "tour_number_of_nights", label: "Số đêm" },
              { type: "field", fieldName: "tour_starting_day", label: "Ngày khởi hành" },
            ],
          },
        },
      ],
    });

    reactiveUtils.when(
      () => editor.viewModel.state === "ready",
      () => {
        navbarAction = true;
        view.ui.remove(editor);

        view.openPopup({ fetchFeatures: true, shouldFocus: true });
      }
    );
  });

  let features;
  reactiveUtils.watch(
    () => view.popup?.visible,
    (event) => {
      if (editor.viewModel.state === "editing-existing-feature") {
        view.closePopup();
      } else {
        features = view.popup.features;
      }
    }
  );
  featureLayer.on("apply-edits", () => {
    view.ui.remove(editor);
    features.forEach((feature) => {
      feature.popupTemplate = {
        title: "{location_name}",
        content: [
          { type: "text", text: "<b>Tour ID:</b> {tour_id}" },
          { type: "text", text: "<b>Ngày khởi hành:</b> {tour_starting_day}" },
          { type: "text", text: "<b>Giá vé: </b> {tour_price}đ" },
          {
            type: "text",
            text: "<b>Số vé trống</b> {tour_total_ticket_available}/{tour_total_ticket}",
          },
          {
            type: "text",
            text: "<b>Đánh giá:</b> {tour_average_rating}/5 - {tour_total_rating} lượt",
          },
          {
            type: "text",
            text: "<b>Số ngày/Số đêm:</b> {tour_number_of_days}/{tour_number_of_nights}",
          },
          { type: "text", text: "<b>Ngày tạo:</b> {created_at}" },
          { type: "text", text: "<b>Cập nhật:</b> {updated_at}" },
        ],
      };
    });

    if (features) {
      view.openPopup({ features: features });
    }

    editor.viewModel.cancelWorkflow();
  });

  // Xử lý sự kiện action của popup
  reactiveUtils.on(
    () => view.popup,
    "trigger-action",
    (event) => {
      if (event.action.id === "action-edit-info") {
        navbarAction = false;
        view.popup.visible = false;
        view.popup.highlightOptions = true;
        view.ui.add(editor, "top-right");
        editor.startUpdateWorkflowAtFeatureEdit(view.popup.selectedFeature);
      }
    }
  );
});
