This is the code for handling perspective transformation. Note that this code is only effective for static images. For video streams, we are still developing a more compact processing method to make the app run more smoothly.
Issues in the program:
When mapping corresponding pixels, there are some blank spaces in the radial direction. To eliminate these gaps, the output image size can only be reduced to 90% of the original. This issue might be due to the way decimal points are calculated (?)
