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

export { getLocations };
