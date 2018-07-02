
/******Function to Work When File is Loaded*********/
 window.onload = function() {
        var mySpan = document.createElement("div");
        mySpan.innerHTML = "";
		mySpan.id = "container";
        document.body.appendChild(mySpan);



		loadExperiment();

		}
      
/*******Global Variables*****************/
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var container = document.getElementById( 'container' );
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 500;
var angle=90,total=3;
var planeGeo,planeGeo1;
var planeBottom,planeFront,planeLeft,planeRight,planeTop;
var camera, scene, renderer;
var halfSphere;
var loader1,loader2;
var toggle,toggle1;
var cameraControls;
var verticalMirror,verticalMirror45,verticalMirror452,verticalMirror60,verticalMirror602,verticalMirror72,verticalMirror90,verticalMirror120,verticalMirror180;
var sphereGroup, smallSphere;
var imported,g ,file , file1;

/************FILE to Import New Version of Threejs File**************/
/*
imported = document.createElement('script');
imported.src = 'http://threejs.org/build/three.js';
document.head.appendChild(imported); 
//document.getElementsByTagName('head')[0].appendChild(imported);

file = document.createElement('script');
file.src = 'https://threejs.org/examples/js/controls/OrbitControls.js';
document.head.appendChild(file); 
//document.getElementsByTagName('head')[0].appendChild(file);

file1 = document.createElement('script');
file1.src = 'https://threejs.org/examples/js/objects/Reflector.js';
document.head.appendChild(file1); 
//document.getElementsByTagName('head')[0].appendChild(file1);
/*************Initialising help Content***********/








function initialiseHelp()
{
	helpContent="";
    helpContent = helpContent + "<h2>Help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows how multiple images can be formed using hinged mirrors</p>";
    helpContent = helpContent + "<h3>Animation Instructions</h3>";
    helpContent = helpContent + "<p>The following controls works as follows-</p>";
    helpContent = helpContent + "";
    helpContent = helpContent + "<h4>There are 10 options shown on the side of the screen. You can check the option too change the angle of the mirror.</h4>";
    helpContent = helpContent + "<p><b>1.45° - </b>The angle between the mirrors can becomes 45°.</p>";
    helpContent = helpContent + "<p><b>2.60° - </b>The angle between the mirrors can becomes 60°.</p>";
    helpContent = helpContent + "<p><b>3.72° - </b>The angle between the mirrors can becomes 72°.</p>";
    helpContent = helpContent + "<p><b>4.90° - </b>The angle between the mirrors can becomes 90°.</p>";
    helpContent = helpContent + "<p><b>5.120° - </b>The angle between the mirrors can becomes 120°.</p>";
    helpContent = helpContent + "<p><b>6.180° - </b>The angle between the mirrors can becomes 180°.</p>";
    helpContent = helpContent + "<br><br><br>";
	helpContent = helpContent + "<p>You can just click the option and count the no. of images</p>";
	helpContent = helpContent + "<p>The no. of images formed can be shown at the bottom of the controls.</p>";
   PIEupdateHelp(helpContent);
}
/***************Initialise the Information Content***********/
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Multiple Images Using Hinged Mirror</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows the formation of multiple iamges using two mirrors placed at different angles.</p>";
    infoContent = infoContent + "<p>In this experiment, we will put two plane mirrors in different angles.</p>";
    infoContent = infoContent + "<p>The object is placed in the middle of the mirror plane.</p>";
    infoContent = infoContent + "<p>When we saw the object in the mirror at different angles, we found that no. of  images are formed.</p>";
    infoContent = infoContent + "<p>The incident ray is directed towards mirror and reflected ray is coming from mirror.</p>";
    infoContent = infoContent + "<p>On increasing reflected ray and incident ray, when they meet at a point, then image  o 	 f object is formed.</p>";
    infoContent = infoContent + "<p>Now you can count the number of images of object are formed.</p>";
	infoContent = infoContent + "<br>";
	infoContent = infoContent + "<p>The formula for calculating the no. of images formed by two plane mirrors  when they placed at an angle are -</p>";
	infoContent = infoContent + "<h2>No. of Images = (360 / N ) - 1</h2>";
	infoContent = infoContent + "<p>where N is the angle in degree on which two mirror are placed.";

	PIEupdateInfo(infoContent);
}
/***********Initialising Scene*************/
function initialiseScene()
{
   mySceneTLX = 0.0;
   mySceneTLY = 4.0;
   mySceneBRX = 4.0;
   mySceneBRY = 0.0;
   mySceneW   = (mySceneBRX - mySceneTLX);
   mySceneH   = (mySceneTLY - mySceneBRY);
   myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
   myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
  }
/************Initialising Other Other variables**************/
function initialiseOtherVariables()
{
	id = "name";
    gravityX = 0.0;
    gravityY = -9.8;
   rightB=mySceneBRX;
    leftB=mySceneTLX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}
/**********Initialising Controls*************/
function initialiseControls()
{
    PIEaddInputCheckbox("45°", false, angle45);
    PIEaddInputCheckbox("60°", false, angle60);
    PIEaddInputCheckbox("72°", false, angle72);
    PIEaddInputCheckbox("90°", true, angle90);
	PIEaddInputCheckbox("120°", false, angle120);
	PIEaddInputCheckbox("180°", false, angle180);
	
	
	PIEaddInputSlider("Angle",90,12,0,200,angle);
	PIEaddInputSlider("No. of Images",3,12,0,10,total);
}

/************ Main Logic ************?

/****Function to add 45° angle degree Mirror******************/
var a = ["45°" , "60°" , "72°" , "90°" , "120°",  "180°"];

function angle45()
{
	for(var i=0 ; i<10; i++){
        if(i != 0){
            PIEchangeInputCheckbox(a[i], false);
        }
    }
    PIEchangeInputCheckbox(a[0], true);
 	mirrorClear();

	
	PIEchangeInputSlider("Angle",45);
	PIEchangeInputSlider("No. of Images",7);


	var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
			verticalMirror45 = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );
				verticalMirror45.rotateY(  Math.PI/ 1.33 );
				//verticalMirror45.rotateY(  Math.PI/ 4 );
			//	verticalMirror45.rotateX(Math.PI	/2  );
				verticalMirror45.position.x = -15;
				verticalMirror45.position.y = 50;
				verticalMirror45.position.z =  -15;
				scene.add( verticalMirror45 );
				//PIEaddElement(verticalMirror);

				
	var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
			verticalMirror452 = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );
				verticalMirror452.rotateY(  Math.PI/ 1.33 );
				//verticalMirror45.rotateY(  Math.PI/ 4 );
			//	verticalMirror45.rotateX(Math.PI	/2  );
				verticalMirror452.position.x = -15;
				verticalMirror452.position.y = 50;
				verticalMirror452.position.z =  -15;
				scene.add( verticalMirror452 );
				//PIEaddElement(verticalMirror);			
			
		
			/*****First Mirror*********/
				verticalMirror.position.x = 0 ;
				verticalMirror.position.y = 50;
				verticalMirror.position.z = - 50;
				


				
	halfSphere.position.y = 7.5 + 15 * Math.sin( Math.PI / 180 * 30 );
	halfSphere.position.x = -5.5 ;
	halfSphere.position.z = -25.5 ;



		
	scene.rotation.y =  0 ;
	scene.rotation.y =  - Math.PI / 2.5 ;
							
}
/**********End *************/
/****Function to add 60° angle degree Mirror******************/

function angle60()
{
	for(var i=0 ; i<10; i++){
        if(i != 1){
            PIEchangeInputCheckbox(a[i], false);
        }
    }
    PIEchangeInputCheckbox(a[1], true);
	PIEchangeInputSlider("Angle",60);
	PIEchangeInputSlider("No. of Images",5);


 mirrorClear();

	
	var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
			 verticalMirror60 = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );

				verticalMirror60.rotateY(Math.PI / 1.5 );
				verticalMirror60.position.x = -25;
				verticalMirror60.position.y = 50;
				verticalMirror60.position.z =  -7;
				scene.add( verticalMirror60 );


	
	var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
			 verticalMirror602 = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );

				verticalMirror602.rotateY(Math.PI / 1.5 );
				verticalMirror602.position.x = -25;
				verticalMirror602.position.y = 50;
				verticalMirror602.position.z =  -7;
				scene.add( verticalMirror602 );
				
	
				
			/*****First Mirror*********/
				verticalMirror.position.x = 0;
				verticalMirror.position.y = 50;
				verticalMirror.position.z = - 50;
				

				
	halfSphere.position.y = 7.5 + 15 * Math.sin( Math.PI / 180 * 30 );
	halfSphere.position.x = 10.5 ;
	halfSphere.position.z = -15.5 ;
	
	
			scene.rotation.y =  0 ;
			scene.rotation.y =  - Math.PI / 2.5;
					
	}
/**********End *************/




/****Function to add 72° angle degree Mirror******************/
function angle72()
{
	for(var i=0 ; i<10; i++){
        if(i != 2){
            PIEchangeInputCheckbox(a[i], false);
        }
    }
    PIEchangeInputCheckbox(a[2], true);
	PIEchangeInputSlider("Angle",72);
	PIEchangeInputSlider("No. of Images",4);

	
	mirrorClear();
		
	var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
			 verticalMirror72 = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );

				verticalMirror72.rotateY(  Math.PI / 1.66 );
				//verticalMirror72.rotateY(  Math.PI / 2.4 );
			//	verticalMirror72.rotateX(Math.PI	/2  );
				verticalMirror72.position.x = -25;
				verticalMirror72.position.y = 50;
				verticalMirror72.position.z =  -5;
				scene.add( verticalMirror72 );
				//PIEaddElement(verticalMirror);


			/*****First Mirror*********/
				verticalMirror.position.x = 10;
				verticalMirror.position.y = 50;
				verticalMirror.position.z = - 50;
				

			
	halfSphere.position.y = 7.5 + 15 * Math.sin( Math.PI / 180 * 30 );
	halfSphere.position.x = 10.5 ;
	halfSphere.position.z = -10.5 ;
	

	scene.rotation.y =  0 ;
	scene.rotation.y =  - Math.PI /3 ;
}
/**********End *************/




/****Function to add 90° angle degree Mirror******************/

function angle90()
{
	for(var i=0 ; i<10; i++){
        if(i != 3){
            PIEchangeInputCheckbox(a[i], false);
        }
    }
    PIEchangeInputCheckbox(a[3], true);
	PIEchangeInputSlider("Angle",90);
	PIEchangeInputSlider("No. of Images",3);
	mirrorClear();

		var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
			 verticalMirror90 = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );
				verticalMirror90.rotateY(  Math.PI/2 );
			
				verticalMirror90.position.x = -50;
				verticalMirror90.position.y = 50;
				//verticalMirror.position.z =  -10;
				scene.add( verticalMirror90 );
				//PIEaddElement(verticalMirror);

				
			/*****First Mirror*********/
				verticalMirror.position.x = 0;
				verticalMirror.position.y = 50;
				verticalMirror.position.z = - 50;
				


		halfSphere.position.y = 7.5 + 15 * Math.sin( Math.PI / 180 * 30 );
		halfSphere.position.x = 10.5 ;
		halfSphere.position.z = 0;


			scene.rotation.y =  0 ;
			scene.rotation.y =  - Math.PI /4 ;
					
}
/**********End *************/




/****Function to add 120° angle degree Mirror******************/

function angle120()
{
	for(var i=0 ; i<10; i++){
        if(i != 4){
            PIEchangeInputCheckbox(a[i], false);
        }
    }
    PIEchangeInputCheckbox(a[4], true);
	PIEchangeInputSlider("Angle",120);
	PIEchangeInputSlider("No. of Images",2);

 mirrorClear();

	var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
			verticalMirror120 = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );

				verticalMirror120.rotateY(  Math.PI/ 3);
			//	verticalMirror.rotateX(Math.PI	/2  );
				verticalMirror120.position.x = -50;
				verticalMirror120.position.y = 50;
				verticalMirror120.position.z =  -7;
				scene.add( verticalMirror120 );
				//PIEaddElement(verticalMirror);

			/*****First Mirror*********/
				verticalMirror.position.x = 25;
				verticalMirror.position.y = 50;
				verticalMirror.position.z = - 50;
				
					
	halfSphere.position.y = 7.5 + 15 * Math.sin( Math.PI / 180 * 30 );
	halfSphere.position.x = 10 ;
	halfSphere.position.z = 15 ;
	



		scene.rotation.y =  0 ;
		scene.rotation.y =  - Math.PI / 6 ;
	
	}
	/**********End *************/




/****Function to add 180° angle degree Mirror******************/

function angle180()
{
	for(var i=0 ; i<10; i++){
        if(i != 5){
            PIEchangeInputCheckbox(a[i], false);
        }
    }
    PIEchangeInputCheckbox(a[5], true);
 	PIEchangeInputSlider("Angle",180);
	PIEchangeInputSlider("No. of Images",1);

	mirrorClear();
	var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
			 verticalMirror180 = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );

				//verticalMirror180.rotateY(  Math.PI);
			//	verticalMirror180.rotateX(Math.PI	/2  );
				verticalMirror180.position.x = -50;
				verticalMirror180.position.y = 50;
				verticalMirror180.position.z =  -50;
				scene.add( verticalMirror180 );

				//scene.remove("toggle");
				
				
				
				/********First Mirror***********/
				verticalMirror.position.x = 50.5;
				verticalMirror.position.y = 50;
				verticalMirror.position.z = - 50;		
				
	halfSphere.position.y = 7.5 + 15 * Math.sin( Math.PI / 180 * 30 );
	halfSphere.position.x = 0 ;
	halfSphere.position.z = 10 ;
	
				
				
scene.rotation.y =  0 ;
	
}
/**********End *************/


/******Function  To clear The miroor on loading New Mirror**********/
function mirrorClear()
{
	scene.remove(verticalMirror45);
	scene.remove(verticalMirror452);
	scene.remove(verticalMirror60);
	scene.remove(verticalMirror602);
	scene.remove(verticalMirror72);
	scene.remove(verticalMirror90);
	scene.remove(verticalMirror120);
	scene.remove(verticalMirror180);
	
}




/******Function Call On Load Experiment****************/
function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;
	   initialiseInfo();
	   initialiseHelp();
       initialiseScene();
	   PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);

   PIEsetExperimentTitle("Multiple Images with Hinged Mirrors");
	PIEsetDeveloperName("Naval Dhoot");
	
	
	
	initialiseControls();

	
	/********Table to fill Noo. of Images as Count*****************/
	//PIEcreateTable("Input Table",7,2,false);
	/*PIEsetRowInput(1, 10, "45°");
    PIEsetRowInput(2, 10, "60°");
    PIEsetRowInput(3, 10, "72°");
    PIEsetRowInput(4, 10, "90°");
    PIEsetRowInput(5, 10, "120°");
    PIEsetRowInput(6, 10, "180°");

	PIEsetColumnInput(1, 20, "")
	var headerRow=["Angle", "No. of Images",];
    PIEupdateTableRow(0, headerRow);
	*/
	init();
PIEsetAreaOfInterest(10,10, -1,-8);	
	animate();
	
	
	
	}
function init()
{

				var container = document.getElementById( 'container' );

				// renderer
			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( WIDTH, HEIGHT );
				container.appendChild( renderer.domElement );
				// scene
				scene = new THREE.Scene();
				scene.background = new THREE.Color("red");
				// camera
			camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
				camera.position.set( 0, 75, 160 );
			
			
			camera.useQuaternion = true;
				cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
				cameraControls.target.set( 0, 40, 0);
				cameraControls.maxDistance = 400;
				cameraControls.minDistance = 10;
			cameraControls.update();
				
				//PIEaddElement(scene);
				PIEaddElement(camera);
			planeGeo = new THREE.PlaneBufferGeometry( 200.1, 200.1 );
				planeGeo1 = new THREE.PlaneBufferGeometry( 200.1, 100.1 );

				
				
				
				// reflectors/mirrors
/*
				var geometry = new THREE.CircleBufferGeometry( 40, 64 );
				var groundMirror = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x777777,
					recursion: 1
				} );
				groundMirror.position.y = 0.5;
				groundMirror.rotateX( - Math.PI / 2 );
				scene.add( groundMirror );
*/

				var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
				
				verticalMirror = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );
				verticalMirror.position.y = 50;
				verticalMirror.position.z = - 50;
				scene.add( verticalMirror );
				//PIEaddElement(verticalMirror);
			
/*
			var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
				var verticalMirror = new THREE.Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );
				verticalMirror.rotateY(  Math.PI/3);
			//	verticalMirror.rotateX(Math.PI	/2  );
				verticalMirror.position.x = -50;
				verticalMirror.position.y = 50;
				verticalMirror.position.z =  -10;
				scene.add( verticalMirror );
				//PIEaddElement(verticalMirror);

	*/			
				
			
				
				sphereGroup = new THREE.Object3D();
				scene.add( sphereGroup );
				//PIEaddElement(sphereGroup);
			
				var geometry = new THREE.CylinderGeometry( 0.1, 15 * Math.cos( Math.PI / 180 * 30 ), 0.1, 24, 1 );
				var material = new THREE.MeshPhongMaterial( { color: 0xffffff, emissive: 0x444444 } );
				var sphereCap = new THREE.Mesh( geometry, material );
				sphereCap.position.y = -15 * Math.sin( Math.PI / 180 * 30 ) - 0.05;
				//sphereCap.rotateX(-Math.PI);

				var geometry = new THREE.SphereGeometry( 15, 24, 24, Math.PI / 2, Math.PI * 2, 0, Math.PI / 180 * 120 );
				halfSphere = new THREE.Mesh( geometry, material );
				halfSphere.add( sphereCap );
				halfSphere.rotateX( - Math.PI / 180 * 135 );
				halfSphere.rotateZ( - Math.PI / 180 * 20 );
				halfSphere.position.y = 7.5 + 15 * Math.sin( Math.PI / 180 * 30 );
				halfSphere.position.x = 10.5 ;
				//halfSphere.position.z = -20.5 ;

				
				sphereGroup.add( halfSphere );

				var geometry = new THREE.IcosahedronGeometry( 5, 0 );
				var material = new THREE.MeshPhongMaterial( { color: 0xffffff, emissive: 0x333333, flatShading: true } );
				smallSphere = new THREE.Mesh( geometry, material );
				//scene.add(smallSphere);

				// walls
				planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
				planeTop.position.y = 100;
				planeTop.rotateX( Math.PI / 2 );
				scene.add( planeTop );
				//PIEaddElement(planeTop);
			
				planeBottom = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
				planeBottom.rotateX( - Math.PI / 2 );
				scene.add( planeBottom );
				//PIEaddElement(planeBottom);

				
				planeFront = new THREE.Mesh( planeGeo1, new THREE.MeshPhongMaterial( { color: 0x7f7fff } ) );
				planeFront.position.z = 100;
				planeFront.position.y = 50;
				planeFront.rotateY( Math.PI );
				scene.add( planeFront );
				//PIEaddElement(planeFront);
				
				planeRight = new THREE.Mesh( planeGeo1, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ) );
				planeRight.position.x = 100;
				planeRight.position.y = 50;
				planeRight.rotateY( - Math.PI / 2 );
				scene.add( planeRight );
				//PIEaddElement(planeRight);

				
				planeLeft = new THREE.Mesh( planeGeo1, new THREE.MeshPhongMaterial( { color: 0xfff110 } ) );
				planeLeft.position.z = 0;
				planeLeft.position.y = 50;
				planeLeft.position.x = -100;
				planeLeft.rotateY( Math.PI / 2 );
				scene.add( planeLeft );
				// lights
				
				var planeBack = new THREE.Mesh( planeGeo1, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
				planeBack.position.x = 0;
				planeBack.position.y = 50;
				planeBack.position.z =  -100;
				//planeBack.rotateY( Math.PI / 2 );
				scene.add( planeBack );
				
				var mainLight = new THREE.PointLight( 0xcccccc, 1.5, 250 );
				mainLight.position.y = 60;
				scene.add( mainLight );
				//PIEaddElement(mainLight);
				
				var greenLight = new THREE.PointLight( 0x00ff00, 0.25, 1000 );
				greenLight.position.set( 550, 50, 0 );
				scene.add( greenLight );
				//PIEaddElement(greenLight);
		
				var redLight = new THREE.PointLight( 0xff0000, 0.25, 1000 );
				redLight.position.set( - 550, 50, 0 );
				scene.add( redLight );
				//PIEaddElement(redLight);
				
				var blueLight = new THREE.PointLight( 0x7f7fff, 0.25, 1000 );
				blueLight.position.set( 0, 50, 550 );
				scene.add( blueLight );
				//PIEaddElement(blueLight);
PIEsetAreaOfInterest(10,10, -12,-8);
			
				angle90();
	
			
			}

			function animate() {


				requestAnimationFrame( animate );

				renderer.render(scene, camera);

			}
			
		
function updateExperimentElements(t, dt)
{





}	