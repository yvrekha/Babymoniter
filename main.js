song="";
status1 = "";
objects=[];
function preload(){
    song=loadSound("naruto_ringtone.mp3");
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380)
    video.hide()
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
status1=true
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}
function draw(){
    image(video,0,0,380,380);
    if(status1 !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for (var i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            //document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+ objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+percent + "%", objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person")
            {
                document.getElementById("number_of_objects").innerHTML="Baby Found";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                console.log("play");
                song.play();
            }

        }
        if(objects.length==0){
            document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                console.log("play");
                song.play();
        }
    }
    
   
}
function modelLoaded(){
    console.log("Model Loaded!")
    status1 = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}