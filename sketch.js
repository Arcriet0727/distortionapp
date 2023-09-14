let checkbox1;
let checkbox2;
let checkbox3;
let cam;
//let videoTexture;
let frameCounter = 0;
let baseAccX=0, baseAccY=0, baseAccZ=0;
let neutralaccX=0, neutralaccY=0, neutralaccZ=0;
let VelX=0;
let VelY=0;
let VelZ=0;
let VelC=2;
let phi=0;
let theta=0;
let radius=200;
let beta=0.8;
let gamma;
let textureImg;
let motion = false;


//if (typeof DeviceMotionEvent.requestPermission === 'function') {
//  document.body.addEventListener('click', function() {
  //  DeviceMotionEvent.requestPermission()
   //   .then(function() {
   //     console.log('DeviceMotionEvent enabled');

 //       motion = true;
 //     })
 //     .catch(function(error) {
 //       console.warn('DeviceMotionEvent not enabled', error);
 //     })
//  })
//} else {
  // motion = true;
//}

function preload() {
 textureImg = loadImage('preview.jpg');  
}

function setup() {  
 

  createCanvas(windowWidth, windowHeight, WEBGL); 
  
  //ANGLEsli=createSlider(-PI/2,PI/2,0,0.001); 
  //ANGLEsli.position(10,10);
  //ANGLEsli2=createSlider(0,2*PI,phi,0.001); 
  //ANGLEsli2.position(10,30);
  VelXsli=createSlider(-VelC,VelC,0,0.001); 
  VelXsli.position(10,50);
  VelYsli=createSlider(-VelC,VelC,0,0.001); 
  VelYsli.position(10,70);
  VelZsli=createSlider(-VelC,VelC,0,0.001); 
  VelZsli.position(10,90);
  checkbox1 = createCheckbox('stroke', false);
  checkbox1.position(10, 10);
  checkbox1.changed(checkEvent1);
  checkbox2 = createCheckbox('image', false);
  checkbox2.position(10, 30);
  checkbox2.changed(checkEvent2);
   checkbox3 = createCheckbox('outside', false);
  checkbox3.position(80, 10);
  checkbox3.changed(checkEvent3);
  //baseAccX = accelerationX;
  //baseAccY = accelerationY;
 // baseAccZ = accelerationZ;
     
 // let constraints = {
 //     video: {
  //    facingMode: {
  //         exact: "environment"
  //        }
 //      }
  //    };

//   cam = createCapture(constraints);

   //   cam.size(1750/9, 875/8);
   //   cam.hide(); 
  
   //   videoTexture = createGraphics(1000, 500);
camera(0, 0, 0, 0, 0, -1, 0, 1, 0); 
    noStroke();
  perspective(PI/3, width/height, 0.001,500);

 
}

function draw() {
  background(200); 

 // frameCounter++;
  
 // if (frameCounter == 4) {
 //   neutralaccX=accelerationX-baseAccX;
  //  neutralaccY=accelerationY-baseAccY;
  //  neutralaccZ=accelerationZ-baseAccZ;
 //   VelY += -neutralaccX * (deltaTime / 1000);  
  //  VelX += neutralaccY * (deltaTime / 1000);
  //  VelZ += -neutralaccZ * (deltaTime / 1000);

  //  frameCounter = 0;
  //}
 // theta=ANGLEsli.value(); 
 // phi=ANGLEsli2.value();    
  VelX=VelXsli.value(); 
  VelY=VelYsli.value();
  VelZ=VelZsli.value();

 beta=Math.sqrt(VelX*VelX+VelY*VelY+VelZ*VelZ)/VelC;
  if (beta==0)  {
      theta=0;
      } else {
    theta=Math.asin(VelY/(VelC*beta));
  }
  
   if (VelZ==0)  {
      if (VelX>0)  {
          phi=PI/2;
          } else {
        phi=(PI*3)/2;
      }
      } else {
        if (VelZ>0)  {
        phi=Math.atan(VelX/VelZ);
            } else {
          phi=PI+Math.atan(VelX/VelZ);
        }
  
  }
  
  
 
  gamma=1/Math.sqrt(1-beta*beta);
  
  //videoTexture.push();
 // videoTexture.background(255);
// videoTexture.image(cam, 3625/9, 3125/16);

 // videoTexture.pop();

  rotateY(phi);
rotateX(theta);
  scale(1/gamma, 1/gamma, 1);
  translate(0,0,radius*beta);
  rotateX(-theta);
  rotateY(-phi);
  //rotateX(-theta);
  //rotateY(-phi);
    
  sphere(radius);
//print(theta);
 // print(phi);
 // texture(textureImg);
}

 function checkEvent1() {
  if (this.checked()) {
    
    stroke(0);
  } else {
    
   noStroke();
  }
} 

function checkEvent2() {
  if (this.checked()) {
 
    texture(textureImg);
  } else {
    
fill(255);
  }
}

function checkEvent3() {
  if (this.checked()) {
   
   camera(600, 0, 0, -1, 0, 0, 0, 1, 0);  
  } else {
    

     camera(0, 0, 0, 0, 0, -1, 0, 1, 0); 
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
