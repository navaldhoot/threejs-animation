/***********Global Variables*******/
var sum = 0;
var no = 1;
var total = 0;
var turn = 0;
var value = 0;
var t1=0,t2=0,t3=0,t4=0,t5=0,t6=0,t7=0,t8=0,t9=0,t10=0,t11=0,t12=0,t13=0,t14=0,t15=0,t16=0,t17=0;
var n1=n10=0;
var i=0;j=0;k=0;
 var x,y;
 var correct;
 
/************Function when any Button is Clicked***************/ 
function change(event)
{
	

var vector = new THREE.Vector3(( event.clientX/ window.innerWidth ) * 2 - 1, -( event.clientY/window.innerHeight ) * 2 +1);
    vector = vector.unproject(PIEcamera);
    var raycaster = new THREE.Raycaster(PIEcamera.position, vector.sub(PIEcamera.position).normalize());
    var intersects = raycaster.intersectObjects(PIEscene.children,true);
    for(var i=0;i<intersects.length;i++)
    {
		 	var c=intersects[i].object.name.charAt(0);
		 	if(c=='o' || c == 't' || c == 'h' )
		 		break;
	}
	if(c=='t')
	{
		Result();
	}
	else if(c=='o')
	{
		Next();
	}
	else if(c=='h')
	{
		Steps();
	}
}
/************Function to initialise Controls***************/
function initialiseControls()
{
  
   PIEaddInputSlider("First Number",x,12,0,198,x);
   PIEaddInputSlider("Second Number",y,12,0,198,y);
   PIEaddInputSlider("Result",x+y,12,0,198,x+y);

  }
/***********Function to initialise Help************/
  function initialiseHelp()
{
	helpContent="";
    helpContent = helpContent + "<h2>Help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows the addition of two numbers using money</p>";
    helpContent = helpContent + "<h3>Animation Instructions</h3>";
    helpContent = helpContent + "<p>The following controls works as follows-</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<h4>There are 3 options shown on the side of the screen. You can click on the iamge to implement the operation.</h4>";
       helpContent = helpContent + "<h4>1.Next</h4>";
          helpContent = helpContent + "<li>This option create the next two numbers.</li>";
          helpContent = helpContent + "<h4>2.Equal</h4>";
          helpContent = helpContent + "<li>This option can directly give the answer.</li>";
          helpContent = helpContent + "<h4>3.Steps</h4>";
          helpContent = helpContent + "<li>This option show the stpe by stpe of how addition of two sum can take place using money.</li>";
             helpContent = helpContent + "</ul>";
           helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>Start-Button&nbsp;&nbsp;:&nbsp;Starts The animation.</li>";
    helpContent = helpContent + "<li>Stop-Button&nbsp;&nbsp;:&nbsp;Stops The animation.</li>";
    helpContent = helpContent + "<li>Reset-Button&nbsp;&nbsp;:&nbsp;Sets  all element's position original values.</li>";
    helpContent = helpContent + "</ul>";
    PIEupdateHelp(helpContent);
}
/**************Function to initialise Controls**************/
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Two digit addition using Money Concept</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows the addition of two numbers using money</p>";
    infoContent = infoContent + "<p>In this experiment, we will show how addition of 2 numbers take place using money.</p>";
    infoContent = infoContent + "<p>We will be using 2 numbers in the form of money</p>";
    infoContent = infoContent + "<p>N1 is the first number in the addition and N2 is the second number in the addition.</p>";
    infoContent = infoContent + "<p>Finally result will be displayed at the bottom right corner.</p>";
     infoContent = infoContent + "<p>This is two digit addition.So,the maximum values for N1 and N2 are 99</p>";
      infoContent = infoContent + "<p>The sum will be 198 at maximum</p>";
   PIEupdateInfo(infoContent);
}
/*********** Function to initialise Scene***********/
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
/*********** Function to initialise Other Variables***********/
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
/************Function Called When Experiment Is loaded*****************/
function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;
	   initialiseInfo();
	   initialiseHelp();
       initialiseScene();
     //  initialiseOtherVariables();
     //  initialiseControls();
	//PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);

	   PIEsetExperimentTitle("Two Digit Addition Using Money");
PIEsetDeveloperName("Naval Dhoot");

texture = new THREE.ImageUtils.loadTexture( "background.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
var plane=new THREE.PlaneGeometry(180,80);
var p=new THREE.MeshBasicMaterial({map:texture});
var pl=new THREE.Mesh(plane,p);
pl.position.z=-100;
PIEaddElement(pl);
var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {
                southGeometry = new THREE.TextGeometry( "Next", { font: font, size: 1, height: 0.05, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });
                toggle = new THREE.Mesh(southGeometry ,southMaterial );
                toggle.position.set(12.5,7, 0) ;
                PIEaddElement( toggle );})

var texture = THREE.ImageUtils.loadTexture( 'next.png');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

	var geometry = new THREE.RingGeometry( 0.001, 1.5, 32 );
	var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
	box1 = new THREE.Mesh(geometry,material);
	box1.position.x  = 14;
	box1.position.y  = 5;
	box1.name = "one";
	PIEaddElement(box1);
	
var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {
                southGeometry = new THREE.TextGeometry( "Equal ", { font: font, size: 1, height: 0.05, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });
                toggle = new THREE.Mesh(southGeometry ,southMaterial );
                toggle.position.set(12.5,2, 0) ;
                PIEaddElement( toggle );})
	
	var texture = THREE.ImageUtils.loadTexture( 'answer.png');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	var geometry = new THREE.RingGeometry( 0.001, 1.5	, 32 );
	var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
	box2 = new THREE.Mesh(geometry,material);
	box2.position.x  = 14;
	box2.position.y  = 0;
	box2.name = "two";
	PIEaddElement(box2);
    	
var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {
                southGeometry = new THREE.TextGeometry( "Steps", { font: font, size: 1, height: 0.05, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });
                toggle = new THREE.Mesh(southGeometry ,southMaterial );
                toggle.position.set(12.5,-3, 0) ;
                PIEaddElement( toggle );})
    
	var geometry = new THREE.RingGeometry( 0.001, 1.5, 32 );
	var texture = THREE.ImageUtils.loadTexture( 'steps.jpg');
	var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
	box3 = new THREE.Mesh(geometry,material);
	box3.position.x  = 14;
	box3.position.y  = -5;
	box3.name = "hi";
	PIEaddElement(box3);
	window.addEventListener("click",change);


	addText();
addMoney();
MoreMoney();
initialiseControls();
PIEsetAreaOfInterest(10,10, -12,-8);

if(window.innerWidth>600 && window.innerWidth<1000)
{
	PIEsetAreaOfInterest(15,15,-15,-10);
}


if(window.innerWidth < 600)
	{
		
	PIEsetAreaOfInterest(25,25,-25,-25);
	}






}


function addDragControls()
{
	PIEdragElement(c1);
	PIEsetDrag(c1, c1Drag);
	PIEdragElement(c2);
	PIEsetDrag(c2, c2Drag);
	PIEdragElement(c3);
	PIEsetDrag(c3, c3Drag);
	PIEdragElement(c4);
	PIEsetDrag(c4, c4Drag);
	PIEdragElement(c5);
	PIEsetDrag(c5, c5Drag);
	PIEdragElement(c6);
	PIEsetDrag(c6, c6Drag);
	PIEdragElement(c7);
	PIEsetDrag(c7, c7Drag);
	PIEdragElement(c8);
	PIEsetDrag(c8, c8Drag);
	PIEdragElement(c9);
	PIEsetDrag(c9, c9Drag);
	PIEdragElement(c10);
	PIEsetDrag(c10, c10Drag);
	PIEdragElement(c11);
	PIEsetDrag(c11, c11Drag);
	PIEdragElement(c12);
	PIEsetDrag(c12, c12Drag);
	PIEdragElement(c13);
	PIEsetDrag(c13, c13Drag);
	PIEdragElement(c14);
	PIEsetDrag(c14, c14Drag);
	PIEdragElement(c15);
	PIEsetDrag(c15, c15Drag);
	PIEdragElement(c16);
	PIEsetDrag(c16, c16Drag);
	PIEdragElement(c17);
	PIEsetDrag(c17, c17Drag);
	PIEdragElement(c9);
	PIEsetDrag(c18, c18Drag);
	PIEdragElement(c1);
	PIEsetDrag(note1, c1Drag);
	PIEdragElement(c10);
	PIEsetDrag(note10, c10Drag);
	PIEdragElement(note1);
	PIEsetDrag(note1, note1Drag);
	PIEdragElement(note10);
	PIEsetDrag(note10, note10Drag);
	PIEdragElement(twen1);
	PIEsetDrag(twen1, twen1Drag);
	PIEdragElement(twen2);
	PIEsetDrag(twen2, twen2Drag);
	PIEdragElement(twen5);
	PIEsetDrag(twen5, twen5Drag);
	PIEdragElement(twen6);
	PIEsetDrag(twen6, twen6Drag);
	PIEdragElement(fif1);
	PIEsetDrag(fif1, fif1Drag);
	PIEdragElement(fif2);
	PIEsetDrag(fif2, fif2Drag);
}
t = 0;
function twen1Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	twen1.position.set(mbx,mby,mbz);
	if(mby <= -2 && mby >= -4)
	{
		if(tcount1 == 0)
		{
			value += 20;
			tcount1 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {
                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });
                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
	}
}
function twen2Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	twen2.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4)
	{
		if(tcount2 == 0)
		{
			value += 20;
			tcount2 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}
function twen5Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	twen5.position.set(mbx,mby,mbz);
	if(mby <= -2 && mby >= -4)
	{
		if(tcount3 == 0)
		{
			value += 20;
			tcount3 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}
function twen6Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	twen6.position.set(mbx,mby,mbz);
	if(mby <= -2 && mby >= -4)
	{
		if(tcount4 == 0)
		{
			value += 20;
			tcount4 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}
function fif1Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	fif1.position.set(mbx,mby,mbz);
	if(mby <= -2 && mby >= -4)
	{
		if(fcount1 == 0)
		{
			value += 50;
			fcount1 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}
function fif2Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	fif2.position.set(mbx,mby,mbz);
	if(mby <= -2 && mby >= -4)
	{
		if(fcount2 == 0)
		{
			value += 50;
			fcount2 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function note1Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	note1.position.set(mbx,mby,mbz);
	if(mby <= -2 && mby >= -4)
	{
		if(n1 == 0)
		{
			value += 10;
			n1 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function note10Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	note10.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(n10 == 0)
		{
			value += 10;
			n10 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c1Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c1.position.set(mbx,mby,mbz);
	if(mby <= -2 && mby >= -4)
	{
		if(t == 0)
		{
			value++;
			t = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c2Drag(element,newpos) {
	
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c2.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t1 == 0)
		{
			value++;
			t1 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c3Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c3.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t2 == 0)
		{
			value++;
			t2 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c4Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c4.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t3 == 0)
		{
			value++;
			t3 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c5Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c5.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t4 == 0)
		{
			value++;
			t4 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c6Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c6.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t5 == 0)
		{
			value++;
			t5 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c7Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c7.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t6 == 0)
		{
			value++;
			t6 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c8Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c8.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t7 == 0)
		{
			value++;
			t7 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c9Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c9.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t8 == 0)
		{
			value++;
			t8 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c10Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c10.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t9 == 0)
		{
			value++;
			t9 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c11Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c11.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t10 == 0)
		{
			value++;
			t10 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c12Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c12.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t11 == 0)
		{
			value++;
			t11 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c13Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c13.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t12 == 0)
		{
			value++;
			t12 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c14Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c14.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t13 == 0)
		{
			value++;
			t13 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c15Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c15.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t14 == 0)
		{
			value++;
			t14 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c16Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c16.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t15 == 0)
		{
			value++;
			t15 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c17Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c17.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t16 == 0)
		{
			value++;
			t17 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function c18Drag(element,newpos) {
	var mbx = newpos.x;
	var mby = newpos.y;
	var mbz = newpos.z;
	c18.position.set(mbx,mby,mbz);

	if(mby <= -2 && mby >= -4 )
	{
		if(t17 == 0)
		{
			value++;
			t17 = 1;
			PIEscene.remove(three);
			 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'red' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})

		}
		
		
		
	}

}

function showit() {
	var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry( value, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})
	
}
function Next() {
	
	addDragControls();
	value = 0;
	n1=n10=0;
	t=t1=t2=t3=t4=t5=t6=t7=t8=t9=t10=t11=t12=t13=t14=t15=t16=t17=0;
	fcount1=fcount2=0;
	tcount1=tcount2=tcount3=tcount4=0;
	
	
	//showit();
	
	i=0;j=0;k=0;
	total  = 0;
	count = 0;
	PIEscene.remove(one);
	PIEscene.remove(two);
	PIEscene.remove(three);
	
	
	
	
	if(turn != 0)
	{
		PIEscene.remove(newnote);
	}
	
	if(note.visible == true)
	{
		PIEscene.remove(note);
	}
	if(note1.visible == true)
	{
		PIEscene.remove(note1);
	}
	if(note10.visible == true)
	{
		PIEscene.remove(note10);
	}
	if(note19.visible == true)
	{
		note19.visible=false;
//		PIEscene.remove(note19);
	}
	
	if(twen1.visible == true)
	{
//		twen1.visible=false;
		PIEscene.remove(twen1);
	}
	if(twen2.visible == true)
	{
		//twen2.visible=false;
		PIEscene.remove(twen2);
	}
	if(twen5.visible == true)
	{
		//twen5.visible=false;
		PIEscene.remove(twen5);
	}
	if(twen6.visible == true)
	{
		//twen6.visible=false;
		PIEscene.remove(twen6);
	}
	if(twen9.visible == true)
	{
		twen9.visible=false;
	//	PIEscene.remove(twen9);
	}
	if(twen10.visible == true)
	{
		
		twen10.visible=false;
		//PIEscene.remove(twen10);
	}
	
	
	if(fif1.visible == true)
	{
		PIEscene.remove(fif1);
	}
	if(fif2.visible == true)
	{
		PIEscene.remove(fif2);
	}
	
	if(fif3.visible == true)
	{
		fif3.visible=false;
		//PIEscene.remove(fif3);
	}
	if(fif4.visible == true)
	{
		fif4.visible=false;
		//PIEscene.remove(fif3);
	}

	if(c1.visible == true)
	{
		PIEscene.remove(c1);
	}
	
	if(c2.visible == true)
	{
		PIEscene.remove(c2);
	}

	if(c3.visible == true)
	{
		PIEscene.remove(c3);
	}

	if(c4.visible == true)
	{
		PIEscene.remove(c4);
	}

	if(c5.visible == true)
	{
		PIEscene.remove(c5);
	}

	if(c6.visible == true)
	{
		PIEscene.remove(c6);
	}

	if(c7.visible == true)
	{
		PIEscene.remove(c7);
	}

	if(c8.visible == true)
	{
		PIEscene.remove(c8);
	}

	if(c9.visible == true)
	{
		PIEscene.remove(c9);
	}

	if(c10.visible == true)
	{
		PIEscene.remove(c10);
	}

	if(c11.visible == true)
	{
		PIEscene.remove(c11);
	}

	if(c12.visible == true)
	{
		PIEscene.remove(c12);
	}

	if(c13.visible == true)
	{
		PIEscene.remove(c13);
	}

	if(c14.visible == true)
	{
		PIEscene.remove(c14);
	}

	if(c15.visible == true)
	{
		PIEscene.remove(c15);
	}

	if(c16.visible == true)
	{
		PIEscene.remove(c16);
	}

	if(c17.visible == true)
	{
		PIEscene.remove(c17);
	}

	if(c18.visible == true)
	{
		PIEscene.remove(c18);
	}

	if(note.visible == true)
	{
		PIEscene.remove(note);
	}

	if(c19.visible == true)
	{
		c19.visible=false;
	}

	if(c20.visible == true)
	{
		c20.visible=false;
	}

	if(c21.visible == true)
	{
		c21.visible=false;
	}

	if(c22.visible == true)
	{
		c22.visible=false;
	}

	if(c23.visible == true)
	{
		c23.visible=false;
	}

	if(c24.visible == true)
	{
		c24.visible=false;
	}

	if(c25.visible == true)
	{
		c25.visible=false;
	}

	if(c26.visible == true)
	{
		c26.visible=false;
	}

	if(c27.visible == true)
	{
		c27.visible=false;
	}

	/*if(note19.visible == true)
	{
		note19.visible=false;
	}*/
	addMoney();
	PIEscene.remove(correct);
	addNumbers();
	
		
	PIEchangeInputSlider("First Number",x);
	PIEchangeInputSlider("Second Number",y);
	PIEchangeInputSlider("Result",x+y);
	

	
	
	
	
	PIErender();
}

function Steps() {
	initialiseControls();
	sum = 0;
	iam =0;
	if(note19.visible == true)
	{
		note19.visible=false;
	}

	if(twen9.visible == true)
	{
		twen9.visible=false;
	}
	if(twen10.visible == true)
	{
		twen10.visible=false;
	}
	if(fif3.visible == true)
	{
		fif3.visible=false;
	}
	
	
	
	
	
	if(note.visible == true)
	{
		note.visible=false;
	}

	if(c19.visible == true)
	{
		c19.visible=false;
	}

	if(c20.visible == true)
	{
		c20.visible=false;
	}

	if(c21.visible == true)
	{
		c21.visible=false;
	}

	if(c22.visible == true)
	{
		c22.visible=false;
	}

	if(c23.visible == true)
	{
		c23.visible=false;
	}

	if(c24.visible == true)
	{
		c24.visible=false;
	}

	if(c25.visible == true)
	{
		c25.visible=false;
	}

	if(c26.visible == true)
	{
		c26.visible=false;
	}

	if(c27.visible == true)
	{
		c27.visible=false;
	}
	count = 1;
	
	//PIEremove(toggle);
	PIEscene.remove(three);
	PIErender();
	PIEstartAnimation();
}
count = 1;

function updateExperimentElements(t,dt)
{	
	
	//initialiseControls();
	if(t != 0)
  {

	
		
		


  		if(sum == 10)
  		{
			
  			changeit();
  			
  		}
  		if(count == 1)
  		{

  			if(c1.visible == true)
  			{
  				if(c1.position.y >= -6)
  				{
  					c1.position.y -= 0.2;
  					c1.rotation.y -= 0.2;

  				}
  				else{
					c1.rotation.y = 0;
  					total++;
  					sum++;
  					count=2;
  					show();
  				}
  			}
  			else count=2;
  		}

  		else if(count == 2)
			{
  			if(c2.visible == true)
  			{
  				if(c2.position.y >= -6)
  				{
  					c2.position.y -= 0.2;
  					c2.rotation.y -= 0.2;

  				}
  				else{
  					c2.rotation.y = 0;
  					total++;
	                sum++;
	  				count=3;show();
  				}
  			}
  			else count=3;
  		}

  		else if(count == 3)
  		{
  			if(c3.visible == true)
  			{
  				if(c3.position.y >= -6)
  				{
  					c3.position.y -= 0.2;
					c3.rotation.y -= 0.2;
  				}
  				else{
  					
  						c3.rotation.y =0;
		               	total++;
		                sum++;
  						count=4;show();
  				}
  			}
  			else count=4;
  		}

  		else if(count == 4)
  		{
  			if(c4.visible == true)
  			{
  				if(c4.position.y >= -6)
  				{
  					c4.position.y -= 0.2;
  					c4.rotation.y -= 0.2;

  				}
  				else{
  				c4.rotation.y = 0;
  					sum++;
                 	total++;
  					count=5;show();
  				}
  			}
  			else count=5;
  		}


  		else if(count == 5)
  		{
  			if(c5.visible == true)
  			{
  				if(c5.position.y >= -6)
  				{
  					c5.position.y -= 0.2;
  					c5.rotation.y -= 0.2;

  				}
  				else{
  					c5.rotation.y = 0;
					sum++;
                 	total++;
  					count=6;show();
  				}
  			}
  			else count=6;
  		}

  		else if(count == 6)
  		{
  			if(c6.visible == true)
  			{
  				if(c6.position.y >= -6)
  				{
  					c6.position.y -= 0.2;
  					c6.rotation.y -= 0.2;
  				}
  				else{
  					c6.rotation.y = 0;
                 	total++;
  					sum++;
  					count=7;show();
  				}
  			}
  			else count=7;
  		}


  		else if(count == 7)
  		{
  			if(c7.visible == true)
  			{
  				if(c7.position.y >= -6)
  				{
  					c7.position.y -= 0.2;
  					c7.rotation.y -= 0.2;

  				}
  				else{
  					c7.rotation.y = 0;
  						total++;
                 	sum++;
  					count=8;show();
  				}
  			}
  			else count=8;
  		}

  		else if(count == 8)
  		{
  			if(c8.visible == true)
  			{
  				if(c8.position.y >= -6)
  				{
  					c8.position.y -= 0.2;
  					c8.rotation.y -= 0.2;

  				}
  				else{
  					c8.rotation.y = 0;
  					total++;
                 	sum++;
  					count=9;show();
  				}
  			}
  			else count=9;
  		}

  		else if(count == 9)
  		{
  			if(c9.visible == true)
  			{
  				if(c9.position.y >= -6)
  				{
  					c9.position.y -= 0.2;
  					c9.rotation.y -= 0.2;

  				}
  				else{
  					
  					c9.rotation.y = 0;
	  				total++;
	  				
  					sum++;
  					count=10;show();
  				}
  			}
  			else count=10;
  		}


  		else if(count == 10)
  		{
  			if(c10.visible == true)
  			{
  				if(c10.position.y >= -6.5)
  				{
  					c10.position.y -= 0.2;
  					c10.rotation.z -= 0.2;

  				}
  				else{
  					c10.rotation.z = 0;
	  				total++;
	  				
  					sum++;
  					count=11;show();
  				}
  			}
  			else count=11;
  		}

  		else if(count == 11)
  		{
  			if(c11.visible == true)
  			{
  				if(c11.position.y >= -6.5)
  				{
  					c11.position.y -= 0.2;
  					c11.rotation.z -= 0.2;

  				}
  				else{
  					
  						c11.rotation.z = 0;
  						total++;
	  				
  					sum++;
  					count=12;show();
  				}
  			}
  			else count=12;
  		}


  		else if(count == 12)
  		{
  			if(c12.visible == true)
  			{
  				if(c12.position.y >= -6.5)
  				{
  					c12.position.y -= 0.2;
  					c12.rotation.z -= 0.2;

  				}
  				else{

  					c12.rotation.z = 0;
  					
	                total++;
  					sum++;
  					count=13;show();
  				}
  			}
  			else count=13;
  		}

  		else if(count == 13)
  		{
  			if(c13.visible == true)
  			{
  				if(c13.position.y >= -6.5)
  				{
  					c13.position.y -= 0.2;
  					c13.rotation.z -= 0.2;

  				}
  				else{
  					
  						c13.rotation.z = 0;
	                	total++;
  						sum++;
  					count=14;show();
  				}
  			}
  			else count=14;
  		}

  		else if(count == 14)
  		{
  			if(c14.visible == true)
  			{
  				if(c14.position.y >= -6.5)
  				{
  					c14.position.y -= 0.2;
  					c14.rotation.z -=0.2;

  				}
  				else{
  					
  					c14.rotation.z = 0;
						total++;
  					sum++;
  					count=15;show();
  				}
  			}
  			else count=15;
  		}

  		else if(count == 15)
  		{
  			if(c15.visible == true)
  			{
  				if(c15.position.y >= -6.5)
  				{
  					c15.position.y -= 0.2;
  					c15.rotation.z -= 0.2;

  				}
  				else{
  					
  						total++;
  						c15.rotation.z = 0;
  						sum++;
  					count=16;show();
  				}
  			}
  			else count=16;
  		}

  		else if(count == 16)
  		{
  			if(c16.visible == true)
  			{
  				if(c16.position.y >= -6.5)
  				{
  					c16.position.y -= 0.2;
  					c16.rotation.z -= 0.2;

  				}
  				else{
  					
  					total++;
  					c16.rotation.z = 0;
  					sum++;
  					count=17;show();
  				}
  			}
  			else count=17;
  		}

  		else if(count == 17)
  		{
  			if(c17.visible == true)
  			{
  				if(c17.position.y >= -6.5)
  				{
  					c17.position.y -= 0.2;
  					c17.rotation.z -=0.2

  				}
  				else{
  					c17.rotation.z = 0;
  					total++;
  					sum++;
  					count=18;show();
  				}
  			}
  			else count=18;
  		}

  		else if(count == 18)
  		{
  			if(c18.visible == true)
  			{
  				if(c18.position.y >= -6.5)
  				{
  					c18.position.y -= 0.2;
  					c18.rotation.z -= 0.2;

  				}
  				else{
  						total++;
  						c18.rotation.z = 0;
  					sum++;
  					count=19;show();
  				}
  			}
  			else count=19;
  		}

  		else if(count == 19)
  		{
  			if(note1.visible == true)
  			{
  				if(note1.position.y >= -6)
  				{
  					note1.position.y -= 0.2;
  					note1.rotation.z -= 0.5;

  				}
  				else{
  					note1.rotation.z = 0;
  					//iam++;
  					total += 10;
  					// sum += 10;
  					count=20;
					show();
  				}
  			}
  			else count=20;
  		}
  		else if(count == 20)
  		{
  			if(note10.visible == true)
  			{
  				if(note10.position.y >= -3.5)
  				{
  					 
  					note10.position.y -= 0.2;
  					note10.rotation.y -= 0.2;

  				}
  				else{
  					note10.rotation.y = 0;
  					total += 10;iam++;
  					// sum += 10;

  					count=21;show();
  				}
  			}
  			else count=21;
  		}
		else if(count == 21)
  		{
  			if(twen1.visible == true)
  			{
  				if(twen1.position.y >= -6)
  				{
  					 
  					twen1.position.y -= 0.2;
  					twen1.rotation.y -= 0.2;

  				}
  				else{
  					twen1.rotation.y = 0;
  					total += 20;
			
  					count=22;show();
  				}
  			}
  			else count=22;

  			
  		}
		else if(count == 22)
  		{
  			if(twen2.visible == true)
  			{
  				if(twen2.position.y >= -6)
  				{
  					 
  					twen2.position.y -= 0.2;
  					twen2.rotation.y -= 0.2;

  				}
  				else{
  					twen2.rotation.y = 0;
  					total += 20;
  					count=23;show();
  				}
  			}
  			else count=23;

  			
  		}
		else if(count == 23)
  		{
  			if(twen5.visible == true)
  			{
  				if(twen5.position.y >= -3.5)
  				{
  					 
  					twen5.position.y -= 0.2;
  					twen5.rotation.y -= 0.2;

  				}
  				else{
  					twen5.rotation.y = 0;
  					total += 20;
  					count=24;show();
  				}
  			}
  			else count=24;

  			
  		}
		else if(count == 24)
  		{
  			if(twen6.visible == true)
  			{
  				if(twen6.position.y >= -3.5)
  				{
  					 
  					twen6.position.y -= 0.2;
  					twen6.rotation.y -= 0.2;

  				}
  				else{
  					twen6.rotation.y = 0;
  					total += 20;
  					count=25;show();
  				}
  			}
  			else count=25;

  			
  		}
  		else if(count == 25)
  		{
  			if(fif1.visible == true)
  			{
  				if(fif1.position.y >= -6)
  				{
  					 
  					fif1.position.y -= 0.2;
  					fif1.rotation.y -= 0.2;

  				}
  				else{
  					fif1.rotation.y = 0;
  					total += 50;

  					count=26;show();
  				}
  			}
  			else count=26;

  			
  		}
		else if(count == 26)
  		{
  			if(fif2.visible == true)
  			{
  				if(fif2.position.y >= -3.5)
  				{
  					 
  					fif2.position.y -= 0.2;
  					fif2.rotation.y -= 0.2;

  				}
  				else{
  					fif2.rotation.y = 0;
  					total += 50;

  					count=27;show();
  				}
  			}
  			else count=27;

  			
  		}


  }
}
function resetExperiment() {
	initialiseControls();
	Next();
}
function addText() {
    var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {
                southGeometry = new THREE.TextGeometry( "N1", { font: font, size: 0.7, height: 0.05, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });
				
				

                toggle = new THREE.Mesh(southGeometry ,southMaterial );
                toggle.position.set(-11,3.8, 15) ;
                PIEaddElement( toggle );})

                 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry( "N2", { font: font, size: 0.7, height: 0.05, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });

                toggle = new THREE.Mesh(southGeometry ,southMaterial );
                toggle.position.set(-11,0.5, 15) ;
                PIEaddElement( toggle );})

                
				var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry( "Result", { font: font, size: 0.7, height: 0.05, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });

                toggle = new THREE.Mesh(southGeometry ,southMaterial );
                toggle.position.set(-11,-3, 15) ;
                PIEaddElement( toggle );})
              

               addNumbers();

                
}

function addNumbers()
{
	 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry( x, { font: font, size: 1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });

                one = new THREE.Mesh(southGeometry ,southMaterial );
                one.position.set(2.7,3.7, 15) ;
                PIEaddElement( one );})

                var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry(y, { font: font, size: 1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });

                two = new THREE.Mesh(southGeometry ,southMaterial );
                two.position.set(2.7,0.4, 15) ;
                PIEaddElement( two );})

                var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry( "", { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})
}

function addMoney() {
    addNotes();
    addCoins();

}
function changeit() {

	sum = 0;
	turn = 1;
	if(c1.position.y != 6)
	{
		c1.visible=false;
		PIErender();
	}

	if(c2.position.y != 6)
	{
		c2.visible=false;
		PIErender();
	}

	if(c3.position.y != 6)
	{
		c3.visible=false;PIErender();
	}

	if(c4.position.y != 6)
	{
		c4.visible=false;
		PIErender();
	}

	if(c5.position.y != 6)
	{
		c5.visible=false;
		PIErender();
	}

	if(c6.position.y != 6)
	{
		c6.visible=false;
		PIErender();
	}

	if(c7.position.y != 6)
	{
		c7.visible=false;
		PIErender();
	}

	if(c8.position.y != 6)
	{
		c8.visible=false;
		PIErender();
	}

	if(c9.position.y != 6)
	{
		c9.visible=false;
		PIErender();
	}

	if(c10.position.y != 1)
	{
		c10.visible=false;
		PIErender();
	}

	if(c11.position.y !=  1)
	{
		c11.visible=false;
		PIErender();
	}

	if(c12.position.y != 1)
	{
		c12.visible=false;
		PIErender();
	}

	if(c13.position.y != 1)
	{
		c13.visible=false;
		PIErender();
	}

	if(c14.position.y != 1)
	{
		c14.visible=false;
		PIErender();
	}

	if(c15.position.y != 1)
	{
		c15.visible=false;
		PIErender();
	}

	if(c16.position.y != 1)
	{
		c16.visible=false;
		PIErender();
	}

	if(c17.position.y != 1)
	{
		c17.visible=false;
		PIErender();
	}

	if(c18.position.y != 1)
	{
		c18.visible=false;
		PIErender();
	}
	newnote.visible = true;
//	iam++;

}
function addCoins() {


	texture = new THREE.ImageUtils.loadTexture( "one.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	//texture.repeat.set( 1, 1);

	var geometry = new THREE.RingGeometry( 0.001,1.3, 32 );
	var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
	c1 = new THREE.Mesh(geometry,material);

	PIEaddElement(c1);
	
	c2 = new THREE.Mesh(geometry,material);
	PIEaddElement(c2);
	
	c3 = new THREE.Mesh(geometry,material);
	PIEaddElement(c3);
	
	c4 = new THREE.Mesh(geometry,material);
	PIEaddElement(c4);
	
	c5 = new THREE.Mesh(geometry,material);
	PIEaddElement(c5);
	
	c6 = new THREE.Mesh(geometry,material);
	PIEaddElement(c6);
	
	c7 = new THREE.Mesh(geometry,material);
	PIEaddElement(c7);
	
	c8 = new THREE.Mesh(geometry,material);
	PIEaddElement(c8);
	
	c9 = new THREE.Mesh(geometry,material);
	PIEaddElement(c9);

	c10 = new THREE.Mesh(geometry,material);
	PIEaddElement(c10);


	c11 = new THREE.Mesh(geometry,material);
	PIEaddElement(c11);
	
	c12 = new THREE.Mesh(geometry,material);
	PIEaddElement(c12);
	
	c13 = new THREE.Mesh(geometry,material);
	PIEaddElement(c13);
	
	c14 = new THREE.Mesh(geometry,material);
	PIEaddElement(c14);
	
	c15 = new THREE.Mesh(geometry,material);
	PIEaddElement(c15);
	
	c16 = new THREE.Mesh(geometry,material);
	PIEaddElement(c16);
	
	c17 = new THREE.Mesh(geometry,material);
	PIEaddElement(c17);
	
	c18 = new THREE.Mesh(geometry,material);
	PIEaddElement(c18);
	


	c1.name = "Drag";
	c2.name = "Drag";
	c3.name = "Drag";
	c4.name = "Drag";
	c5.name = "Drag";
	c6.name = "Drag";
	c7.name = "Drag";
	c8.name = "Drag";
	c9.name = "Drag";
	c10.name = "Drag";
	c11.name = "Drag";
	c12.name = "Drag";
	c13.name = "Drag";
	c14.name = "Drag";
	c15.name = "Drag";
	c16.name = "Drag";
	c17.name = "Drag";
	c18.name = "Drag";



	c1.position.set(-2.4,6,0);
	c2.position.set(-1.8,6,0);
	c3.position.set(-1.2,6,0);
	c4.position.set(-0.6,6,0);
	c5.position.set(0,6,0);
	c6.position.set(0.6,6,0);
	c7.position.set(1.2,6,0);
	c8.position.set(1.8,6,0);
	c9.position.set(2.4,6,0);

	c10.position.set(-2.4,1,0);
	c11.position.set(-1.8,1,0);
	c12.position.set(-1.2,1,0);
	c13.position.set(-0.6,1,0);
	c14.position.set(0,1,0);
	c15.position.set(0.6,1,0);
	c16.position.set(1.2,1,0);
	c17.position.set(1.8,1,0);
	c18.position.set(2.4,1,0);
	

	if(rem == 0 )
	{
		c1.visible = false;
		c2.visible = false;
		c3.visible = false;
		c4.visible = false;
		c5.visible = false;
		c6.visible = false;
		c7.visible = false;
		c8.visible = false;
		c9.visible = false;
	}
	else if(rem == 1 )
	{
		c2.visible = false;
		c3.visible = false;
		c4.visible = false;
		c5.visible = false;
		c6.visible = false;
		c7.visible = false;
		c8.visible = false;
		c9.visible = false;
	}
	else if(rem == 2)
	{
		c3.visible = false;
		c4.visible = false;
		c5.visible = false;
		c6.visible = false;
		c7.visible = false;
		c8.visible = false;
		c9.visible = false;
	}
	else if(rem == 3 )
	{
		c4.visible = false;
		c5.visible = false;
		c6.visible = false;
		c7.visible = false;
		c8.visible = false;
		c9.visible = false;
	}

	else if(rem == 4 )
	{
		c5.visible = false;
		c6.visible = false;
		c7.visible = false;
		c8.visible = false;
		c9.visible = false;

	}

	else if(rem == 5 )
	{	c6.visible = false;
		c7.visible = false;
		c8.visible = false;
		c9.visible = false;
	}
	else if(rem == 6 )
	{
		c7.visible = false;
		c8.visible = false;
		c9.visible = false;
	}
	else if(rem ==7 )
	{
		c8.visible = false;
		c9.visible = false;
	}
	else if(rem == 8 )
	{
		c9.visible = false;
	}
	if(rem1 == 0 )
	{
		c10.visible = false;
		c11.visible = false;
		c12.visible = false;
		c13.visible = false;
		c14.visible = false;
		c15.visible = false;
		c16.visible = false;
		c17.visible = false;
		c18.visible = false;
	}
	else if(rem1 == 1 )
	{
		c11.visible = false;
		c12.visible = false;
		c13.visible = false;
		c14.visible = false;
		c15.visible = false;
		c16.visible = false;
		c17.visible = false;
		c18.visible = false;
	}
	else if(rem1 == 2)
	{
		c12.visible = false;
		c13.visible = false;
		c14.visible = false;
		c15.visible = false;
		c16.visible = false;
		c17.visible = false;
		c18.visible = false;
	}
	else if(rem1 == 3 )
	{
		c13.visible = false;
		c14.visible = false;
		c15.visible = false;
		c16.visible = false;
		c17.visible = false;
		c18.visible = false;
		c13.visible = false;
	}
	else if(rem1 == 4 )
	{
		c14.visible = false;
		c15.visible = false;
		c16.visible = false;
		c17.visible = false;
		c18.visible = false;
	}
	else if(rem1 == 5 )
	{
		c15.visible = false;
		c16.visible = false;
		c17.visible = false;
		c18.visible = false;
	}
	else if(rem1 == 6 )
	{
		c16.visible = false;
		c17.visible = false;
		c18.visible = false;
		c15.visible = false;
	}
	else if(rem1 ==7 )
	{
		c17.visible = false;
		c18.visible = false;
	}
	else if(rem1 == 8 )
	{
		c18.visible = false;
	}
}

function addNotes()
{
	x=Math.floor((Math.random() * 99) + 1); 
    y=Math.floor((Math.random() * 99) + 1);
    q=Math.floor(x/10);
    rem=x%10;
    q1=Math.floor(y/10);
    rem1=y%10;
	calc1_50=Math.floor(x/50);
	calc2_50=Math.floor(y/50);
	
	calc1_rem50=x%50;
	calc2_rem50=y%50;
	
	
	calc1_20=Math.floor(calc1_rem50/20);
	calc2_20=Math.floor(calc2_rem50/20);
	
	
	calc1_rem20=calc1_rem50%20;
	calc2_rem20=calc2_rem50%20;
	
	calc1_10=Math.floor(calc1_rem20/10);
	calc2_10=Math.floor(calc2_rem20/10);
    result=x+y;	
    texture = new THREE.ImageUtils.loadTexture( "10.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    var geometry = new THREE.PlaneGeometry( 7,3 );
    var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
    note1 = new THREE.Mesh(geometry,material);
    PIEaddElement(note1);
    
     note10 = new THREE.Mesh(geometry,material);
    PIEaddElement(note10);

    newnote= new THREE.Mesh(geometry,material);
    PIEaddElement(newnote);

    newnote.position.set(-4,-6,0);
    newnote.visible = false;

/****************Twenty ***************************/
    texture = new THREE.ImageUtils.loadTexture( "20.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    
    var geometry = new THREE.PlaneGeometry( 7,3 );
    var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
    twen1 = new THREE.Mesh(geometry,material);
    PIEaddElement(twen1);

	twen2 = new THREE.Mesh(geometry,material);
    PIEaddElement(twen2);
	twen5 = new THREE.Mesh(geometry,material);
    PIEaddElement(twen5);
twen6 = new THREE.Mesh(geometry,material);
    PIEaddElement(twen6);

/*******************************50 Addition ****************************/
  texture = new THREE.ImageUtils.loadTexture( "50.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    
    var geometry = new THREE.PlaneGeometry( 7,3 );
    var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
    fif1 = new THREE.Mesh(geometry,material);
    PIEaddElement(fif1);

	
	fif2 = new THREE.Mesh(geometry,material);
    PIEaddElement(fif2);
	
/**********************100 ADdiition *********************************/
    texture = new THREE.ImageUtils.loadTexture( "100.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    var geometry = new THREE.PlaneGeometry( 8,3.3 );
    var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
    note = new THREE.Mesh(geometry,material);
    note.position.set(0,-4,0);
    note.visible=false;
    PIEaddElement(note);
    note1.position.set(-1 ,6.8,0);
	twen1.position.set(-8,6.8,0);
	twen2.position.set(-9,6.8,0);
	fif1.position.set(-11,6.8,0);
    note10.position.set(-1 ,1.5,0);
	twen5.position.set(-8,1.5,0);
	twen6.position.set(-9,1.5,0);
	fif2.position.set(-11,1.5,0);
	/******************DEFINE****************/
	if(calc1_50 == 0)
	{
		fif1.visible=false;		
	}
	if(calc2_50 == 0)
	{
		fif2.visible=false;		
	}
	if(calc1_20 == 0)
	{
		twen1.visible=false;
		twen2.visible=false;
	}
	else if(calc1_20 == 1)
	{
		twen2.visible=false;
	}
	else if(calc1_20 == 2)
	{
	}
	if(calc2_20 == 0)
	{
		twen5.visible=false;
		twen6.visible=false;
	}
	else if(calc2_20 == 1)
	{
		twen6.visible=false;
	}
	else if(calc2_20 == 2)
	{
	}
	if(calc1_10 == 0)
	{
		note1.visible=false;
	}
	else if(calc1_10 == 1)
	{
	}
	if(calc2_10 == 0)
	{
		note10.visible=false;
	}
	else if(calc2_10 == 1)
	{
	}
	
}
function Result() {
	value = 0;
	count=0;
	if(note1.visible == true)
	{
		 note1.position.set(-1 ,6.8,0);
	}
	if(twen1.visible == true)
	{
		twen1.position.set(-8,6.8,0);
	}
	if(twen2.visible == true)
	{
			twen2.position.set(-9,6.8,0);
	}
	if(fif1.visible == true)
	{
		fif1.position.set(-11,6.8,0);
	}
	if(note10.visible == true)
	{
		note10.position.set(-1 ,1.5,0);
	}
	if(twen5.visible == true)
	{
		twen5.position.set(-8,1.5,0);
	}
	if(twen6.visible == true)
	{
		twen6.position.set(-9,1.5,0);
	}
	if(fif2.visible == true)
	{
		fif2.position.set(-11,1.5,0);
	}
	if(c1.visible == true)
	{
		c1.position.set(-2.4,6,0);
	}
	if(c2.visible == true)
	{
		c2.position.set(-1.8,6,0);
	}
	if(c3.visible == true)
	{
		c3.position.set(-1.2,6,0);
	}
	if(c4.visible == true)
	{
		c4.position.set(-0.6,6,0);
	}
	if(c5.visible == true)
	{
		c5.position.set(0,6,0);
	}
	if(c6.visible == true)
	{
		c6.position.set(0.6,6,0);
	}
	if(c7.visible == true)
	{
		c7.position.set(1.2,6,0);
	}
	if(c8.visible == true)
	{
		c8.position.set(1.8,6,0);
	}
	if(c9.visible == true)
	{
		c9.position.set(2.4,6,0);
	}
	if(c10.visible == true)
	{
		c10.position.set(-2.4,1,0);
	}
	if(c11.visible == true)
	{
		c11.position.set(-1.8,1,0);
	}
	if(c12.visible == true)
	{
		c12.position.set(-1.2,1,0);
	}
	if(c13.visible == true)
	{
		c13.position.set(-0.6,1,0);
	}
	if(c14.visible == true)
	{
		c14.position.set(0,1,0);
	}
	if(c15.visible == true)
	{
		c15.position.set(0.6,1,0);
	}
	if(c16.visible == true)
	{
		c16.position.set(1.2,1,0);
	}
	if(c17.visible == true)
	{
		c17.position.set(1.8,1,0);
	}
	if(c18.visible == true)
	{
		c18.position.set(2.4,1,0);
	}
	if(result >= 100)
	{
		div100=Math.floor(result/100);
		rem100=result%100;
		
		div50 = Math.floor(rem100/50);
		rem50=rem100%50;
		
		div20=Math.floor(rem50/20);
		rem20=rem50%20;
		
		div10=Math.floor(rem20/10);
		rem10=rem20%10;
		if(div100 == 0)
		{
			note.visible=true;
		}
		else 
		{
			note.visible=true;	
		
			if(rem10 == 1)
			{
				c19.visible =true;
				PIErender();
			}

			else if(rem10 == 2)
			{
				c19.visible =true;
				c20.visible =true;
				PIErender();
			}

			else if(rem10 == 3)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				PIErender();
			}

			else if(rem10 == 4)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				PIErender();
			}
			else if(rem10 == 5)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				PIErender();
			}

			else if(rem10 == 6)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				c24.visible=true;
				PIErender();
			}

			else if(rem10 == 7)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				c24.visible=true;
				c25.visible=true;
				PIErender();
			}

			else if(rem10 == 8)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				c24.visible=true;
				c25.visible=true;
				c26.visible=true;
				PIErender();
			}

			else if(rem10 == 9)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				c24.visible=true;
				c25.visible=true;
				c26.visible=true;
				c27.visible=true;
				PIErender();
			}
			if(div50 == 1)
			{
				fif3.visible=true;
				PIErender();
			}
			if(div20 == 1)
			{
				twen9.visible=true;
				PIErender();
			}
			else if(div20 == 2)
			{
				twen9.visible=true;
				twen10.visible=true;
				PIErender();
			}
			if(div10 == 1)
			{
				note19.visible=true;
				PIErender();
			}
		}
	}	
		
	else if(result < 100)
	{
		
		if(note.visible == true)
		{
			note.visible=false;
		}
		
		div_less_50 = Math.floor(result/50);
		rem_less_50=result%50;
		
		div_less_20=Math.floor(rem_less_50/20);
		rem_less_20=rem_less_50%20;
		
		div_less_10=Math.floor(rem_less_20/10);
		rem_less_10=rem_less_20%10;
			if(rem_less_10 == 1)
			{
				c19.visible =true;
				PIErender();
			}
			else if(rem_less_10 == 2)
			{
				c19.visible =true;
				c20.visible =true;
				PIErender();
			}
			else if(rem_less_10 == 3)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				PIErender();
			}
			else if(rem_less_10 == 4)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				PIErender();
			}
			else if(rem_less_10 == 5)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				PIErender();
			}
			else if(rem_less_10 == 6)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				c24.visible=true;
				PIErender();
			}
			else if(rem_less_10 == 7)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				c24.visible=true;
				c25.visible=true;
				PIErender();
			}
			else if(rem_less_10 == 8)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				c24.visible=true;
				c25.visible=true;
				c26.visible=true;
				PIErender();
			}
			else if(rem_less_10 == 9)
			{
				c19.visible =true;
				c20.visible =true;
				c21.visible=true;
				c22.visible=true;
				c23.visible=true;
				c24.visible=true;
				c25.visible=true;
				c26.visible=true;
				c27.visible=true;
				PIErender();
			}
			if(div_less_50 == 1)
			{
				fif3.visible=true;
				PIErender();
			}
			if(div_less_20 == 1)
			{
				twen9.visible=true;
				PIErender();
			}
			else if(div_less_20 == 2)
			{
				twen9.visible=true;
				twen10.visible=true;
				PIErender();
			}
			if(div_less_10 == 1)
			{
				note19.visible=true;
				PIErender();
			}
	}
	PIEscene.remove(three);
		 var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {
                southGeometry = new THREE.TextGeometry( result, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})
                PIEstartAnimation();

}

function MoreMoney() {
	texture = new THREE.ImageUtils.loadTexture( "one.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	var geometry = new THREE.RingGeometry( 0.001,1.3, 32 );
	var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
	c19 = new THREE.Mesh(geometry,material);

	PIEaddElement(c19);
	
	c20 = new THREE.Mesh(geometry,material);
	PIEaddElement(c20);
	
	c21 = new THREE.Mesh(geometry,material);
	PIEaddElement(c21);
	
	c22 = new THREE.Mesh(geometry,material);
	PIEaddElement(c22);
	
	c23 = new THREE.Mesh(geometry,material);
	PIEaddElement(c23);
	
	c24 = new THREE.Mesh(geometry,material);
	PIEaddElement(c24);
	c25 = new THREE.Mesh(geometry,material);
	PIEaddElement(c25);
	c26 = new THREE.Mesh(geometry,material);
	PIEaddElement(c26);
	c27 = new THREE.Mesh(geometry,material);
	PIEaddElement(c27);
	c19.visible=false;
	c20.visible=false;
	c21.visible=false;
	c22.visible=false;
	c23.visible=false;
	c24.visible=false;
	c25.visible=false;
	c26.visible=false;
	c27.visible=false;
	c19.position.set(-5.3,-6.5,0);
	c20.position.set(-4.7,-6.5,0);
	c21.position.set(-3.9,-6.5,0);
	c22.position.set(-3.1,-6.5,0);
	c23.position.set(-2.3,-6.5,0);
	c24.position.set(-1.5,-6.5,0);
	c25.position.set(-0.7,-6.5,0);
	c26.position.set(0.1,-6.5,0);
	c27.position.set(0.9,-6.5,0);
	texture = new THREE.ImageUtils.loadTexture( "10.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    var geometry = new THREE.PlaneGeometry( 7,3 );
    var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
    note19 = new THREE.Mesh(geometry,material);
    PIEaddElement(note19);
	/************ 20 Result*************/
	texture = new THREE.ImageUtils.loadTexture( "20.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    
    var geometry = new THREE.PlaneGeometry( 7,3 );
    var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
    twen9 = new THREE.Mesh(geometry,material);
    PIEaddElement(twen9);
	
	twen10 = new THREE.Mesh(geometry,material);
    PIEaddElement(twen10);

	/************ 50 Result*************/
	texture = new THREE.ImageUtils.loadTexture( "50.jpg",{},function (){PIErender();PIErender();PIErender();PIErender();} );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    var geometry = new THREE.PlaneGeometry( 7,3 );
    var material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.DoubleSide  });
    fif3 = new THREE.Mesh(geometry,material);
    PIEaddElement(fif3);
	fif4 = new THREE.Mesh(geometry,material);
    PIEaddElement(fif4);
	twen9.visible=false;
	twen10.visible=false;
	fif3.visible=false;
	fif4.visible=false;
    note19.visible=false;
	note19.position.set(-5,-4,2);
	twen9.position.set(-8,-4,2);
	twen10.position.set(-9,-4,2);
	fif3.position.set(-11,-4,2);
	fif4.position.set(-11,-4,2);
}
function show() {
	PIEscene.remove(three);
	var loader1 = new THREE.FontLoader();
                loader1.load( 'helvetiker_regular.typeface.json', function ( font ) {


                southGeometry = new THREE.TextGeometry( total, { font: font, size:1, height: 0.03, curveSegments: 7});
                southMaterial = new THREE.MeshBasicMaterial( { color:'yellow' });

                three = new THREE.Mesh(southGeometry ,southMaterial );
                three.position.set(2.7,-2.7, 15) ;
                PIEaddElement( three );})
}