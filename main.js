var statusVar="";
var resultsArray=[];
var puppies="";

function preload(){
    puppies=loadImage("puppies.jpg");
}

function setup(){
    canvas=createCanvas(700,500);
    canvas.center();
    model=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects...";
}

function modelLoaded(){
    console.log("Model loaded");
    statusVar=true;
    model.detect(puppies,getResults);
}

function getResults(error,results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        resultsArray=results;
    }
}

function draw(){
    image(puppies,0,0,700,500);
    if (statusVar!=""){
        for (var i=0;i<results.length;i++){
            document.getElementById("status").innerHTML="Status: Objects detected";
            fill("green");
            confidence=results[i].confidence*100;
            text(results[i].label+", "+confidence+"% sure",results[i].x,results[i].y);
            noFill();
            stroke("green");
            rect(results[i].x,results[i].y,results[i].width,results[i].height)
        }
    }
}