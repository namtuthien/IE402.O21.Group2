// Import các module cần thiết
import { convertDateToHourDayMonthYear } from "/format.js";
import { getLocations, getTours, getLinesOfTour } from "/fetch.js";

// Lấy dữ liệu
const locations = await getLocations();
// const tours = await getTours();
let streets;

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
  "esri/layers/GraphicsLayer",
  "esri/widgets/Editor",
  "esri/layers/FeatureLayer",
  "esri/core/reactiveUtils",
  "esri/form/FormTemplate",
], (Map, MapView, Graphic, GraphicsLayer, Editor, FeatureLayer, reactiveUtils, FormTemplate) => {
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
  // Biến check xem có đang ở chế độ thêm địa điểm không
  let isAddingLocation = false;
  // Nút thêm địa điểm
  const btnAddLocation = document.querySelector("#btn-add-location");
  btnAddLocation.onclick = function () {
    isAddingLocation = true;

    viewDivContainer.style = 'cursor: url("/imgs/cursor-add-location.png"),auto';
  };
  // Sự kiện click
  view.on("click", function (event) {
    if (isAddingLocation) {
      isAddingLocation = false;
      viewDivContainer.style = "cursor: auto";
      // Lấy cái modal form thêm địa điểm
      const formCRLElement = document.querySelector("#modal_form_add_location");
      // Cho nó hiện ra
      formCRLElement.style.display = "flex";

      // lấy lat long khi click
      const fieldlLongitude = document.querySelector('input[name="location_coordinate_longitude"]');
      const fieldlLatitude = document.querySelector('input[name="location_coordinate_latitude"]');
      fieldlLongitude.value = event.mapPoint.longitude;
      fieldlLatitude.value = event.mapPoint.latitude;
      // Xử lý bảng hoạt động
      const tableActivitiesTbody = document.querySelector(".table__activities-tbody");
      const tableActionAdd = document.querySelector(".table__action-add");
      const tableActionDelete = document.querySelector("#delete_activity");
      const tableActionSelectAll = document.querySelector("#select_all_activity");

      let index = 0;
      let listNoActivity = [];
      let selectedArrActivity = [];
      // Xử lý chọn all dòng
      tableActionSelectAll.onchange = function (e) {
        const isChecked = e.target.checked;
        selectedArrActivity = isChecked ? [...listNoActivity] : [];
        document.querySelectorAll(".form-check-input").forEach((checkbox) => {
          checkbox.checked = isChecked;
        });
      };
      // Xử lý thêm dòng
      tableActionAdd.onclick = function () {
        index++;
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td scope="row">
              <div class="form-check">
                <input name="activity_item" class="form-check-input" type="checkbox" id="${index}" onchange="onChecked(${index})">
              </div>
            </td>
            <td scope="row" class="col-md-1">
              <div class="form-group">
                <input type="number" readonly min="1" value=${
                  listNoActivity.length + 1
                } name="activity_no" class="form-control bg-white">
              </div>
            </td>
            <td>
              <div class="form-group">
                <input type="text" name="activity_name" class="form-control bg-white">
              </div>
            </td>
            <td>
              <div class="form-group">
                <input type="text" name="activity_time" class="form-control bg-white">
              </div>
            </td>
            <td>
              <div class="form-group">
                <input type="text" name="activity_desc" class="form-control bg-white">
              </div>
            </td>
            <td>
              <span class="material-icons-outlined">more_vert</span>
            </td>
          `;
        // Add event listener
        const checkbox = newRow.querySelector(".form-check-input");
        checkbox.onchange = function (e) {
          const id = +e.target.id;
          if (selectedArrActivity.includes(id)) {
            const index = selectedArrActivity.indexOf(id);
            if (index > -1) {
              selectedArrActivity.splice(index, 1);
            }
          } else {
            selectedArrActivity.push(id);
          }
          tableActionSelectAll.checked = selectedArrActivity.length === listNoActivity.length;
        };

        tableActivitiesTbody.insertBefore(newRow, tableActionAdd);
        listNoActivity.push(index);
      };
      // Xử lý xoá dòng được chọn
      tableActionDelete.onclick = function () {
        selectedArrActivity.forEach((id) => {
          const checkbox = document.getElementById(id);
          if (checkbox) {
            const row = checkbox.closest("tr");
            if (row) {
              row.remove();
            }
          }
        });

        listNoActivity = listNoActivity.filter((currId) => !selectedArrActivity.includes(currId));
        const arrSTT = document.querySelectorAll('input[name="activity_no"]');

        listNoActivity.forEach((id, index) => {
          arrSTT[index].value = index + 1;
        });
        selectedArrActivity.length = 0;
        tableActionSelectAll.checked = false;
      };
      // Xử lý gửi dữ liệu lên server
      const storeForm = document.querySelector("#form_add_location");
      const btnSave = document.querySelector("#btn_save");
      // Lưu địa điểm
      btnSave.onclick = function () {
        storeForm.action = "/admin/location/store";
        storeForm.submit();
      };
      // Lấy cái nút tắt form
      const formCloseAction = document.querySelector("#close-form-action");
      formCloseAction.onclick = function () {
        formCRLElement.style.display = "none";
        const allRows = Array.from(tableActivitiesTbody.querySelectorAll("tr"));
        for (let i = 0; i < allRows.length - 1; i++) {
          tableActivitiesTbody.removeChild(allRows[i]);
        }
      };
    }
  });

  // Tạo graphic layer
  const graphicsLayer = new GraphicsLayer({
    graphics: locations.map(
      (location) =>
        new Graphic({
          geometry: {
            type: "point",
            longitude: location.location_coordinate.longitude,
            latitude: location.location_coordinate.latitude,
          },
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
  // map.add(graphicsLayer);

  // Tạo feature layer
  const featureLayer = new FeatureLayer({
    fields: [
      { type: "string", name: "location_id", alias: "ID" },
      { type: "double", name: "location_longitude", alias: "Kinh độ" },
      { type: "double", name: "location_latitude", alias: "Vĩ độ" },
      { type: "string", name: "location_name", alias: "Tên địa điểm" },
      { type: "string", name: "location_type", alias: "Loại địa điểm" },
      { type: "string", name: "location_address", alias: "Địa chỉ" },
      { type: "string", name: "location_description", alias: "Mô tả" },
      { type: "string", name: "location_rating", alias: "Đánh giá" },
      { type: "string", name: "location_total_rating", alias: "Số lượt đánh giá" },
      { type: "string", name: "location_phone_number", alias: "Số điện thoại" },
      { type: "string", name: "location_website", alias: "Website" },
      { type: "string", name: "updated_at", alias: "Ngày cập nhật" },
      { type: "string", name: "created_at", alias: "Ngày tạo" },
    ],
    popupTemplate: {
      title: "{location_name} : {location_id}",
      content: [
        { type: "text", text: "<b>Tọa độ: </b> [{location_longitude}, {location_latitude}]" },
        { type: "text", text: "<b>Loại địa điểm:</b> {location_type}" },
        { type: "text", text: "<b>Địa chỉ:</b> {location_address}" },
        {
          type: "text",
          text: "<b>Đánh giá:</b> {location_rating}/5 - {location_total_rating} lượt",
        },
        { type: "text", text: "<b>Số điện thoại:</b> {location_phone_number}" },
        { type: "text", text: "<b>Website:</b> {location_website}" },
        { type: "text", text: "<b>Ngày tạo:</b> {created_at}" },
        { type: "text", text: "<b>Cập nhật:</b> {updated_at}" },
      ],
      actions: [
        { title: "Thêm địa điểm", id: "action-add-info", className: "esri-icon-add" },
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
    geometryType: "point",
    spatialReference: { wkid: 4326 },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        color: [0, 153, 51],
        outline: { color: [255, 255, 255], width: 1 },
      },
    },
    outFields: ["*"],
  });
  map.add(featureLayer);

  // Tạo editor
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
              { type: "field", fieldName: "location_id", label: "ID" },
              { type: "field", fieldName: "location_name", label: "Tên địa điểm" },
              { type: "field", fieldName: "location_type", label: "Loại địa điểm" },
              { type: "field", fieldName: "location_address", label: "Địa chỉ" },
              { type: "field", fieldName: "location_description", label: "Mô tả" },
              { type: "field", fieldName: "location_phone_number", label: "Số điện thoại" },
              { type: "field", fieldName: "location_website", label: "Website" },
            ],
          },
        },
      ],
    });

    reactiveUtils.when(
      () => editor.viewModel.state === "ready",
      () => {
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
        title: "{location_name} : {location_id}",
        content: [
          { type: "text", text: "<b>Tọa độ: </b> [{location_longitude}, {location_latitude}]" },
          { type: "text", text: "<b>Loại địa điểm:</b> {location_type}" },
          { type: "text", text: "<b>Địa chỉ:</b> {location_address}" },
          {
            type: "text",
            text: "<b>Đánh giá:</b> {location_rating}/5 - {location_total_rating} lượt",
          },
          { type: "text", text: "<b>Số điện thoại:</b> {location_phone_number}" },
          { type: "text", text: "<b>Website:</b> {location_website}" },
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
        view.popup.visible = false;
        editor.startUpdateWorkflowAtFeatureEdit(view.popup.selectedFeature);
        view.ui.add(editor, "top-right");
      }
    }
  );

  // Focus vào tour trên map và mở popup khi click vào item trên navbar
  tourRight.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (navbarAction) {
        tourItems.forEach((innerItem) => {
          innerItem.classList.remove("tours-item-active");
        });
        item.parentElement.classList.add("tours-item-active");

        const location = locations[index];

        // Sử dụng featureLayer.queryFeatures để tìm đối tượng trong featureLayer
        featureLayer
          .queryFeatures({
            where: `location_id = '${location._id}'`,
            returnGeometry: true,
            outFields: ["*"],
          })
          .then((queryResult) => {
            if (queryResult.features.length > 0) {
              const feature = queryResult.features[0];
              console.log(feature.geometry);

              const center = feature.geometry;
              const zoomLevel = 14;

              view.goTo({ target: center, zoom: zoomLevel }).then(() => {
                view.popup.open({
                  features: [feature],
                  location: center,
                });
              });
            } else {
              console.warn(
                `Không tìm thấy đối tượng với location_id = '${location.location._id}' trong featureLayer.`
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
    if (navbarAction) {
      view.hitTest(event).then((response) => {
        const results = response.results;
        if (results.length > 0) {
          const resultFilter = results.filter((result) => result.layer === featureLayer)[0];
          const graphic = resultFilter?.graphic;
          if (graphic) {
            const locationId = graphic.attributes.location_id;
            tourItems.forEach((item, index) => {
              if (locations[index]._id === locationId) {
                tourItems.forEach((innerItem) => {
                  innerItem.classList.remove("tours-item-active");
                });
                tourItems[index].classList.add("tours-item-active");
                const container = document.querySelector(".tours-list");
                container.scrollTop = tourItems[index].offsetTop - container.offsetTop;
                const center = graphic.geometry;
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

  var list_points = [];
  var string_points = "";

  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  view.popup.autoOpenEnabled = true; // Disable the default popup behavior
  view.on("click", function (event) {
    view.hitTest(event).then(function (hitTestResults) {
      if (hitTestResults.results) {
        list_points.push([event.mapPoint.longitude, event.mapPoint.latitude]);
        string_points += "[" + event.mapPoint.longitude + ", " + event.mapPoint.latitude + "],";
        copyTextToClipboard(
          '{"longitude":' +
            event.mapPoint.longitude +
            ', "ladtitude":' +
            event.mapPoint.latitude +
            "},"
        );
      }
    });
  });
});
