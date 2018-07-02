
/**********Global Varibales***************/
var mySceneTLX;        
var mySceneTLY;        
var mySceneBRX;
var mySceneBRY;
var slide_ball;
var apple_down;
var rocket_launch;
var earth;
var spin_toy;
var merry_round;
var pendulum;
var clock_hand;
var swing ;
var bicycle;
var tennis_ball;
var atom;
var rectMotion;
var compMotion;
var perMotion;
var circMotion;
var helpContent;
var direction = 1;
function initialiseHelp() {
    helpContent="";
    helpContent = helpContent + "<h2>Types of Motion</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>In this experiment,we can show various examples of different kinds of Motion:</p>";
	helpContent = helpContent + "<ul>";
	helpContent = helpContent + "<h2><li>Rectilinear Motion</li></h2>";
    helpContent = helpContent + "<h2><li>Circular Motion</li></h2>";
    helpContent = helpContent + "<h2><li>Periodic Motion</li></h2>";
    helpContent = helpContent + "<h2><li>Complex Motion (Combination of motion)</li></h2>";
    helpContent = helpContent + "</ul><br><br><br>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<h4>Click on start button to start the animation.</h4>";
    helpContent = helpContent + "<p> User can see different motions and different examples by clicking checkboxes in control panel.</p>";
    helpContent = helpContent + "<h4>Click on Reset button to reset the animation</h4>";
    helpContent = helpContent + "<h4>Click on Pause button to pause the animation</h4>";
    helpContent = helpContent + "<h4>Click on stop button/switch to stop the animation</h4>";
    
	helpContent = helpContent + "<br>";
    




    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
	infoContent="";
    infoContent = infoContent + "<h2>Types of Motion</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent  + "<p>In this experiment, we can show various examples of different kinds of Motion:</p>";
	infoContent = infoContent  + "<ul>";
	infoContent = infoContent  + "<h2><li>Rectilinear Motion</li></h2>";
    infoContent = infoContent  + "<h2><li>Circular Motion</li></h2>";
    infoContent = infoContent  + "<h2><li>Periodic Motion</li></h2>";
  infoContent   = infoContent  + "<h2><li>Complex Motion (Combination of motion)</li></h2>";
    infoContent  =infoContent  + "</ul><br><br><br>";
    infoContent = infoContent + "<h3>Definitions:</h3>";
    infoContent = infoContent + "<div><b>1. Rectilinear motion:</b> Rectilinear motion is another name for straight-line motion. This type of motion describes the movement of a particle or a body. A body is said to experience rectilinear motion if any two particles of the body travel the same distance along two parallel straight lines.</div>";
    infoContent = infoContent + "<div><b>2. Circular motion:</b> In physics, circular motion is a movement of an object along the circumference of a circle or rotation along a circular path.</div>";
    infoContent = infoContent + "<div><b>3. Periodic motion:</b> In physics, motion repeated in equal intervals of time. Periodic motion is performed.</div>";
    infoContent = infoContent + "<div><b>4. Complex motion:</b> In physics, combination of two or more simple motions is generally called as Complex motion.</div>";


    PIEupdateInfo(infoContent);
}

function initialiseScene() {
    mySceneTLX = 0.0;
    mySceneTLY = 20.0;
    mySceneBRX = 5.0;
    mySceneBRY = -20.0;
}

function setOn(){

}
function setOff(){

}
function enablecontrols(){
 controls.enabled = true;
}
function disablecontrols(){
    controls.enabled = false;
}
function mydrag(element,newpos){

    count = 0;
 //   a
    var cal = newpos.y + 16.4*newpos.x/39 - 5 + (16.4*29/39);
    if(Math.abs(cal)<0.4)
        recte1c.position.set(newpos.x,newpos.y,newpos.z);

}
function PIEmouseDown( event )
{
	var intersects;     // to hold return array of ray intersects

    // console.log("Mouse Down at ", PIEmouseP);
    event.defaultPrevented = true;
    PIEselectedDrag = null;
	
	PIEmouseP.x = ( event.clientX / PIEcanvasW ) * 2 - 1;
    PIEmouseP.y = - ( event.clientY / PIEcanvasH ) * 2 + 1;

    PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
    intersects = PIEraycaster.intersectObjects(PIEdragElements);
    if (intersects.length > 0) {
        PIEselectedDrag = intersects[0].object;
        if (PIEraycaster.ray.intersectPlane(PIEdragPlane, PIEdragIntersect))
		{
            PIEdragOffset.copy(PIEdragIntersect).sub(PIEselectedDrag.position);
        }
        PIEscreenElem.style.cursor = 'move';
		PIEdefaultDragStart(PIEselectedDrag);
    }
    intersects = PIEraycaster.intersectObjects([]);
    if (intersects.length > 0) {
	
    }
}

function PIEmouseMove(event){
		var intersects;     // to hold return array of ray intersects
    event.defaultPrevented = true;

    PIEmouseP.x = ( event.clientX / PIEcanvasW ) * 2 - 1;
    PIEmouseP.y = - ( event.clientY / PIEcanvasH ) * 2 + 1;

    /* Cast the ray to find intersecting objects */
    PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);

    if (PIEselectedDrag != null)
    {   /* Drag the element */
        PIEraycaster.ray.intersectPlane(PIEdragPlane, PIEdragIntersect);
		PIEdefaultDrag(PIEselectedDrag, PIEdragIntersect.sub(PIEdragOffset)); 
    }
    else
    {   
    	intersects = PIEraycaster.intersectObjects(PIEdragElements);
        if (intersects.length > 0)
        {
            PIEdragPlane.setFromNormalAndCoplanarPoint(PIEcamera.getWorldDirection(PIEdragPlane.normal), intersects[0].object.position);
            if (PIEselectedHover != intersects[0].object)
            {
                PIEdefaultHoverOFF(PIEselectedHover);
                PIEselectedHover = intersects[0].object;
                PIEdefaultHoverON(PIEselectedHover);
            }
            PIEscreenElem.style.cursor = 'pointer';
        }
		else if (PIEselectedHover != null)
        {
            PIEdefaultHoverOFF(PIEselectedHover);
            PIEselectedHover = null;
            PIEscreenElem.style.cursor = 'auto';
        }
        else{

    		intersects = PIEraycaster.intersectObjects([]);
    		if (intersects.length > 0) 
    		{
    	    	PIEscreenElem.style.cursor = 'pointer';
    		}
    		else{
    	    	PIEscreenElem.style.cursor = 'auto';
   		    }  	
        }
    }

}
var rect = "Rectilinear Motion";
var isrect = true;
function myrectval(value){
     console.log("value = "+value);
     if(rectMotion){
     compMotion.visible = false;
     perMotion.visible = false;
     rectMotion.visible = true;
     circMotion.visible = false;
    }
    if(value == false &&(iscurv == true || isper == true || iscomp == true)){
        isrect = true;
        iscurv = false;
        isper = false;
        iscomp = false;
        
        PIEchangeInputCheckbox(rect,true);
        PIEchangeInputCheckbox(curv,false);
        PIEchangeInputCheckbox(per,false);
        PIEchangeInputCheckbox(comp,false);
        mye1(true);
        PIErender();
        return;
    
    }
    isrect = value;
    if(value){
        iscurv = false;
        isper = false;
        iscomp = false;
        PIEchangeInputCheckbox(curv,false);
        PIEchangeInputCheckbox(comp,false);
        PIEchangeInputCheckbox(per,false);
    }
    //PIEchangeInputCheckbox(rect,value);
    //console.log("value2 = "+value);
    mye1(true);
    PIErender();
}
var curv = "Circular Motion";
var iscurv = false;
function mycurvval(value){
    compMotion.visible = false;
     perMotion.visible = false;
     rectMotion.visible = false;
     circMotion.visible = true;
     console.log("value = "+value);
    if(value == false &&(isrect == true || isper == true || iscomp == true)){
        isrect = false;
        iscurv = true;
        isper = false;
        iscomp = false;
        PIEchangeInputCheckbox(rect,false);
        PIEchangeInputCheckbox(curv,true);
        PIEchangeInputCheckbox(per,false);
        PIEchangeInputCheckbox(comp,false);
        mye1(true);
        PIErender();
        return;
    
    }
    
    iscurv = value;
    if(value){
        isrect = false;
        isper = false;
        iscomp = false;
        PIEchangeInputCheckbox(rect,false);
        PIEchangeInputCheckbox(comp,false);
        
        PIEchangeInputCheckbox(per,false);
    }
    console.log(value);
    mye1(true);
    PIErender();
}
var per = "Periodic Motion";
var isper = false;
function myperval(value){
     compMotion.visible = false;
     perMotion.visible = true;
     rectMotion.visible = false;
     circMotion.visible = false;
        console.log("value = "+value);
   if(value == false &&(isrect == true || iscurv == true || iscomp == true)){
        isrect = false;
        iscurv = false;
        isper = true;
        iscomp = false;
        PIEchangeInputCheckbox(rect,false);
        PIEchangeInputCheckbox(curv,false);
        PIEchangeInputCheckbox(per,true);
        PIEchangeInputCheckbox(comp,false);
        
        mye1(true);
        PIErender();
        return;
    
    }
    
    isper = value;
    if(value){
        isrect = false;
        iscurv = false;
        iscomp = false;
        PIEchangeInputCheckbox(rect,false);
        PIEchangeInputCheckbox(comp,false);
        
        PIEchangeInputCheckbox(curv,false);
    
    }
    mye1(true);
    PIErender();
}
var comp = "Complex Motion";
var iscomp = false;
function mycompval(value){
    compMotion.visible = true;
     perMotion.visible = false;
     rectMotion.visible = false;
     circMotion.visible = false;
        console.log("value = "+value);
   if(value == false &&(isrect == true || iscurv == true || isper == true)){
        isrect = false;
        iscurv = false;
        iscomp = true;
        isper = false;
        PIEchangeInputCheckbox(rect,false);
        PIEchangeInputCheckbox(curv,false);
        PIEchangeInputCheckbox(comp,true);
        PIEchangeInputCheckbox(per,false);
        
        mye1(true);
        PIErender();
        return;
    
    }
    
    iscomp = value;
    if(value){
        isrect = false;
        iscurv = false;
        isper = false;
        PIEchangeInputCheckbox(rect,false);
        PIEchangeInputCheckbox(per,false);
        
        PIEchangeInputCheckbox(curv,false);
    
    }
    mye1(true);
    PIErender();
}
var e1 = "Example 1";
var ise1 = true;
function allinvisible(){
    recte1c.visible = false;
    recte1a.visible = false;
    recte1b.visible = false;
    recte2a.visible = false;
    recte3a.visible = false;
    circe1c.visible = false;
    circe1a.visible = false;
    circe1b.visible = false;
    circe2a.visible = false;
    circe3a.visible = false;
    pere2a.visible = false;
    pere3a.visible = false;
    pere1a.visible = false;
    pere1b.visible = false;
    pere1c.visible = false;
    compe1a.visible = false;
    compe1b.visible = false;
    compe1c.visible = false;
    if(slide_ball){
    slide_ball.visible = false;
    apple_down.visible = false;
    rocket_launch.visible  = false;
    earth.visible = false;
    spin_toy.visible = false;
    merry_round.visible = false;
    pendulum.visible = false;
    clock_hand.visible = false;
    swing.visible = false;
    bicycle.visible = false;
    tennis_ball.visible = false;
    atom.visible = false;
    }
}

function mye1(value){
    if(value == false &&(ise2 == true || ise3 == true)){
        ise1 = true;
        ise2 = false;
        ise3 = false;
        
        PIEchangeInputCheckbox(e1,true);
        PIEchangeInputCheckbox(e2,false);
        PIEchangeInputCheckbox(e3,false);
        //mye1(true);
        allinvisible();
        if(isrect){
            recte1c.visible =true;
            recte1a.visible = true;
            recte1b.visible = true;
            recte1c.position.set(-29,5,0);

            PIEscene.background = new THREE.Color("skyblue");
            mesh233.material.color.setStyle("lightgreen");
            mesh234.material.color.setStyle("green");
            mesh235.material.color.setStyle("darkgreen");
            
            slide_ball.visible = true;
        }
        if(iscurv){
            circe1c.visible = true;
            circe1b.visible = true;
            circe1a.visible = true;
            PIEscene.background = new THREE.Color("skyblue");
            mesh233.material.color.setStyle("lightgreen");
            mesh234.material.color.setStyle("green");
            mesh235.material.color.setStyle("darkgreen");
           
            earth.visible = true;
        }
        if(isper){
            pendulum.visible = true;
            pere1a.visible = true;
            pere1b.visible = true;
            pere1c.visible = true;
            direction = 1 ;
            pere1a.rotation.z = - Math.PI/6;
            PIEscene.background = new THREE.Color("skyblue");
            mesh233.material.color.setStyle("lightgreen");
            mesh234.material.color.setStyle("green");
            mesh235.material.color.setStyle("darkgreen");
           

        }
        if(iscomp){
            bicycle.visible = true;
            compe1a.visible = true;
            PIEscene.background = new THREE.Color("skyblue");
            mesh233.material.color.setStyle("lightgreen");
            mesh234.material.color.setStyle("green");
            mesh235.material.color.setStyle("darkgreen");
        
        }

        PIErender();
        return;
    
    }
    
    ise1 = value;

    if(ise1 == true){
        ise2 = !value;
        ise3 = !value;
        
        allinvisible();
        if(isrect){
            if(slide_ball)
                 slide_ball.visible = true;
            recte1c.visible =true;
            recte1a.visible = true;
            recte1b.visible = true;
            recte1c.position.set(-29,5,0);
            count = 0.01;
            PIEscene.background = new THREE.Color("skyblue");
            mesh233.material.color.setStyle("lightgreen");
            mesh234.material.color.setStyle("green");
            mesh235.material.color.setStyle("darkgreen");
        }
        if(iscurv){
            earth.visible = true;
            circe1c.visible = true;
            circe1b.visible = true;
            circe1a.visible = true;
            PIEscene.background = new THREE.Color("skyblue");
            mesh233.material.color.setStyle("lightgreen");
            mesh234.material.color.setStyle("green");
            mesh235.material.color.setStyle("darkgreen");
            
        }
        if(isper){
            pendulum.visible = true
            pere1a.visible = true;
            pere1b.visible = true;
            pere1c.visible = true;
            direction = 1 ;
            pere1a.rotation.z = -Math.PI/6;
            PIEscene.background = new THREE.Color("skyblue");
            mesh233.material.color.setStyle("lightgreen");
            mesh234.material.color.setStyle("green");
            mesh235.material.color.setStyle("darkgreen");
        }
        if(iscomp){
            bicycle.visible = true;
            compe1a.visible = true;
            PIEscene.background = new THREE.Color("skyblue");
            mesh233.material.color.setStyle("lightgreen");
            mesh234.material.color.setStyle("green");
            mesh235.material.color.setStyle("darkgreen");
        
        }

    }
}
var e2 = "Example 2";
var ise2 = false;
function mye2(value){
    if(value == false &&(ise1 == true || ise3 == true)){
        ise1 = false;
        ise2 = true;
        ise3 = false;
        
        PIEchangeInputCheckbox(e1,false);
        PIEchangeInputCheckbox(e2,true);
        PIEchangeInputCheckbox(e3,false);
        //mye1(true);
        allinvisible();
        if(isrect){
            apple_down.visible = true;
            recte2a.visible = true;
        }
        if(iscurv){
            spin_toy.visible = true;
            circe2a.visible = true;
        }
        if(isper){
            clock_hand.visible = true;
            pere2a.visible = true;
        }
        if(iscomp){
            tennis_ball.visible = true;
            compe1b.visible = true;        
        }


        PIErender();
        return;
    
    }

    ise2 =  value;
    if(ise2 == true){
        ise1 = !value;
        ise3 = !value;
        allinvisible();
        if(isrect){
            apple_down.visible = true;
            recte2a.visible = true;
        }
        if(iscurv){
            spin_toy.visible = true;
            circe2a.visible = true;
        }
        if(isper){
            clock_hand.visible = true;
            pere2a.visible = true;
        }

        if(iscomp){
            tennis_ball.visible = true;
            compe1b.visible = true;        
        }

    }
}
var e3 = "Example 3";
var ise3 = false;
function mye3(value){
    if(value == false &&(ise1 == true || ise2 == true)){
        ise1 = false;
        ise2 = false;
        ise3 = true;
        
        PIEchangeInputCheckbox(e1,false);
        PIEchangeInputCheckbox(e2,false);
        PIEchangeInputCheckbox(e3,true);
        //mye1(true);
        allinvisible();
        if(isrect){
            rocket_launch.visible = true;
            recte3a.visible = true;
        }
        if(iscurv){
            merry_round.visible = true;
            circe3a.visible = true;
        }
        if(isper){
            swing.visible = true;
            pere3a.visible = true;
        }

        if(iscomp){
            atom.visible = true;
            compe1c.visible = true;        
        } 
        PIErender();
        return;
    
    }
    ise3 = value;
    if(ise3 == true){
        ise1 = !value;
        ise2 = !value;
        allinvisible();
        if(isrect){
            rocket_launch.visible = true;
            recte3a.visible = true;
        }
        if(iscurv){
            merry_round.visible = true;
            circe3a.visible = true;
        }
        if(isper){
            swing.visible = true;
            pere3a.visible = true;
        }

        if(iscomp){
            atom.visible = true;
            compe1c.visible = true;        
        }
    }

}
function pieSetInputOutputDisplay(){
	PIEaddInputCheckbox(rect,true,myrectval);
    PIEaddInputCheckbox(curv,false,mycurvval);
    PIEaddInputCheckbox(per,false,myperval);
    PIEaddInputCheckbox(comp,false,mycompval);
    
    PIEaddDisplayCheckbox(e1,true,mye1);
    PIEaddDisplayCheckbox(e2,false,mye2);
    PIEaddDisplayCheckbox(e3,false,mye3);

}
var scalar = 1.0;
function speedUp(){
	if (scalar < 4){
		scalar = scalar*2;
		//speed = speed*2;

	}
}
function speedDown(){
	if (scalar>0.25){
		scalar = scalar/2;
		//speed =speed/2;
	}

}	

function loadExperimentElements() {
    
    PIEsetExperimentTitle("Types of Motion");
    PIEsetDeveloperName("Naval Dhoot");

    initialiseHelp();
    initialiseInfo();
	initialiseScene();
    controls = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
    

    PIEscene.background = new THREE.Color("skyblue");

/**********LINE DIVISION****************
geometry=new THREE.PlaneGeometry(0.1,125);
material=new THREE.MeshBasicMaterial({color:'blue'});
plane=new THREE.Mesh(geometry,material);
plane.position.x=-25;
plane.position.y=-1.5;
PIEaddElement(plane);

geometry=new THREE.PlaneGeometry(0.1,125);
material=new THREE.MeshBasicMaterial({color:'red'});
plane=new THREE.Mesh(geometry,material);
plane.position.x=15;
plane.position.y=-1.5;
PIEaddElement(plane);

*/
/**** Cresting a slider*********/
var triangleGeometry = new THREE.Geometry(); 
triangleGeometry.vertices.push(new THREE.Vector3(-30.0,  2, -3));  
triangleGeometry.vertices.push(new THREE.Vector3(-30.0, -15, -3)); 
triangleGeometry.vertices.push(new THREE.Vector3( 10.0, -15, -3));
triangleGeometry.vertices.push(new THREE.Vector3(-30.0,  2, 3));  
triangleGeometry.vertices.push(new THREE.Vector3(-30.0, -15, 3)); 
triangleGeometry.vertices.push(new THREE.Vector3( 10.0, -15, 3));

triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));
triangleGeometry.faces.push(new THREE.Face3(3, 4, 5));
// Points 1,4,3 and 6 form a rectangle which I'm trying to construct using triangles 0,2,5 and 0,3,5
triangleGeometry.faces.push(new THREE.Face3(0, 2, 5));
triangleGeometry.faces.push(new THREE.Face3(0, 3, 5));

var triangleMaterial = new THREE.MeshBasicMaterial({ 
color:"red", 
side:THREE.DoubleSide 
});

 recte1a = new THREE.Mesh(triangleGeometry, triangleMaterial); 
recte1a.position.set(1, 0.0, 0.0); 

PIEaddElement(recte1a);


var triangleGeometry = new THREE.Geometry(); 
triangleGeometry.vertices.push(new THREE.Vector3(-30.0,  2, -3));  
triangleGeometry.vertices.push(new THREE.Vector3(-30.0, -15, -3)); 
triangleGeometry.vertices.push(new THREE.Vector3( 10.0, -15, -3));
triangleGeometry.vertices.push(new THREE.Vector3(-30.0,  2, 3));  
triangleGeometry.vertices.push(new THREE.Vector3(-30.0, -15, 3)); 
triangleGeometry.vertices.push(new THREE.Vector3( 10.0, -15, 3));

//triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));
//triangleGeometry.faces.push(new THREE.Face3(3, 4, 5));
triangleGeometry.faces.push(new THREE.Face3(0, 2, 5));
triangleGeometry.faces.push(new THREE.Face3(0, 3, 5));

var triangleMaterial = new THREE.MeshBasicMaterial({ 
color:"yellow", 
side:THREE.DoubleSide 
});

 recte1b = new THREE.Mesh(triangleGeometry, triangleMaterial); 
recte1b.position.set(1, 0.0, 0.0); 

PIEaddElement(recte1b);


/*******Ball **********/
recte1c = new THREE.Mesh(new THREE.SphereGeometry(3,24,32),new THREE.MeshPhongMaterial({color:"blue"}));
PIEaddElement(recte1c);
recte1c.position.set(-29,5,0);
PIEdragElement(recte1c);
PIEsetDrag(recte1c,mydrag);
PIEsetHoverOFF(recte1c, enablecontrols);
PIEsetHoverON(recte1c, disablecontrols);


/******Apple falling Image**********/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('apple.jpeg') });
recte2a = new THREE.Mesh(new THREE.BoxGeometry(30,20,1),meshMaterial);
PIEaddElement(recte2a);
recte2a.position.set(0,-5,0);
recte2a.visible = false;


/********Rocket Launching Image************/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('rocket.jpg') });
recte3a = new THREE.Mesh(new THREE.BoxGeometry(30,20,1),meshMaterial);
PIEaddElement(recte3a);
recte3a.position.set(0,-5,0);
recte3a.visible = false;



/*******Moon Around the Earth Image***********/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('earth.jpg') });
circe1a = new THREE.Mesh(new THREE.SphereGeometry(4,24,32),meshMaterial);
PIEaddElement(circe1a);


circe1c = new THREE.Mesh(new THREE.SphereGeometry(0.1,24,32),new THREE.MeshBasicMaterial({color:"red"}));
PIEaddElement(circe1c);


var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('moon.jpg') });
circe1b = new THREE.Mesh(new THREE.SphereGeometry(2.5,24,32),meshMaterial);
circe1c.add(circe1b);
circe1b.position.set(10,0,0);

circe1a.visible = true;
circe1b.visible = true;
circe1c.visible = true;

/**** Spinning Toy Image***********/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('toy.jpg') });
circe2a = new THREE.Mesh(new THREE.BoxGeometry(30,20,1),meshMaterial);
PIEaddElement(circe2a);
circe2a.position.set(0,-5,0);
circe2a.visible = false;


/***********Merry Round Image*********/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('merry.jpeg') });
circe3a = new THREE.Mesh(new THREE.BoxGeometry(30,20,1),meshMaterial);
PIEaddElement(circe3a);
circe3a.position.set(0,-5,0);
circe3a.visible = false;


/**********************Clock Hands**************/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('clock.jpg') });
pere2a = new THREE.Mesh(new THREE.BoxGeometry(30,20,1),meshMaterial);
PIEaddElement(pere2a);
pere2a.position.set(0,-5,0);
pere2a.visible = false;


/*******Swing Image**********/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('swing.jpg') });
pere3a = new THREE.Mesh(new THREE.BoxGeometry(28,28,1),meshMaterial);
PIEaddElement(pere3a);
pere3a.position.set(0,-5,0);
pere3a.visible = false;


/*******Pendulum*************/
pere1a = new THREE.Mesh(new THREE.SphereGeometry(0.5,24,32),new THREE.MeshPhongMaterial({color:"green"}));
PIEaddElement(pere1a);
pere1a.position.set(-2,10,0);

pere1b = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,20,32),new THREE.MeshPhongMaterial({color:"black"}));
pere1a.add(pere1b);
pere1b.position.set(0,-10,0);

pere1c = new THREE.Mesh(new THREE.SphereGeometry(2,24,32),new THREE.MeshPhongMaterial({color:"blue"}));
pere1a.add(pere1c);
pere1c.position.set(0,-20,0);

pere1a.rotation.z = -Math.PI/6;
direction = 1;
pere1a.visible = false;
pere1b.visible = false;
pere1c.visible =false;


/***********Bicycle Image*****/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('bicycle.jpg') });
compe1a = new THREE.Mesh(new THREE.BoxGeometry(30,20,1),meshMaterial);
PIEaddElement(compe1a);
compe1a.position.set(0,-5,0);
compe1a.visible = false;

/***********Tennsi Ball*************/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('cricket.jpeg') });
compe1b = new THREE.Mesh(new THREE.BoxGeometry(30,20,1),meshMaterial);
PIEaddElement(compe1b);
compe1b.position.set(0,-5,0);
compe1b.visible = false;

/*********Atoms********/
var meshMaterial = new THREE.MeshBasicMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('atoms.jpg') });
compe1c = new THREE.Mesh(new THREE.BoxGeometry(30,20,1),meshMaterial);
PIEaddElement(compe1c);
compe1c.position.set(0,-5,0);
compe1c.visible = false;



//recte1c.position.set(10,-11.4,0);
    //var recte1 = new 
    var groundMaterial = new THREE.MeshBasicMaterial(  );
 
    mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 6000, 6000 ), groundMaterial );
    mesh233.position.y = - 19;
    mesh233.material.color.set("green" );
    mesh233.rotation.x = - Math.PI / 2;
    PIEaddElement(mesh233);

	
	
	
    var groundMaterial = new THREE.MeshBasicMaterial(  );
    mesh234 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 550, 5550 ), groundMaterial );
    mesh234.position.y = - 17;
    mesh234.material.color.set("green" );
    mesh234.rotation.x = - Math.PI / 2;
    PIEaddElement(mesh234);
    var groundMaterial = new THREE.MeshBasicMaterial(  );
 
    mesh235 = new THREE.Mesh( new THREE.PlaneBufferGeometry(300, 300 ), groundMaterial );
    mesh235.position.y = - 15;
    mesh235.material.color.set("green" );
    mesh235.rotation.x = - Math.PI / 2;
    PIEaddElement(mesh235);

    var loader = new THREE.FontLoader();
        loader.load( 'helvetiker_regular.typeface.json', function ( font ) {
            var textGeometry = new THREE.TextGeometry("(Rectilinear Motion)", {
                font: font,
                size: 0.8,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"red"}
            );
            rectMotion = new THREE.Mesh( textGeometry, textMaterial );
            rectMotion.position.set(-6,8,0);
            PIEaddElement( rectMotion );
           // rectMotion.visible = false;

		   
		   
            var textGeometry = new THREE.TextGeometry("(Circular Motion)", {
                font: font,
                size: 0.8,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"red"}
            );
            circMotion = new THREE.Mesh( textGeometry, textMaterial );
            circMotion.position.set(-6,8,0);
            PIEaddElement( circMotion );
            circMotion.visible = false;


            var textGeometry = new THREE.TextGeometry("(Periodic Motion)", {
                font: font,
                size: 0.8,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"red"}
            );
            perMotion = new THREE.Mesh( textGeometry, textMaterial );
            perMotion.position.set(-6,10.7,0);
            PIEaddElement( perMotion );
            perMotion.visible = false;

            var textGeometry = new THREE.TextGeometry("(Complex Motion)", {
                font: font,
                size: 0.8,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"red"}
            );
            compMotion = new THREE.Mesh( textGeometry, textMaterial );
            compMotion.position.set(-6,9.7,0);
            PIEaddElement( compMotion );
            compMotion.visible = false;
            
            var count = 0;
            var textGeometry = new THREE.TextGeometry("Sliding Ball Through Fisal Patti", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
			slide_ball = new THREE.Mesh( textGeometry, textMaterial );
            slide_ball.position.set(-23,10,0);
            PIEaddElement( slide_ball );
            
			//slide_ball.visible = false;

            var textGeometry = new THREE.TextGeometry("Apple Falling Down The Tree", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            apple_down = new THREE.Mesh( textGeometry, textMaterial );
            apple_down.position.set(-23,10,0);
            PIEaddElement( apple_down );
            apple_down.visible = false;

           var textGeometry = new THREE.TextGeometry("Rocket Launching in Space", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            rocket_launch = new THREE.Mesh( textGeometry, textMaterial );
            rocket_launch.position.set(-23,10,0);
            PIEaddElement( rocket_launch );
            rocket_launch.visible  = false;

			
			
			
            var textGeometry = new THREE.TextGeometry("Moon Revolving Around Earth", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            earth = new THREE.Mesh( textGeometry, textMaterial );
            earth.position.set(-20,10,0);
            PIEaddElement( earth );
            earth.visible = false;

            var textGeometry = new THREE.TextGeometry("Spinning Toy", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            spin_toy = new THREE.Mesh( textGeometry, textMaterial );
            spin_toy.position.set(-10,10,0);
            PIEaddElement( spin_toy );
            spin_toy.visible = false;
            
			
			
            var textGeometry = new THREE.TextGeometry("Merry_Go_Round", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            merry_round = new THREE.Mesh( textGeometry, textMaterial );
            merry_round.position.set(-13,10,0);
            PIEaddElement( merry_round );
           merry_round.visible = false;

		   
            var textGeometry = new THREE.TextGeometry("A Simple Pendulum", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            pendulum = new THREE.Mesh( textGeometry, textMaterial );
            pendulum.position.set(-13,12,0);
            PIEaddElement( pendulum );
            pendulum.visible = false;

			
             var textGeometry = new THREE.TextGeometry("Clock Hands Motion", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            clock_hand = new THREE.Mesh( textGeometry, textMaterial );
            clock_hand.position.set(-15,12,0);
            PIEaddElement( clock_hand );
            clock_hand.visible= false;

             var textGeometry = new THREE.TextGeometry("Motion of Swing", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color: "red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            swing = new THREE.Mesh( textGeometry, textMaterial );
            swing.position.set(-14,12,0);
            PIEaddElement(swing);
            swing.visible = false;

			
            var textGeometry = new THREE.TextGeometry("Motion of Bicycle ", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color:"red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            bicycle = new THREE.Mesh( textGeometry, textMaterial );
            bicycle.position.set(-13,12,0);
            PIEaddElement(bicycle);
            bicycle.visible = false;


            var textGeometry = new THREE.TextGeometry("Tennis Ball Flying in the Air", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color:"red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            tennis_ball = new THREE.Mesh( textGeometry, textMaterial );
            tennis_ball.position.set(-20,12,0);
            PIEaddElement(tennis_ball);
            tennis_ball.visible = false;            
           
           var textGeometry = new THREE.TextGeometry("Motion of Atom Particles", {
                font: font,
                size: 2.5,
                height:0.5,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshPhongMaterial( 
                { color:"red",transparent:true,opacity:1.0,specular:"#B6C015"}
            );
            atom = new THREE.Mesh( textGeometry, textMaterial );
            atom.position.set(-17,12,0);
            PIEaddElement(atom);
            atom.visible = false;
                    
               
        });

    pieSetInputOutputDisplay();
 
    document.getElementById("start").addEventListener("click", setOn);
    document.getElementById("stop").addEventListener("click",setOff);
    
    resetExperiment();
    PIEsetAreaOfInterest(0, 20, -5,-20);
if(window.innerWidth>600 && window.innerWidth<1000)
{
	PIEsetAreaOfInterest(-20,30,-5,-40);
}


if(window.innerWidth < 600)
	{
		
	PIEsetAreaOfInterest(-15,40,-5,-50);
	}









	
   //PIEadjustCamera(0,0,65);
 	

 //document.getElementById("start").click();
  //document.getElementById("stop").click();
   
    PIErender();
}
function resetExperiment()
{	
    myrectval(true);
    PIEchangeInputCheckbox(rect,true);
    //mye1(true);
	PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
	
	
	PIEadjustCamera(0,0,5);
	PIErender();
}
var  count= 0.01;
function updateExperimentElements(t, dt)
{   
    PIEchangeDisplayCheckbox(e1,ise1);
    PIEchangeDisplayCheckbox(e2,ise2);
    PIEchangeDisplayCheckbox(e3,ise3);
    if(iscurv && ise1){
        circe1c.rotation.y +=0.01;
        circe1a.rotation.z += 0.001;
        circe1a.rotation.y += 0.002;
        circe1a.rotation.x += 0.0015;
    }
    if(isrect && ise1){
        if(recte1c.position.y >= -12){
        recte1c.position.x += 0.1*count;
        recte1c.position.y -= (16.4/39)*(0.1)*count;
        count += 0.05;    
        recte1c.rotation.z += 0.05;
        }
        else{
            count = 0;
        }
    }
    if(isper && ise1){
        if(direction > 0){
            var fast = 0.1;
            if( pere1a.rotation.z < Math.PI/6){
             pere1a.rotation.z += 0.01;
            }
            else{
             direction  = -1;
            }
        }
        if(direction < 0){
            var fast = 0.1;
            if(pere1a.rotation.z > -Math.PI/6){
              pere1a.rotation.z -= 0.01;
            }
            else{
             direction  = 1;
            }
        }
    }

}

