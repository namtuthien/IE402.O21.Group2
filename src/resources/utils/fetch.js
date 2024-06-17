const getLocations = async () => {
  try {
    const res = await fetch(`/api/location/getLocations`);

    if (!res.ok) alert("404");

    const jsonRes = await res.json();
    const data = jsonRes.locations;

    return data;
  } catch (err) {
    console.log(err);
    alert("error");
  }
};
const getTours = async () => {
  try {
    const res = await fetch(`/api/tour/getTours`);
    if (!res.ok) alert("404");
    const jsonRes = await res.json();
    const data = jsonRes.newTours;
    return data;
  } catch (err) {
    console.log(err);
    alert("error");
  }
};
const getLinesOfTour = async (routes) => {
  try {
    const res = await fetch(`/api/route/getTourRoutes`);
    if (!res.ok) alert("404");
    const jsonRes = await res.json();
    const data = { tourRoutes: jsonRes.tourRoutes, tours: jsonRes.tours };
    return data;
  } catch (err) {
    console.log(err);
    alert("error");
  }
};
export { getLocations, getTours, getLinesOfTour };
