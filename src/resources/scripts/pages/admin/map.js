// import utils
import { convertDateToHourDayMonthYear } from "/format.js";
import { getLocations, getTours, getLinesOfTour } from "/fetch.js";

// get data
const locations = await getLocations();
const tours = await getTours();
let streets;
// arcgis
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Editor",
  "esri/layers/FeatureLayer",
  "esri/core/reactiveUtils",
], (Map, MapView, Graphic, GraphicsLayer, Editor, FeatureLayer, reactiveUtils, Polyline) => {
  // create map
  const map = new Map({
    basemap: "streets-relief-vector",
  });

  // enable mouse event on map
  map.on("load", function () {
    map.graphics.enableMouseEvents();
  });

  // create view
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [108.45689899086118, 11.929765013176969],
    zoom: 15,
    highlightOptions: {
      color: "rgb(123, 211, 234)",
    },
  });

  // create graphic layer
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
  map.add(graphicsLayer);

  // create feature layer
  const featureLayer = new FeatureLayer({
    fields: [
      {
        type: "string",
        name: "location_id",
        alias: "ID",
      },
      {
        type: "double",
        name: "location_longitude",
        alias: "Kinh độ",
      },
      {
        type: "double",
        name: "location_latitude",
        alias: "Vĩ độ",
      },
      {
        type: "string",
        name: "location_name",
        alias: "Tên địa điểm",
      },
      {
        type: "string",
        name: "location_type",
        alias: "Loại địa điểm",
      },
      {
        type: "string",
        name: "location_address",
        alias: "Địa chỉ",
      },
      {
        type: "string",
        name: "location_description",
        alias: "Mô tả",
      },
      {
        type: "string",
        name: "location_rating",
        alias: "Đánh giá",
      },
      {
        type: "string",
        name: "location_total_rating",
        alias: "Số lượt đánh giá",
      },
      {
        type: "string",
        name: "location_phone_number",
        alias: "Số điện thoại",
      },
      {
        type: "string",
        name: "location_website",
        alias: "Website",
      },
      {
        type: "string",
        name: "updated_at",
        alias: "Ngày cập nhật",
      },
      {
        type: "string",
        name: "created_at",
        alias: "Ngày tạo",
      },
    ],
    popupTemplate: {
      title: "{location_name} : {location_id}",
      content: [
        {
          type: "text",
          text: "<b>Tọa độ: </b> [{location_longitude}, {location_latitude}]",
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
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      },
    },
    outFields: ["*"],
  });
  map.add(featureLayer);

  // create editor
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
              {
                type: "field",
                fieldName: "location_id",
                label: "ID",
              },
              {
                type: "field",
                fieldName: "location_name",
                label: "Tên địa điểm",
              },
              {
                type: "field",
                fieldName: "location_type",
                label: "Loại địa điểm",
              },
              {
                type: "field",
                fieldName: "location_address",
                label: "Địa chỉ",
              },
              {
                type: "field",
                fieldName: "location_description",
                label: "Mô tả",
              },
              {
                type: "field",
                fieldName: "location_phone_number",
                label: "Số điện thoại",
              },
              {
                type: "field",
                fieldName: "location_website",
                label: "Website",
              },
            ],
          },
        },
      ],
    });

    // view.ui.add(editor, { position: "top-right" });
    function editLocation() {
      // If the Editor's activeWorkflow is null, make the popup not visible
      if (!editor.activeWorkFlow) {
        view.popup.visible = false;

        // Call the Editor update feature edit workflow
        editor.startUpdateWorkflowAtFeatureEdit(view.popup.selectedFeature);
        view.ui.add(editor, "top-right");
      }

      // Remove the editor widget from the display when the state of the editor's viewModel is "ready"
      // and re-add the popup. Ready state indicates that the initial editor panel displays and is ready
      // for editing.

      // The editor displays a panel to select a feature to update if the user "backs" out of the current edit workflow.
      // This is not needed in this specific workflow as the feature is already selected from the popup.
      // The "ready" state indicates that this initial editor panel is active and was activated via the "back" button.

      reactiveUtils.when(
        () => editor.viewModel.state === "ready",
        () => {
          // Remove the editor and open the popup again
          view.ui.remove(editor);
          view.openPopup({
            fetchFeatures: true,
            shouldFocus: true,
          });
        }
      );
    }

    // Event handler that fires each time an action is clicked
    reactiveUtils.on(
      () => view.popup,
      "trigger-action",
      (event) => {
        if (event.action.id === "action-edit-info") {
          editLocation();
        }
      }
    );
  });

  let features;
  // Watch when the popup is visible
  reactiveUtils.watch(
    () => view.popup?.visible,
    (event) => {
      // Check the Editor's viewModel state, if it is currently open and editing existing features, disable popups
      if (editor.viewModel.state === "editing-existing-feature") {
        view.closePopup();
      } else {
        // Grab the features of the popup
        features = view.popup.features;
      }
    }
  );

  featureLayer.on("apply-edits", () => {
    // Once edits are applied to the layer, remove the Editor from the UI
    view.ui.remove(editor);

    // Iterate through the features
    features.forEach((feature) => {
      // Reset the template for the feature if it was edited
      feature.popupTemplate = {
        title: "{location_name} : {location_id}",
        content: [
          {
            type: "text",
            text: "<b>Tọa độ: </b> [{location_longitude}, {location_latitude}]",
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
      };
    });

    // Open the popup again and reset its content after updates were made on the feature
    if (features) {
      view.openPopup({
        features: features,
      });
    }

    // Cancel the workflow so that once edits are applied, a new popup can be displayed
    editor.viewModel.cancelWorkflow();
  });
});
