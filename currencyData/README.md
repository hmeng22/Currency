## Add new source images

1. Put images into a folder at path A
2. Modify config.js, set sourceImagesDirectory to path A
3. (node index.js generate) Run processSourceImages.js to generate images
4. (node index.js store A) Run storeImages.js with the parameter path A to upload images into Amazon
5. Or (node index.js listi) Run outputStoredImages.js to output the list of stored images
6. Find outputs/storedImages-file.json (Add [] as the root element)


## Add new markers

1. Find images folder at path B
2. (node index.js marker B) Run storeMarkers.js to upload images into Vuforia
3. Wait until the processing is done
4. Uploaded Images will be moved into another folder named with datename
5. Check Vuforia Target Manager. Wait for the processing.
6. Check outputs/storedMarkers-file.json (Add [] as the root element)
7. (node index.js listm C) Run listStoredMarkers.js to output the list of markers
8. (node index.js ldm) Run listDuplicates.js to output the list of duplicated markers
