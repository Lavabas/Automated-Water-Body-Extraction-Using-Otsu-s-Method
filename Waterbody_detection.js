// Center the map on the drawn geometry
Map.centerObject(geometry, 13);
Map.addLayer(geometry, {color: 'red'}, 'AOI');

// Load Sentinel-2 Surface Reflectance
var s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(geometry)
  .filterDate('2022-01-01', '2022-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .median()
  .clip(geometry);

// Calculate NDWI = (Green - NIR) / (Green + NIR)
var ndwi = s2.normalizedDifference(['B3', 'B8']).rename('ndwi');

// Display NDWI layer
Map.addLayer(ndwi, {
  min: -0.3, max: 0.5,
  palette: ['brown', 'beige', 'cyan', 'blue']
}, 'NDWI');

// Histogram for NDWI values
print(ui.Chart.image.histogram(ndwi, geometry, 10));

// Load OEEL's Otsu function
var oeel = require('users/OEEL/lib:loadAll');

// Get Otsu threshold for NDWI
var threshold = oeel.Image.OtsuThreshold(ndwi, 'ndwi');
print('Otsu NDWI Threshold:', threshold);

// Apply threshold to create water mask
var water = ndwi.gt(threshold).selfMask();
Map.addLayer(water, {palette: ['#084081']}, 'Water Mask (Raw)');

// Optional: clean small speckles
var connected = water.connectedComponents({
  connectivity: ee.Kernel.plus(1),
  maxSize: 128
});
var size = connected.select('labels').connectedPixelCount(128, true);
var water_clean = water.updateMask(size.gte(8));
Map.addLayer(water_clean, {palette: ['#2171b5']}, 'Water Mask (Cleaned)');

