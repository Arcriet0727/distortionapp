# Relativistic Distortion App
On this page, there's a demo version of the distortionapp principle. Users can access the GitHub Pages link on the right to understand the principle of relativistic distortion effects based on the Lookalike Sphere. The "stroke" checkbox allows users to display strokes, and the "image" checkbox allows users to display panoramic images to simulate real-scene distortion effects. The "outside" checkbox provides an external view of the Lookalike Sphere, letting users see how the Lookalike Sphere deforms in different speed directions.

Additionally, there are two folders: "perspective transformation" and "Dynamic App".

perspective transformation: This contains code for processing static photos into equirectangular projection images. Currently, due to computational resource constraints, it's housed in its own folder. The code for perspective transformation of video streams is still under development.

Dynamic App: This is the Relativistic Distortion App without video streams. It can adjust the Lookalike Sphere dynamically based on the user's GPS speed, direction of movement, and gyroscope, achieving a distortion effect. However, since the perspective transformation processing for the video stream is not yet complete, pre-transformed static images are used as textures. Thus, it cannot be considered a full Relativistic Distortion App. Once the video stream processing method is developed, merging it with the code in this folder will result in a complete Relativistic Distortion App. Note that the code in this folder uses the math.js library, so please check if the HTML file has called this library before merging features.

TO DO: Apply a perspective transformation to the video stream and it needs to be mirrored/flipped.
Set an initial state for when geolocation returns a null value in the dynamic app (speed=0, heading=0).
