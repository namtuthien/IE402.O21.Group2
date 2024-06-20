import { getLocations, getTours, getLinesOfTour } from "/fetch.js";
import { convertDateToHourDayMonthYear, convertHourDayMonthYearToDate } from "/format.js";

const results = await getLinesOfTour();
const tourRoutes = results.tourRoutes;
const deletePopup = document.getElementById("deletePopupContainer");
const navbarBtn = document.querySelector(".navbar-btn");
const navbarContent = document.querySelector(".navbar-content");
const navbar = document.querySelector(".navbar");
const navbarBtnIcon = document.querySelector("#btn-icon");
const tourItems = document.querySelectorAll(".tours-item");
const tourList = document.querySelector(".tours-list");

const tourRight = document.querySelectorAll(".tour-right");
const tourCheck = document.querySelectorAll(".tour-check");
const tourIds = document.querySelectorAll(".tour-id");
let navbarAction = true;
let navbarStatus = false;
if (tourRoutes.length >= 9) {
  tourList.classList.add("scroll");
}
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
    navbar.style.width = 300;
    navbarBtn.style.left = 300;
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

// Lấy dữ liệu
const locations = await getLocations();

// Tạo biến trạng thái để theo dõi xem nút đã được nhấn hay chưa
let allowClick = false;
//Tạo biến lưu các địa điểm được chọn
let choosedLocations = [];
// Tạo biến lưu lenght của mảng choosedLocations
let prevChoosedLocationsLength = choosedLocations.length; // ==0
//Tạo biến lưu các line
let passingLines = []

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

  "esri/rest/route",
  "esri/rest/support/RouteParameters",
  "esri/rest/support/FeatureSet",
  "esri/geometry/support/webMercatorUtils"
], (
  Map,
  MapView,
  Graphic,
  Polyline,
  GraphicsLayer,
  Editor,
  FeatureLayer,
  reactiveUtils,
  FormTemplate,

  route, 
  RouteParameters, 
  FeatureSet, 
  webMercatorUtils
) => {
  
  // Point the URL to a valid routing service
  const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

  // The stops and route result will be stored in this layer
  const routeLayer = new GraphicsLayer();

  // Setup the route parameters
  const routeParams = new RouteParameters({
    // An authorization string used to access the routing service
    apiKey: "AAPK35e6fc8a720d45eb8c319c6b0cf5ddb1CAqeaYpeK-CG-rCiUfYFBhOGIbQq5m5UjPEw4tb9fWciTNaHvj6I6TaRS8KdGPKD"
,
    stops: new FeatureSet(),
    outSpatialReference: {
      // autocasts as new SpatialReference()
      wkid: 3857
    }
  });

  // Tạo mảng để lưu các routeResult đã thêm vào routeLayer -- sử dụng trong trường hợp muốn xóa đường đi trên map
  let routeResultAdded = [];
  

  // Define the symbology used to display the stops
  const stopSymbol = {
    type: "simple-marker",
    color: [0, 153, 51],
    outline: { color: [255, 255, 255], width: 1 },
  };

  // Define the symbology used to display the route
  const routeSymbol = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: "red",
    width: 5
  };

  // Tạo map
  const map = new Map({
    basemap: "streets-relief-vector",
    layers: [routeLayer] // thêm route layer vào map
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
      { type: "string", name: "tour_description", alias: "Mô tả", length: 2000 },
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
        { type: "text", text: "<b>Mã Tour:</b> {tour_id}" },
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
  let isUpdate = false;
  const updateButton = document.querySelector(".update-btn");
  updateButton.addEventListener("click", () => {
    isUpdate = true;

    viewDivContainer.style = 'cursor: url("/imgs/cursor-add-location.png"),auto';
  });

  const deleteButton = document.querySelector(".delete-btn");
  deleteButton.addEventListener("click", () => {
    deletePopup.style.display = "flex";
  });

  document.getElementById("submitDeleteButton").addEventListener("click", () => {
    deletePopup.style.display = "none";
    const tourChecked = [];
    tourCheck.forEach((item, index) => {
      if (item.checked) {
        tourChecked.push({ id: tourIds[index].value });
      }
    });
    try {
      fetch(`/api/tour/destroy`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourChecked),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:");
          tourIds.forEach((tour, index) => {
            if (tourChecked.some((item) => item.id === tour.value)) {
              tourItems[index].style.display = "none";
            }
          });
          alert("Xóa thành công");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Focus vào tour trên map và mở popup khi click vào item trên navbar
  tourRight.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (navbarAction) {
        tourItems.forEach((innerItem) => {
          innerItem.classList.remove("tours-item-active");
        });
        item.parentElement.classList.add("tours-item-active");

        const tourRoute = tourRoutes[index];
        featureLayer
          .queryFeatures({
            where: `tour_id = '${tourRoute.tour._id}'`,
            returnGeometry: true,
            outFields: ["*"],
          })
          .then((queryResult) => {
            if (queryResult.features.length > 0) {
              const feature = queryResult.features[0];
              const center = feature.geometry.extent.center;
              const zoomLevel = 14;
              view.goTo({ target: center, zoom: zoomLevel }).then(() => {
                view.popup.open({
                  features: [feature],
                  location: center,
                });
              });
            } else {
              console.warn(
                `Không tìm thấy đối tượng với tour_id = '${tourRoute.tour._id}' trong featureLayer.`
              );
            }
          })
          .catch((error) => {
            console.error("Lỗi khi truy vấn đối tượng từ featureLayer:", error);
          });
      }
    });
  });

  // Focus đúng item trên navbar khi click vào tour trên map
  view.on("click", (event) => {
    if (allowClick) {
      addStop(event);
    }
    if (navbarAction) {
      view.hitTest(event).then((response) => {
        const results = response.results;

        if (results.length > 0) {
          const resultFilter = results.filter((result) => result.layer === featureLayer)[0];
          console.log(resultFilter);
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
                const container = document.querySelector(".tours-list");
                container.scrollTop = tourItems[index].offsetTop - container.offsetTop;
                const center = graphic.geometry.extent.center;
                const zoomLevel = 14;

                // Kiểm tra và tắt popup editor hiện tại nếu có
                if (editor.viewModel.activeWorkflow) {
                  editor.viewModel.cancelWorkflow();
                }

                view
                  .goTo({
                    target: center,
                    zoom: zoomLevel,
                  })
                  .then(() => {
                    if (isUpdate) {
                      isUpdate = false;
                      viewDivContainer.style = "cursor: auto";
                      view.popup.visible = false;
                      view.popup.highlightOptions = true;
                      console.log(123);
                      view.ui.add(editor, "top-right");
                      editor.startUpdateWorkflowAtFeatureEdit(graphic);
                      tour_id = tourId;
                    } else {
                      view.popup.open({
                        features: [graphic],
                        location: center,
                      });
                    }
                  });
              }
            });
          }
        }
      });
    }
  });

  function addStop(event) {
    // Thêm địa điểm đã chọn vào routeLayer
    view.hitTest(event).then(function(response) {
      if (response.results.length) {
        // console.log(response.results.length);
        const graphic = response.results.filter(function(result) {
          return result.graphic.layer === locationGraphicsLayer;
        })[0]?.graphic;
    
        if (graphic && choosedLocations.indexOf(graphic) === -1) {
          // Thêm graphic vào routeLayer
          // routeLayer.add(graphic);
          // Thêm graphic vào routeParams để vẽ đường đi
          routeParams.stops.features.push(graphic);
          if (routeParams.stops.features.length >= 2) {
            route.solve(routeUrl, routeParams).then(showRoute);
          }     
          // In ra thông tin của graphic được click
          // console.log("Graphic clicked: ", graphic.attributes);
          // console.log("Added to routeLayer: ", graphic);

          //Lưu địa điểm này vào mảng
          choosedLocations.push(graphic);
          // console.log("Các địa điểm đã chọn: ", choosedLocations);
        } else {
          console.error("No graphic found in the graphicsLayer or this location is already choosed.");
        }
      } else {
        console.error("No results found.");
      } 
    });  
  }
  function showRoute(data) {
    const routeResult = data.routeResults[0].route;
    routeResult.symbol = routeSymbol;
    routeLayer.add(routeResult);
    routeResultAdded.push(routeResult);
    // console.log("Các tọa độ:");
  
    if (routeResult.geometry && routeResult.geometry.paths && routeResult.geometry.paths[0]) {
      let locationCount = 0;
      passingLines = [];
      routeResult.geometry.paths.map(path => {
        //Thêm điểm đầu cho line - Chính là tọa độ Địa điểm được chọn
        let pointsPrepare = [];
        let firstPoint = {
          longitude : choosedLocations[locationCount].attributes.location_longitude,
          latitude : choosedLocations[locationCount].attributes.location_latitude
        }
        pointsPrepare.push(firstPoint);
        //Duyệt các tọa độ của đường đi và push vào pointsPrepare
        path.forEach(point => {
          const [longitude, latitude] = point;
          const geographicPoint = webMercatorUtils.xyToLngLat(longitude, latitude);
          // console.log("[ ", geographicPoint, " ]");
          //Push tọa độ này vào pointsPrepare
          let onePoint = {
            longitude : geographicPoint[0],
            latitude : geographicPoint[1]
          }
          pointsPrepare.push(onePoint);
        });
        //Tăng locationCount lên 1
        locationCount++;
        //Thêm điểm cuối cho line - Chính là tọa độ Địa điểm được chọn
        let lastPoint = {
          longitude : choosedLocations[locationCount].attributes.location_longitude,
          latitude : choosedLocations[locationCount].attributes.location_latitude
        }
        pointsPrepare.push(lastPoint);
        // debugger
        //Push pointsPrepare vào passingLines
        passingLines.push(pointsPrepare);
        console.log(passingLines);
      })
    } else {
      console.error("No paths found in the route geometry.");
    }
  }
  

  // Tạo graphic layer
  const locationGraphicsLayer = new GraphicsLayer({
    graphics: locations.map(
      (location) =>
        new Graphic({
          geometry: {
            type: "point",
            longitude: location.location_coordinate.longitude,
            latitude: location.location_coordinate.latitude,
          },
          symbol: stopSymbol,
          attributes: {
            location_longitude: location.location_coordinate.longitude,
            location_latitude: location.location_coordinate.latitude,
            location_id: location._id,
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
          },
        })
    ),
  });
  map.add(locationGraphicsLayer);

  let tour_id = "";
  let tour = {
    tour_name: "",
    tour_price: 0,
    tour_starting_day: "",
    tour_number_of_days: 0,
    tour_number_of_nights: 0,
    tour_description: "",
    tour_total_ticket: 0,
    tour_total_ticket_available: 0,
  };

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
              { type: "field", fieldName: "tour_id", label: "Mã Tour", editable: false },
              { type: "field", fieldName: "tour_name", label: "Tên tour" },
              { type: "field", fieldName: "tour_price", label: "Giá vé" },
              { type: "field", fieldName: "tour_total_ticket", label: "Tổng số vé" },
              {
                type: "field",
                fieldName: "tour_total_ticket_available",
                label: "Tổng số vé còn trống",
              },
              {
                type: "field",
                fieldName: "tour_description",
                label: "Mô tả",
                input: { type: "text-area" },
              },
              {
                type: "field",
                fieldName: "tour_average_rating",
                label: "Đánh giá",
                editable: false,
              },
              {
                type: "field",
                fieldName: "tour_total_rating",
                label: "Tổng số đánh giá",
                editable: false,
              },
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
        try {
          navbarAction = true;
          view.ui.remove(editor);

          view.openPopup({ fetchFeatures: true, shouldFocus: true });
        } catch (e) {
          console.error("Error processing editor state: ", e);
        }
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

  // Event listener for apply-edits
  featureLayer.on("apply-edits", (event) => {
    event.result
      .then((result) => {
        // Check if updateFeatures exists and is not empty
        if (result.edits.updateFeatures && result.edits.updateFeatures.length > 0) {
          const attributes = result.edits.updateFeatures[0].attributes;
          tour.tour_name = attributes.tour_name;
          tour.tour_price = parseInt(attributes.tour_price.replace(/\./g, ""));
          tour.tour_starting_day = convertHourDayMonthYearToDate(attributes.tour_starting_day);
          tour.tour_number_of_days = parseInt(attributes.tour_number_of_days);
          tour.tour_number_of_nights = parseInt(attributes.tour_number_of_nights);
          tour.tour_description = attributes.tour_description;
          tour.tour_total_ticket = parseInt(attributes.tour_total_ticket);
          tour.tour_total_ticket_available = parseInt(attributes.tour_total_ticket_available);
          try {
            fetch(`/api/tour/edit/${tour_id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(tour),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
              })
              .then((data) => {
                console.log("Success:");
                alert("Sửa thành công");
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
              })
              .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
              });
          } catch (error) {
            console.error("Error:", error);
          }
        } else if (result.edits.deleteFeatures && result.edits.deleteFeatures.length > 0) {
          try {
            fetch(`/api/tour/delete/${tour_id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
              })
              .then((data) => {
                console.log("Success:");
                alert("Xóa thành công");
              })
              .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
              });
          } catch (error) {
            console.error("Error:", error);
          }
        }
      })
      .catch((error) => {
        console.error("Error in apply-edits promise:", error);
      });
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
        const attributes = view.popup.selectedFeature.attributes;
        tour_id = attributes.tour_id;
        console.log(tour_id);
      }
    }
  );
  // ===========================================================================================================================  //
  //DUyệt mảng và tạo thẻ các địa điểm đã chọn
  function getChoosedLocations() {
    if(choosedLocations.length != 0) {
      //Xóa hết các địa điểm hiện tại trong thẻ
      document.getElementById('tour-popup__current-locations').innerHTML = "";
      choosedLocations.forEach(location => {
        const pElement = document.createElement('p');
        pElement.className = 'tour-popup__button tour-popup__tab';
        pElement.innerHTML = `
          ${location.attributes.location_name}
          <button type="button" class="tour-popup__remove-button">
              <i class="material-icons tour-popup__hidden-tab">close</i>
          </button>
        `
        document.getElementById('tour-popup__current-locations').appendChild(pElement);
        document.getElementById('allLocationDiv').style.display = 'none';
      });
    }
  }

  //=======================================================================================================================
  document.getElementById('addTourButton').addEventListener('click', function() {
    document.getElementById('addTourDiv').style.display = 'flex';
    if (choosedLocations.length != prevChoosedLocationsLength) {
      getChoosedLocations();
    }
  })
  
  document.getElementById('hideAddDiv').addEventListener('click', function() {
    routeLayer.removeAll();
    choosedLocations.forEach((choosedLocation) => {        // Tìm chỉ số của điểm dừng cần xóa
      const index = routeParams.stops.features.findIndex(feature => {
        return feature.attributes.location_name === choosedLocation.attributes.location_name;
      });

      // Nếu tìm thấy điểm dừng, xóa nó
      if (index !== -1) {
        console.log("routeParams bị xóa: ", index);
        routeParams.stops.features.splice(index, 1);
      }
    })
    choosedLocations = [];
    prevChoosedLocationsLength = 0;
    //Xóa hết các địa điểm hiện tại trong popup
    document.getElementById('tour-popup__current-locations').innerHTML = "";
    document.getElementById('addTourDiv').style.display = 'none';
    allowClick = false;
  })
  //
  //
  //
  //
  //JS Thêm điểm đến===============================================================================================================
  document.getElementById('addLocationButton').addEventListener('click', function () {
    // document.getElementById('allLocationDiv').style.display = 'block';
    allowClick = true;
    document.getElementById('addTourDiv').style.display = 'none';
  })
  document.getElementById('hideLocationDiv').addEventListener('click', function () {
    document.getElementById('allLocationDiv').style.display = 'none';
  })
  const allLocation = document.getElementsByClassName('tour-popup__location');
  for (let i = 0; i< allLocation.length; i++) {
    allLocation[i].addEventListener('click', function() {
      const pElement = document.createElement('p');
      pElement.className = 'tour-popup__button tour-popup__tab';
      pElement.innerHTML = `
        ${this.textContent}
        <button type="button" class="tour-popup__remove-button">
            <i class="material-icons tour-popup__hidden-tab">close</i>
        </button>
      `
      document.getElementById('tour-popup__current-locations').appendChild(pElement);
      document.getElementById('allLocationDiv').style.display = 'none';
    })
  }

  // Sử dụng ủy quyền sự kiện để xóa các thẻ địa điểm
  document.getElementById('tour-popup__current-locations').addEventListener('click', function(event) {
    if(event.target.closest('.tour-popup__remove-button')) {
      const pElement = event.target.closest('p');
      const removedElementText = pElement.childNodes[0].nodeValue.trim();
      // TÌm index của địa điểm bị xóa trong mảng choosedLocations
      let indexOfRemoved =  -1;
      for (let index =  0; index < choosedLocations.length; index++){
        if (choosedLocations[index].attributes.location_name == removedElementText) {
          indexOfRemoved = index;
        }
      }
      if(indexOfRemoved >= 0) {
        // Xóa đường đi đã hiện trên map
        routeLayer.removeAll();
  
        // Tìm chỉ số của điểm dừng cần xóa
        const index = routeParams.stops.features.findIndex(feature => {
          return feature.attributes.location_name === choosedLocations[indexOfRemoved].attributes.location_name;
        });
  
        // Nếu tìm thấy điểm dừng, xóa nó
        if (index !== -1) {
          console.log("routeParams bị xóa: ", index);
          routeParams.stops.features.splice(index, 1);
        }
        if (routeParams.stops.features.length >= 2) {
          route.solve(routeUrl, routeParams).then(showRoute);
        }
        // Xóa địa điểm đó trong mảng choosedLocations
        choosedLocations.splice(indexOfRemoved,1);
        //Giảm số lượng địa điểm đã chọn đi 1
        prevChoosedLocationsLength--;

        // Xóa thẻ p được chọn
        pElement.remove();
      }
    }
  });

  // JS Hiển thị ảnh khi nhấn chọn ảnh===============================================================================================================
  document.getElementById("addImageButton").addEventListener('click', function() {
    document.getElementById('imageInput').click()
  })

  document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0]
    if(file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          // Hiển thị ảnh đã chọn (có thể thay đổi theo yêu cầu)
          const imgElement = document.createElement('img');
          imgElement.src = e.target.result;
          imgElement.className = 'tour-popup__image-placeholder';
          const divElement = document.createElement('div');
          divElement.className = 'tour-popup__image-button tour-popup__image';
          divElement.appendChild(imgElement);
          document.querySelector('.tour-popup__all-image-div').appendChild(divElement);
      };
      reader.readAsDataURL(file);
    }
  })

  document.getElementById('submitAddTourButton').addEventListener('click', function() {
    const addTourForm = document.getElementById('addTourForm');
    const formData = new FormData(addTourForm);
    const tourData = {
      tour_name: formData.get('tour-popup-name'),
      tour_price: formData.get('tour-popup-price'),
      tour_total_ticket: formData.get('tour-popup-total-tickets'),
      tour_total_ticket_available: formData.get('tour-popup-available-tickets'),
      tour_starting_day: formData.get('tour-popup-start-date'),
      tour_number_of_days: formData.get('tour-popup-days'),
      tour_number_of_nights: formData.get('tour-popup-days'),
      tour_description: formData.get('tour-popup-description')
    }
    const locationsId = [];
    choosedLocations.map((choosedLocation) => {
      locationsId.push(choosedLocation.attributes.location_id);
    });
    tourData.destinations = locationsId;
    // Tạo line lên db và lấy id của line trên db
    // Tạo mảng để lưu các promise cần chờ
    let promises = [];
    const linesId = [];
    const routesId = [];
    // Duyệt qua tất cả các line
    passingLines.map((line) => {
      // Duyệt qua từng point trong 1 line
      const points = line.map((point) => ({
        longitude: point.longitude,
        latitude: point.latitude
      }));
      const lineStore = {points};
      console.log('lineStore:', lineStore);
      //Lưu line lên db
      const fetchPromise = fetch("/api/line/add",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lineStore)
      })
      .then(response => response.json())
      .then(data => {
          //Thêm id của line vừa lưu lên db vào mảng 
          linesId.push(data._id);
          console.log('Success:', data);
      })
      .catch(error => {
          console.error('Error:', error);
      });

      //Thêm promise vào mảng 
      promises.push(fetchPromise);
    });
    
    // Kiểm tra các promise đã được trả về hết chưa
    Promise.all(promises).then(() => {
      // Cho mảng promisses về rỗng
      promises = [];
      //Tạo route lên db và lấy id của nó lưu vào mảng
      console.log("lineId: ", linesId)
      linesId.map((lineId) => {
        const routeStore = {  
          route_name: "Tên của route",
          route_description: "Mô tả về route",
          route_length: 0,
          lines: [lineId]
        }
        //Lưu route lên db để lấy id của route
        const fetchPromise = fetch('/api/route/add',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(routeStore)
        })
        .then(response => response.json())
        .then(data => {
            //Thêm id của line vừa lưu lên db vào mảng 
            routesId.push(data._id);
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        //Thêm promise vào mảng
        promises.push(fetchPromise);
      });

      // Kiểm tra các promise đã được trả về hết chưa
      Promise.all(promises).then(() => {
        // Cho mảng promisses về rỗng
        promises = [];
        console.log("routesId: ", routesId)
        console.log("choosedLocations: ", choosedLocations)
        const routesPrepare = [];
        for(let i = 0; i < routesId.length; i++) {
          const oneRoutePrepare = {
            start_coordinate: {
              longitude: choosedLocations[i].attributes.location_longitude,
              latitude: choosedLocations[i].attributes.location_latitude,
            },
            end_coordinate: {
              longitude: choosedLocations[i+1].attributes.location_longitude,
              latitude: choosedLocations[i+1].attributes.location_latitude,
            },
            route: routesId[i],
          };
          routesPrepare.push(oneRoutePrepare);
        }
        console.log("routesPrepare: ",routesPrepare);
        tourData.routes = routesPrepare;
        console.log("Dữ liệu: ", tourData);
        const fetchPromise = fetch('/api/tour/store', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(tourData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Tạo Tour Thành công!')
            console.log('Successing Create Tour:', data);
        })
        .catch(error => {
            // console.error('Error:', error);
        });

        
        //Thêm promise vào mảng
        promises.push(fetchPromise);
        
        // Kiểm tra các promise đã được trả về hết chưa
        Promise.all(promises).then(() => {
          // Ẩn popup sau khi thêm tour
          document.getElementById('hideAddDiv').click();
          // Reload lại trang sau khi thêm Tour
          // window.location.reload();
        })
      });
    });
  })
});
