class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(){
        this.lastFed = lastFed
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
           }

    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){
        var x=  80, y=100;

        imageMode(CENTER);

        if(this.foodStock != 0){
            for(var i =0; i<this.foodStock; i++){
                if(i%10==0){
                    x=80; 
                    y+=50;
                }
                image(this.image,x,y, 50,50);
                x+=30;
            }
        }
    }
}