let img;
let output;
let Y;

function preload() {
  img = loadImage('shishijiushishi.jpg');
}

function setup() {
  pixelDensity(1);
  createCanvas(4.5*0.9*img.width, 3*0.9*img.height);
  output = createImage(0.9*img.width, 0.9*img.height); // For some reasons, when outputting the image at the original scale, white spaces will appear along the longitude direction. This problem can only be eliminated by outputting * 0.9 (perhaps due to the definition of data types in JS) 

 noLoop();
  
}

function draw(){
  background(255);
for (let y = 0; y < (img.height); y++) {
    for (let x = 0; x < (img.width); x++) {
      let long = map(x, 0, (img.width), -2*PI/9,2*PI/9);  // Longitude at the input image
      let lat = map(y, 0, (img.height), -PI/6, PI/6);  // Latitude at the input image
      Y=Math.atan(Math.tan(lat)*Math.cos(long)); // The perspective transformation for a horizonal line in the space.
      let outx=map(long,-2*PI/9,2*PI/9,  0, output.width); //map back to the output
      let outy=map(Y, -PI/6,PI/6, 0, output.height);    
          
      let col = img.get(x, y); //update pixel
      output.set(outx, outy, col);
    }
  }
  output.updatePixels();
 let t1 = (width-output.width) / 2;
  let t2 = (height-output.height) / 2;
  image(output, t1, t2);
//save();  Active this function when you need to save the output.

  }
