//---------------------Global Variables-------------------------
//canvas variables
var canvas = document.getElementById('dataViz');
var context = canvas.getContext('2d');

//canvas height and width
var canvasWidth = canvas.width;
var canvasHeignt = canvas.height;
var halfWidth = canvas.width/2;
var halfHeight = canvas.height/2;

var airTrafficData = [9];
var cities = [10];
var year = 2;

//scaling x and y values to canvas height and width
var vizXDomain = 0;
var vizYDomain = 0;
var xDomainData = 0;
var yDomainData = 0;

var frames = 0;
var seconds = 0;
var minutes = 0;
var treshold = 10;

var btn2013 = false;
var btn2014 = false;
var btn2015 = false;
var btn2016 = false;
var btn2017 = false;

var btnTotal = false;
var btnTotalCounter = 0;
var btnDomestic = false;
var btnDomesticCounter = 0;


document.getElementById("2013").addEventListener("click", update2013);
document.getElementById("2014").addEventListener("click", update2014);
//
// document.getElementById("total").addEventListener("click", updateTotal);
// document.getElementById("domestic").addEventListener("click", updateDomestic);

function update2013()
{
  btn2013 = true;
  year = 4;

  xDomainData = airTrafficData[0].total[year];
  scaleX = d3.scaleLinear()
                  .domain([0, xDomainData])
                  .range([0, vizXDomain]);
  scaleY = d3.scaleLinear()
                 .domain([0, 200])
                 .range([0, vizYDomain]);
}

function update2014()
{
  btn2014 = true;
  year = 1;

  xDomainData = airTrafficData[0].total[year];
  scaleX = d3.scaleLinear()
                  .domain([0, xDomainData])
                  .range([0, vizXDomain]);
  scaleY = d3.scaleLinear()
                 .domain([0, 200])
                 .range([0, vizYDomain]);
}

function updateTotal()
{
  btnTotal = true;
}

function updateDomestic()
{
  btnDomestic = true;
}

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

function main(data)
{
  //---------------------Instantiation-------------------------
  for(let i = 0; i < 10; i++)
  {
    //---------------Convert Data to Objects--------------------
    //structure the data in a meaningful way
    //within an object and parameters
    let r = 255-20*i;

    if(i < 9)
    {
      let first = 7;
      let step = 4;
      airTrafficData[i] = setStructureOfData(data, first+step*i);
      airTrafficData[i].convertDataToNum();

      //initialize our cities
      let w = canvasWidth;
      let h = 50;
      let space = 5;
      let start = 0;
      //instantiate the nine cities
      //cities[i] = new City(start+space, halfHeight-(h/2)+50*i, w-space*2, h, 50*i);
      cities[i] = new City(10, 10+20*i, canvasWidth-10*2, 10, r);
    } else {
      cities[i] = new City(10, 10+20*i, canvasWidth-10*2, 10, r);
    }
  }

  //update the domain for our visualization
  vizXDomain = cities[0].w - cities[0].x;
  vizYDomain = cities[0].h;
  xDomainData = airTrafficData[0].total[year];

  //scale the axis of the visualization
  var scaleX = d3.scaleLinear()
                  .domain([0, xDomainData])
                  .range([0, vizXDomain]);
  var scaleY = d3.scaleLinear()
                 .domain([0, 200])
                 .range([0, vizYDomain]);
  let sum = 0;
  let prevPos = 0;

  for(let i = 0; i < 9; i++)
  {
    //get the data and assign it to the width of each city
    let target = scaleX(airTrafficData[i].total[year]);
    cities[i].w = target;

    console.log(sum);


    if(i > 1)
    {
      //update the postiion of each rectangle
      cities[i].x = 10+sum;
    }

    if(i >= 1)
    {
      //sum all the width of cities
      sum += target;
    }
    //keep track of the previous length
    prevPos = target;

    console.log(cities[i].x);
    console.log(cities[i].w);
    console.log();
  }

  let firstTarget = scaleX(airTrafficData[0].total[year]);
  let otherCity = firstTarget-sum;
  cities[9].w = otherCity;
  cities[9].x = 10+sum;

  console.log(sum);
  console.log(cities[9].x);
  console.log(cities[9].w);
  console.log();
  //
  // console.log(sum);

  //---------------------animation-------------------------
  requestAnimationFrame(animate);

  function animate()
  {
    //timer();
    if(btn2013)
    {
      //update the scale for the year
      xDomainData = airTrafficData[0].total[year];
      scaleX = d3.scaleLinear()
                      .domain([0, xDomainData])
                      .range([0, vizXDomain]);
      scaleY = d3.scaleLinear()
                     .domain([0, 200])
                     .range([0, vizYDomain]);
      console.log("running year: 2013")

      let sum = 0;
      let prevPos = 0;

      for(let i = 0; i < 9; i++)
      {
        //get the data and assign it to the width of each city
        let target = scaleX(airTrafficData[i].total[year]);
        cities[i].w = target;

        if(i > 1)
        {
          //update the postiion of each rectangle
          cities[i].updateX(sum);
        }

        if(i >= 1)
        {
          //sum all the width of cities
          sum += target;
        }
        //keep track of the previous length
        prevPos = target;
      }

      let firstTarget = scaleX(airTrafficData[0].total[year]);
      let otherCity = firstTarget-sum;
      cities[9].w = otherCity;
      cities[9].updateX(sum)
    }

    if(btn2014)
    {
      //update the scale for the year

      console.log("running year: 2014")

      let sum = 0;
      let prevPos = 0;

      for(let i = 0; i < 9; i++)
      {
        //get the data and assign it to the width of each city
        let target = scaleX(airTrafficData[i].total[year]);
        cities[i].w = target;

        if(i > 1)
        {
          //update the postiion of each rectangle
          cities[i].updateX(sum);
        }

        if(i >= 1)
        {
          //sum all the width of cities
          sum += target;
        }
        //keep track of the previous length
        prevPos = target;
      }

      let firstTarget = scaleX(airTrafficData[0].total[year]);
      let otherCity = firstTarget-sum;
      cities[9].w = otherCity;
      cities[9].updateX(sum)
    }

    for(let i = 0; i < 10; i++)
    {
      cities[i].draw();
      //cities[i].update();
    }
    requestAnimationFrame(animate);
  }
}

//-----------------City Object and Methods--------------------
function City(x, y, w, h, red)
{
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.speed = 10;
  this.opacity = 255;
  this.red = red;
  this.color = 'rgba('+this.red+',0,0,'+this.opacity+')';

  this.arrived = false;

  //methods
  //draw rectangle on canvas
  this.draw = function()
  {
    context.beginPath();
    //-------------drawing-------------
    context.rect(this.x, this.y, this.w, this.h);
    context.fillStyle = this.color;
    context.fill();
    context.strokeStyle = this.color;
    context.stroke();
    context.closePath();
  };

  this.update = function(target, sum)
  {
    let distance = difference(this.w, target);
    this.w += distance/this.speed;
    this.x = 10+sum/this.speed;
  };

  this.updateX = function(sum)
  {
    this.x = this.x + 10 + sum/this.speed;
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

  this.convertDataToNum = function()
  {
    for(let i = 0; i < 5; i++)
    {
      var currentTotal = this.total[i];
      //remove the commas
      currentTotal = currentTotal.split(',').join('');
      //convert to integer
      newTotal = parseInt(currentTotal, 10);
      //assign the new data to its place
      this.total[i] = newTotal;

      var currentDomestic = this.domestic[i];
      currentDomestic = currentDomestic.split(',').join('');
      newDomestic = parseInt(currentDomestic, 10);
      this.domestic[i] = newDomestic;

      var currentTransborder = this.transborder[i];
      currentTransborder = currentTransborder.split(',').join('');
      newTransborder = parseInt(currentTransborder, 10);
      this.transborder[i] = newTransborder;


      var currentOther = this.other[i];
      currentOther = currentOther.split(',').join('');
      newOther = parseInt(currentOther, 10);
      this.other[i] = newOther;
    }
  };
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

function difference(currentPos, newPos)
{
  return newPos - currentPos;
}

function random(multiplier)
{
  return Math.random()*multiplier;
}

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
