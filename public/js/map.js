maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  center: data.geometry.coordinates,
  zoom: 8,
});


const marker = new maptilersdk.Marker({
  color: "#FF0000", // red color for visibility
  draggable: false,
})
  .setLngLat(data.geometry.coordinates)
  .addTo(map)


  const popupContent = `
  <div style="
    padding: 2px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 13px;
    color: #333;
    max-width: 150px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  ">
    <strong style="font-size: 14px;">${data.title}</strong>
    <p style="margin: 4px 0 0;"> 📌${data.location}, ${data.country}</p>
  </div>
`;

const popup = new maptilersdk.Popup({ offset: 25, closeButton: false })
  .setLngLat(data.geometry.coordinates)
  .setHTML(popupContent)
  .addTo(map); 