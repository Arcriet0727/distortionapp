let speed=0; 
let heading=0; 
let velhorx;
let velhory;
let neutralize;
let yawangle;
let pitchangle;
let rollangle;
let yaw;
let pitch;
let roll;
let initialNeutralize = null;
let velcanx=0;
let velcany=0;
let velcanz=0;
let speedtest=1.5;
let headingtest=50;
let PHI1=0;
let THETA1=180;
let cam;
let VelC;
let phi=0;
let theta=0;
let radius=200;
let beta;
let gamma;
let textureImg;
let motion = false;
let ff;

function preload() {
 textureImg = loadImage('changshi.jpg');  
}


function setup() {  
 
  createCanvas(windowWidth, windowHeight, WEBGL); 

VelCsli=createSlider(1,30,3,1); 
  VelCsli.position(10,50);
  ff = createP();
  ff.position(10,10);
      
 camera(0, 0, 0, 0, 0, -1, 0, 1, 0); 
    noStroke();
  //geolocation
 if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(updatePosition, positionError, {
      enableHighAccuracy: true
    });
  } else {
    alert("Geolocation is not supported by your browser");
  }
  
 perspective(PI/3, width/height, 0.001,500);
  //device orientation
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
  document.body.addEventListener('click', function() {
    DeviceOrientationEvent.requestPermission()
      .then(function() {
        console.log('DeviceOrientationEvent enabled');
      window.addEventListener('deviceorientation', handleOrientation);
        motion = true;
      })
      .catch(function(error) {
        console.warn('DeviceOrientationEvent not enabled', error);
      })
  })
} else {
   motion = true;
}
 
}

function draw() {
  background(200); 
 angleMode(DEGREES);
  VelC=VelCsli.value();

  velhorx=speed*sin(heading);//velocity coordinates in horizon frame
  velhory=speed*cos(heading);
let horvelmatrix=math.matrix([
  [velhorx],
  [velhory],
  [0]
]);
  //define the Yaw Pitch Roll matrix and calculate
  let YAW=math.matrix([
    [cos(-yaw),-sin(-yaw),0],
    [sin(-yaw),cos(-yaw),0],
    [0,0,1],
  ]);
    let ROLL=math.matrix([
    [cos(-roll),0,sin(-roll)],
    [0,1,0],
    [-sin(-roll),0,cos(-roll)],
  ]);
    let PITCH=math.matrix([
    [1,0,0],
    [0,cos(-pitch),-sin(-pitch)],
    [0,sin(-pitch),cos(-pitch)],
  ]);

 let result3=math.multiply(ROLL,math.multiply(PITCH,math.multiply(YAW,horvelmatrix)));
  // avoid the NaN output
 if (isNaN(result3.get([0,0])) || isNaN(result3.get([1,0])) || isNaN(result3.get([2,0]))) {
    velcanx=0;
   velcany=0;
   velcanz=0;
} else {
    velcanx = Number(result3.get([0,0]));
    velcany = -Number(result3.get([1,0]));
    velcanz = Number(result3.get([2,0]));
    
}
  angleMode(RADIANS);
  //transform to theta and phi
  let r=sqrt(velcanx*velcanx+velcany*velcany+velcanz*velcanz);
  THETA1=asin(-velcany/r);
   PHI1=PI+atan2(-velcanx,-velcanz);

  theta=THETA1; 
  phi=PHI1;     
  
  beta=speed/VelC;
  gamma=1/Math.sqrt(1-beta*beta);
  
// distorted lookalike sphere
  rotateY(phi);
  rotateX(theta);
  scale(1/gamma, 1/gamma, 1);
  translate(0,0,radius*beta);
  rotateX(-theta);
  rotateY(-phi);
   sphere(radius);
  texture(textureImg);

  ff.html(`c:${VelC}m/s`);
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updatePosition(position) {
  speed = position.coords.speed;  
  heading = position.coords.heading;  
}

function positionError(error) {
  console.error("Error getting geolocation:", error);
}

//set the horizon frame
function handleOrientation(event) {
  angleMode(DEGREES);
  let neutralize;
  if (initialNeutralize === null) {
    initialNeutralize = event.webkitCompassHeading;
  }

  neutralize = initialNeutralize;
 
  let yawangle=event.alpha;
  let pitchangle=event.beta;
  let rollangle=event.gamma;
 
  yaw1=yawangle;
    if (yaw1>=neutralize){
    yaw=yaw1-neutralize;
  }
  else{
    yaw=360-(neutralize-yaw1);
  }
  pitch=pitchangle;
  roll=rollangle;
}