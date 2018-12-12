//---------------------Global Variables-------------------------
//canvas variables
var canvas = document.getElementById('dataViz');
var context = canvas.getContext('2d');

//booleans for buttons of variables
var activeBtn = false;
var activeBtn2 = false;
var activeBtn3 = false;
var activeBtn4 = false;

var canadaBtnState = 0;

//count the amount of citites that have arrived to their destination for each variable
var citiesTotalCount = 0;
var citiesDomesticCount = 0;
var citiesTransborderCount = 0;
var citiesOtherDomesticCount = 0;

//canvas height and width
var canvasWidth = canvas.width;
var canvasHeignt = canvas.height;
var halfWidth = canvas.width/2;
var halfHeight = canvas.height/2;

var cities = [9];

var white = "white";
var black = "black";

var frames = 0;
var seconds = 0;
var minutes = 0;
var treshold = 10;

//scaling x and y values to canvas height and width
var scaleX = d3.scaleLinear()
                .domain([0, 10000000])
                .range([0, halfHeight]);
var scaleY = d3.scaleLinear()
               .domain([0, 200])
               .range([0, canvasWidth]);


//get the data from csv file
//call the main function
parseData('../bin/data/AirPassengerTraffic.csv', main);

//parsing data function
function parseData(path, callBack)
{
    Papa.parse(path, {
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}

//-----------------Interactive components--------------------
document.getElementById("total").addEventListener("click", updateTotal);
document.getElementById("domestic").addEventListener("click", updateDomestic);
// document.getElementById("transborder").addEventListener("click", updateTransborder);
// document.getElementById("other").addEventListener("click", updateOther);

//document.getElementById("canada").addEventListener("click", updateBtnCanada);
// document.getElementById("halifax").addEventListener("click", updateDomestic);
// document.getElementById("montreal").addEventListener("click", updateTransborder);
// document.getElementById("ottawa").addEventListener("click", updateOther);
// document.getElementById("toronto").addEventListener("click", updateOther);
// document.getElementById("winnipeg").addEventListener("click", updateDomestic);
// document.getElementById("calgary").addEventListener("click", updateTransborder);
// document.getElementById("edmonton").addEventListener("click", updateOther);
// document.getElementById("vancouver").addEventListener("click", updateOther);

function updateBtnCanada()
{
  canadaBtnState = 1;
}

function updateTotal()
{
  activeBtn = true;
  citiesTotalCount = 0;
}

function updateDomestic()
{
  activeBtn2 = true;
  citiesDomesticCount = 0;
}

function updateTransborder()
{
  activeBtn3 = true;
  citiesTransborderCount = 0;
}

function updateOther()
{
  activeBtn4 = true;
  citiesOtherDomesticCount = 0;
}

function reset()
{
  activeBtn = false;
  activeBtn2 = false;
  activeBtn3 = false;
  activeBtn4 = false;
}

//-----------------MAIN METHOD THAT CONTROLS EVERYTHING--------------------
function main(data)
{
  //---------------------Instantiation-------------------------
  let step = 4;
  let first = 7;

  let space = 50;

  for(let i = 0; i < 9; i++)
  {
    //instantiate the nine cities
    cities[i] = new City(0, space/2+space*i, 200, 200);

    //---------------Convert Data to Objects--------------------
    //structure the data in a meaningful way
    //within an object and parameters
    cities[i].data = setStructureOfData(data, first+step*i);
    cities[i].convertDataToNum();

    // let d = scaleX(cities[i].data.total[0]);
    // console.log(d);
  }

  //---------------------animation-------------------------
  requestAnimationFrame(animate);

  function animate()
  {
    //create a timeer
    //timer();

    // if(canadaBtnState == 1)
    // {
    //   console.log("here");
    //   increaseOpacity(0);
    // } else {
    //   decreaseOpacity(0);
    // }

    //checking for pressed buttons
    //total button interaction
    if(activeBtn)
    {
      console.log("running first button");
      for(let i = 0; i < cities.length; i++)
      {
        //update the movement
        let target = scaleX(cities[i].data.total[0]);
        cities[i].updateRight(target);

        // //check the movement has finished
        let diff = difference(cities[i].right, target);
        if(diff < 5 && cities[i].arrivedToTheRight == false)
        {
          citiesTotalCount++;
          console.log("Total Counting: " + citiesTotalCount);
          cities[i].arrivedToTheRight = true;
        }
      }

      //check if all cities have arrived to their destination
      if(citiesTotalCount == cities.length)
      {
        console.log("arrived to the final step");
        //reset all the necessary interaciive components
        console.log(citiesTotalCount);
        // citiesTotalCount = 0;
        // activeBtn = false;
        // //console.log(citiesTotalCount);
        //
        // //reset all the booleans of the cities
        // for(let i = 0; i < cities.length; i++)
        // {
        //   cities[i].arrivedToTheRight = false;
        //   console.log(cities[i].arrivedToTheRight);
        // }
        reset();

        for(let i = 0; i < cities.length; i++)
        {
          cities[i].arrivedToTheRight = false;
        }
      }
    }

    if(activeBtn2)
    {
      console.log("running second button");
      for(let i = 0; i < cities.length; i++)
      {
        //update the movement
        let target = scaleX(cities[i].data.total[1]);
        cities[i].updateRight(target);

        // //check the movement has finished
        let diff = difference(cities[i].right, target);
        if(diff < 5 && cities[i].arrivedToTheRight == false)
        {
          citiesDomesticCount++;
          console.log("Domestic Counting: " + citiesDomesticCount);
          cities[i].arrivedToTheRight = true;
        }
      }

      //check if all cities have arrived to their destination
      if(citiesDomesticCount == cities.length)
      {
        console.log("arrived to the final step");
        //reset all the necessary interaciive components
        console.log(citiesDomesticCount);

        reset();

        for(let i = 0; i < cities.length; i++)
        {
          cities[i].arrivedToTheRight = false;
        }
      }
    }

  //   if(activeBtn3)
  //   {
  //     for(let i = 0; i < cities.length; i++)
  //     {
  //       let target = scaleX(cities[i].data.transborder[0]);
  //       cities[i].updateRight(target);
  //     }
  //   }
  //
  //   if(activeBtn4)
  //   {
  //     for(let i = 0; i < cities.length; i++)
  //     {
  //       let target = scaleX(cities[i].data.other[0]);
  //       cities[i].updateRight(target);
  //     }
  //   }
  //

    //clear the background
    context.clearRect(0,0,canvasWidth, canvasHeignt);

    for(let i = 0; i < cities.length; i++)
    {
      cities[i].draw();
    }

    requestAnimationFrame(animate);
  }
}

//-----------------City Object and Methods--------------------
function City(x, y, left, right)
{
  //position of each city
  this.x = x;
  this.y = y;
  this.left = left;
  this.right = right;
  this.speed = 200;
  this.opacity = 255;
  this.color = 'rgba(0,0,0,'+this.opacity+')';

  this.arrivedToTheRight = false;

  //instantiate the amount of shapes
  let rectangles = [2];
  let circles = [2];
  let radius = 5;

  //create the appropriate shapes
  //right side
  rectangles[0] = new Rectangle(this.x, this.y, this.right, radius, this.color);
  circles[0] = new Circle(this.x+this.right, this.y+radius/2, radius, this.color);
  // //left side
  rectangles[1] = new Rectangle(this.x, this.y-radius/2, -this.left, radius, this.color);
  circles[1] = new Circle(this.x-this.left, this.y, radius, this.color);

  this.draw = function()
  {
    rectangles[0].draw();
    rectangles[1].draw();
    circles[0].draw();
    circles[1].draw();
  };

  this.updateRight = function(target)
  {
    //-------------------Bottom Update----------------
    //find the difference for movement
    let distance = difference(this.right, target);

    //update the movement every frame
    this.right = this.right + distance/this.speed;

    //update the circle and rect position
    circles[0].x = this.x+this.right;
    rectangles[0].w = this.right;
  };

  this.updateLeft = function(target)
  {
    //-------------------Bottom Update----------------
    //find the difference for movement
    let distance = difference(this.left, target);
    //update the movement every frame
    this.left = this.left + distance/this.speed;

    //update the circle and rect position
    circles[1].x = this.x-this.left;
    rectangles[1].w = -this.left;
  };

  //control of data related to the city
  this.data = new Data();

  this.convertDataToNum = function()
  {
    for(let i = 0; i < 5; i++)
    {
      var currentTotal = this.data.total[i];
      //remove the commas
      currentTotal = currentTotal.split(',').join('');
      //convert to integer
      newTotal = parseInt(currentTotal, 10);
      //assign the new data to its place
      this.data.total[i] = newTotal;

      var currentDomestic = this.data.domestic[i];
      currentDomestic = currentDomestic.split(',').join('');
      newDomestic = parseInt(currentDomestic, 10);
      this.data.domestic[i] = newDomestic;

      var currentTransborder = this.data.transborder[i];
      currentTransborder = currentTransborder.split(',').join('');
      newTransborder = parseInt(currentTransborder, 10);
      this.data.transborder[i] = newTransborder;


      var currentOther = this.data.other[i];
      currentOther = currentOther.split(',').join('');
      newOther = parseInt(currentOther, 10);
      this.data.other[i] = newOther;
    }
  };
}

//-----------------Shape Objects and Methods--------------------
function Circle(x, y, r, color)
{
  //parameters
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;

  //methods
  //draw circle on canvas
  this.draw = function()
  {
    context.beginPath();

    //-------------Circle drawing-------------
    //circle at top
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    context.fillStyle = this.color;
    context.fill();
    context.strokeStyle = this.color;
    context.stroke();
    context.closePath();
  };
}

function Rectangle(x, y, w, h, color)
{
  //parameters
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;

  //methods
  //draw rectangle on canvas
  this.draw = function()
  {
    context.beginPath();

    //-------------Line drawing-------------
    context.rect(this.x, this.y, this.w, this.h);
    context.fillStyle = this.color;           //add rect color
    context.fill();
    context.strokeStyle = this.color;
    context.stroke();
    context.closePath();
  };
}

//-----------------Data Object and Methods--------------------
function Data()
{
  //parameters
  this.total = 0;
  this.domestic = 0;
  this.transborder = 0;
  this.other = 0;
}

function setStructureOfData(file, row)
{
  //make temporary arrays for parameters
  let tot = [5];
  let dom = [5];
  let trans = [5];
  let other = [5];

  for(let i = 0; i < 5; i++)
  {
    tot[i] = file[row][2+i];
    dom[i] = file[row+1][2+i];
    trans[i] = file[row+2][2+i];
    other[i] = file[row+3][2+i];
  }

  //create a temporary data object
  let object = new Data();

  //object.years = years;
  object.total = tot;
  object.domestic = dom;
  object.transborder = trans;
  object.other = other;

  return object;
}

//-----------------Custom Methods--------------------
function timer()
{
  frames++;

  if(frames == 60)
  {
    seconds++;
    frames = 0;
    console.log("current second: " + seconds);
  }
  if(seconds == 60)
  {
    minutes++;
    seconds = 0;
  }
  if(minutes == 60)
  {
    hours++;
    minutes = 0;
  }
}

function increaseOpacity(index)
{
  for(let i = 0; i < 255; i++)
  {
    cities[index].opacity = i;
    //console.log("here");
  }
}

function decreaseOpacity(index)
{
  for(let i = 255; i > 0; i--)
  {
    cities[index].opacity = i;
  }
}

function random(multiplier)
{
  return Math.random()*multiplier;
}

function difference(currentData, newData)
{
  return newData - currentData;
}

function getSpacing(width, amount)
{
  let calculation = canvasWidth/amount
  return calculation;
}
