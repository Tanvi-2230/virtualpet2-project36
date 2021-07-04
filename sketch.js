//Create variables here
var dog, database, foodS, foodStock;
var dogImg, happyDogImg;
var backgroundImg;
var fedTime, lastFed, feed;
var foodObj


function preload()
{
	//load images here
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");

}

function setup() {
	createCanvas(1000, 400);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
 

  foodObj = new Food();

  dog = createSprite(width/2-30,height/2, 50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed= createButton("Feed The Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  
}


function draw() {  
  background(46, 139, 87);

  foodObj.display();

  fedTime= database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed =  data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>= 12){
    text("Last Fed:" + lastFed%12 + "PM", 350, 30);
  } else if(lastFed==0){
    text("Last Fed: 12AM", 350, 30);
  }else {
    text("Last Fed:" + lastFed + "AM", 350, 30);

    
}
  
drawSprites();
  // if(foodS !== undefined){

  //   textSize(20);
  //   fill(0);
  //   text("NOTE: Press UP_ARROW to feed the Drago milk!", width/2-200, 100 );
  //   text("Food left:"+ foodS, width/2-40, 130);

  //   if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(happyDogImg)
  //  }
  //   if(keyWentUp(UP_ARROW)){
  //   dog.addImage(dogImg)
  //  }
  //  if(foodS === 0){
  //    foodS =  20;
  //  }
 
}
 



function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.deductFood()
  foodObj.updateFoodStock(foodObj.getFoodStock());
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

// function writeStock(x){
//   if(x<=0){
//     x=0
//   }else{
//     x = x-1;
//   }
//   database.ref("/").update({
//     Food:x
//   })
//   }
  

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }


