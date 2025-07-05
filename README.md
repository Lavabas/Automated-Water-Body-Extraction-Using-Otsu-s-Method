# Automated-Water-Body-Extraction-Using-Otsu's-Method
🛰️ Water Body Detection using Sentinel-2 and Otsu Thresholding in Google Earth Engine

Otsu's Thresholding is an automatic image thresholding method that determines the optimal cutoff value to separate two classes in a single-band image — typically foreground vs. background (in this case, water vs. non-water pixels in an NDWI image).

🧠 How It Works:
Otsu's method assumes that:
-The image contains two pixel classes with a bimodal histogram (e.g., water and land).
-It computes the threshold that minimizes the intra-class variance (i.e., the spread of pixel values within each class) or maximizes the between-class variance (i.e., separation between the two groups).

🛰️ In Earth Engine (NDWI-based Water Extraction):
NDWI image: Values typically range from -1 to +1

-Water: Higher NDWI values (e.g., > 0.3)
-Land: Lower NDWI values (e.g., < 0)

Otsu function:
-Automatically analyzes the NDWI histogram over your AOI.
-Finds the best threshold that separates water from non-water based on pixel distribution.

Output:
A single threshold value.
You use it with .gt(threshold) to create a binary water mask.

✅ Why Use Otsu for Water Detection?
1. No need to manually guess thresholds (which vary by location/season).
2. Adapts automatically based on local pixel distributions.
3. Works especially well in cloud-free, bimodal NDWI scenarios.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
This Google Earth Engine (GEE) script performs water body extraction for a selected Area in Colombo using Sentinel-2 Surface Reflectance imagery and Normalized Difference Water Index (NDWI). The script incorporates Otsu’s thresholding method to automatically classify water pixels and applies post-processing to reduce noise.

![image](https://github.com/user-attachments/assets/93f3ba8c-6cab-4bae-9bed-99fa8685d06c)

![ee-chart](https://github.com/user-attachments/assets/0caae038-a02f-430b-9acf-89c5fd3eda9a)

📌 Objective
To detect surface water bodies accurately by:
-Computing NDWI from Sentinel-2 bands
-Applying Otsu’s automatic threshold
-Cleaning speckles from the water mask

🗂️ Data Sources
Sentinel-2 Surface Reflectance: COPERNICUS/S2_SR_HARMONIZED
Otsu Thresholding Function: Provided by OEEL (users/OEEL/lib:loadAll)

🧠 Applications
1. Monitoring seasonal waterbody changes
2Supporting flood mapping
Surface water inventorying for water resource management



