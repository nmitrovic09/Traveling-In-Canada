//---------------------Global Variables-------------------------
var canvas = document.getElementById('dataViz');
var context = canvas.getContext('2d');

//canvas height and width
var canvasWidth = canvas.width;
var canvasHeignt = canvas.height;
var halfWidth = canvas.width/2;
var halfHeight = canvas.height/2;

//arrays for each city
var cities = [9];
var rectangles = [9];
var circles = [9];
var newBottom = 0;
var newTop = 0;
var white = "white";
var black = "black";

//buttons selectors
let totalButton = document.querySelector("total");
let domesticButton = document.querySelector("domestic");
let transborderButton = document.querySelector("transborder");
let otherButton = document.querySelector("other");

//scaling x and y values to canvas height and width
var scaleY = d3.scaleLinear()
                .domain([0, 30000000])
                .range([0, halfHeight]);
var scaleX = d3.scaleLinear()
               .domain([0, 200])
               .range([0, canvasWidth]);

//get the data from csv file
parseData('../bin/data/AirPassengerTraffic.csv', main);

//create animation click functions
var activeTotalAnim = false;
var totalCounter = 0;

var activeDomesticAnim = false;
var domesticCounter = 0;

var activeTransborderControl = false;
var activeTransborderControlCounter = 0;

var animOtherControl = false;
var activeOtherControlCounter = 0;

document.getElementById("total").addEventListener("click", updateTotalPassengers);

function updateTotalPassengers()
{
  activeTotalAnim = true;

}

document.getElementById("domestic").addEventListener("click", updateDomesticPassengers);

function updateDomesticPassengers()
{
  activeDomesticAnim = true;
}

document.getElementById("transborder").addEventListener("click", updateTransborderPassengers);

function updateTransborderPassengers()
{
  activeTransborderAnim = true;

}

document.getElementById("other").addEventListener("click", updateOtherPassengers);

function updateOtherPassengers()
{
  activeOtherAnim = true;
}

// document.getElementById("transborder").addEventListener("click", updateTransborderPassengers);
//
// function updateTransborderPassengers()
// {
//   animTransborderControl = true;
// }
//
// document.getElementById("other").addEventListener("click", updateOtherPassengers);
//
// function updateOtherPassengers()
// {
//   animOtherControl = true;
// }

function resetTotal()
{
  activeTotalAnim = false;
  totalCounter = 0;

  citiesArrivedToPos();

  console.log("reseting Total");
}

function resetDomestic()
{
  activeDomesticAnim = false;
  domesticCounter = 0;

  citiesArrivedToPos();

  console.log("reseting Domestic");
}

function citiesArrivedToPos()
{
  for(let i = 0; i < cities.length; i++)
  {
    cities[i].arrived = false;
  }
}

//update the values on canvas
function main(data)
{
  //---------------------Instantiation-------------------------
  let first = 7;
  let step = 4;

  for(let i = 0; i < 9; i++)
  {
    //create the objects
    let leftside = 50;
    let space = 50;
    cities[i] = new Shape(leftside+i*space, halfHeight, 200, 200);
    cities[i].draw();
    //------------------------Convert Data to Objects-----------------
    //structure the data in a meaningful way
    //within an object and parameters
    cities[i].data = setStructureOfData(data, first+step*i);
    //console.log(cities[i].data);
  }

  //---------------------animation-------------------------
  requestAnimationFrame(animate);

  function animate()
  {
    //clear the background
    context.clearRect(0,0,canvasWidth, canvasHeignt);

    let years = 0;

    //---------------------Interaction------------------------

    if(activeTotalAnim)
    {
      for(let i = 0; i < cities.length; i++)
      {
        console.log("running Total");
        let newTarget = scaleY(convertDataToNum(cities[i].data.total[years]));
        cities[i].updateTop(newTarget);
        cities[i].draw();

        let diff = difference(cities[i].top, newTarget);

        if(diff < 5 && cities[i].arrived == false)
        {
          totalCounter++;
          console.log(totalCounter);
          cities[i].arrived = true;
        }
      }

      if(cities.length == totalCounter)
      {
        resetTotal();
      }
    }

    if(activeDomesticAnim)
    {
      for(let i = 0; i < cities.length; i++)
      {
        console.log("running Domestic");
        let newTarget = scaleY(convertDataToNum(cities[i].data.domestic[years]));
        cities[i].updateTop(newTarget);
        cities[i].draw();

        let diff = difference(cities[i].top, newTarget);

        if(diff < 1 && cities[i].arrived == false)
        {
          domesticCounter++;
          console.log(domesticCounter);
          cities[i].arrived = true;
        }
      }

      //check if all cities have arrived to their destination
      if(cities.length == domesticCounter)
      {
        resetDomestic();
      }
    }

    // if(animTransborderControl)
    // {
    //   for(let i = 0; i < cities.length; i++)
    //   {
    //     let newTarget = scaleY(convertDataToNum(cities[i].data.transborder[years]));
    //     cities[i].updateTop(newTarget);
    //     cities[i].draw();
    //
    //     // if(difference(cities[i].top, newTarget) < 1)
    //     // {
    //     //   animTotalControl = false;
    //     // }
    //   }
    // }
    //
    // if(animOtherControl)
    // {
    //   for(let i = 0; i < cities.length; i++)
    //   {
    //     let newTarget = scaleY(convertDataToNum(cities[i].data.other[years]));
    //     cities[i].updateTop(newTarget);
    //     cities[i].draw();
    //     //
    //     // if(difference(cities[i].top, newTarget) < 1)
    //     // {
    //     //   animTotalControl = false;
    //     // }
    //   }
    // }
    //
    // if(animDomesticControl)
    // {
    //   for(let i = 0; i < cities.length; i++)
    //   {
    //     let newPos = scaleY(convertDataToNum(cities[i].data.domestic[years]));
    //     cities[i].draw();
    //     cities[i].updateTop(newPos);
    //   }
    // }
    //
    // if(animTransborderControl)
    // {
    //   for(let i = 0; i < cities.length; i++)
    //   {
    //     let newPos = scaleY(convertDataToNum(cities[i].data.transborder[years]));
    //     cities[i].draw();
    //     cities[i].updateTop(newPos);
    //   }
    // }

    //draw all the cities
    for(let i = 0; i < cities.length; i++)
    {
      cities[i].draw();
      //cities[i].update();
    }

    requestAnimationFrame(animate);
  }
}

//----------------------Objects--------------------------
//Object shape for every city
function Shape(x, y, bottom, top)
{
  this.x = x;
  this.y = y;
  this.bottom = bottom;
  this.top = top;
  this.color = "black";

  this.vx = 1;
  this.vy = 1;
  this.speed = 30;
  this.arrived = false;

  this.data = new Data();

  let circles = [2];
  let rectangles = [2];
  let radius = 5;

  // //bottom rectangle drawing
  rectangles[0] = new Rectangle(this.x-radius/2, this.y, radius, this.bottom, white);
  // //top rectangle drawing
  rectangles[1] = new Rectangle(this.x-radius/2, y, radius, -this.top, white);

  // //bottom circle drawing
  circles[0] = new Circle(this.x, this.y+this.bottom, radius, white);
  // //top circle drawing
  circles[1] = new Circle(this.x, this.y-this.top, radius, white);

  this.draw = function()
  {
    rectangles[0].draw();
    rectangles[1].draw();
    circles[0].draw();
    circles[1].draw();
  };

  //update the new bottom and top according to the
  this.updateBottom = function(target)
  {
    //-------------------Bottom Update----------------
    //find the difference for movement
    let distance = difference(this.bottom, target);
    //update the movement every frame
    this.bottom = this.bottom + distance/this.speed;

    //update the circle and rect position
    circles[0].y = this.y+this.bottom;
    rectangles[0].h = this.bottom;
  };

  this.updateTop = function(target)
  {
    //-------------------Bottom Update----------------
    //find the difference for movement
    let distance = difference(this.top, target);
    //update the movement every frame
    this.top = this.top + distance/this.speed;

    //update the circle and rect position
    circles[1].y = this.y-this.top;
    rectangles[1].h = -this.top;
  };
  // this.checkDifferenceTop = function(val)
  // {
  //
  // };
}

//Circle object
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
    context.strokeStyle = black;
    context.stroke();

    context.closePath();
  };
}

//Rectangle object
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
    context.strokeStyle = black;
    context.stroke();
    context.closePath();
  };
}

//objects to structe the excel data
function Data()
{
  //parameters
  this.years = 0;
  this.total = 0;
  this.domestic = 0;
  this.transborder = 0;
  this.other = 0;
}

//function that organizes the data appropriately
function setStructureOfData(fileData, row)
{
  //make temporary arrays for parameters
  let tot = [5];
  let dom = [5];
  let trans = [5];
  let other = [5];

  for(let i = 0; i < 5; i++)
  {
    tot[i] = fileData[row][2+i];
    dom[i] = fileData[row+1][2+i];
    trans[i] = fileData[row+3][2+i];
    other[i] = fileData[row+4][2+i];
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

//------------------Custom Functions--------------------
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

function convertDataToNum(data)
{
  let convertedData = 0;

  for (let i = 0; i < data.length; i++) {
    if(data.charAt(i) == 0 || data.charAt(i) == 1 || data.charAt(i) == 2
       || data.charAt(i) == 3 || data.charAt(i) == 4 || data.charAt(i) == 5
       || data.charAt(i) == 6 || data.charAt(i) == 7 || data.charAt(i) == 8
       || data.charAt(i) == 9)
             {
               convertedData = convertedData+data.charAt(i);
             }
  }

  //convert the string to integer
  let finalData = parseInt(convertedData, 10)

  return finalData;
}

function create2DArray(numRows, numColumns)
{
  let array = new Array(numRows);
  for(let i = 0; i < numColumns; i++)
  {
    array[i] = new Array(numColumns);
  }
}

function difference(currentData, newData)
{
  return newData - currentData;
}

function random(multiplier)
{
  return Math.random()*multiplier;
}

function getComponentData(array, index)
{
  let returnedArray = [5];
  for(let i = 0; i < array[index].length; i++)
  {
    returnedArray[i] = array[index][i];
  }

  return returnedArray;
}
