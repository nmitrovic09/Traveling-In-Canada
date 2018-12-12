//---------------------Global Variables-------------------------
//canvas variables
var canvas = document.getElementById('dataViz');
var context = canvas.getContext('2d');

//canvas height and width
var canvasWidth = canvas.width;
var canvasHeignt = canvas.height;
var halfWidth = canvas.width/2;
var halfHeight = canvas.height/2;

var cities = [];
var year = 0;

//scaling x and y values to canvas height and width
var scaleX = d3.scaleLinear()
                .domain([0, 40000000])
                .range([0, canvasWidth]);
var scaleY = d3.scaleLinear()
               .domain([0, 200])
               .range([0, canvasWidth]);

//get the data from csv file
//call the main function
parseData('bin/data/AirPassengerTraffic.csv', main);

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

//---------------------BUTTONS INTERACTION-------------------------

var btnTotal = true;
var btnDomestic = false;
var btnTransborder = false;
var btnOther = false;

document.getElementById("total").addEventListener("click", updateTotal);
document.getElementById("domestic").addEventListener("click", updateDomestic);
document.getElementById("transborder").addEventListener("click", updateTransborder);
document.getElementById("other").addEventListener("click", updateOther);

function updateTotal()
{
  btnTotal = true;
  btnDomestic = false;
  btnTransborder = false;
  btnOther = false;

  //change css color and background of buttons
  changeBtnColor("total", "white", "black");
  changeBtnColor("domestic", "black", "white");
  changeBtnColor("transborder", "black", "white");
  changeBtnColor("other", "black", "white");
}
function updateDomestic()
{
  btnDomestic = true;
  btnTotal = false;
  btnTransborder = false;
  btnOther = false;

  //change css color and background of buttons
  changeBtnColor("domestic", "white", "black");
  changeBtnColor("total", "black", "white");
  changeBtnColor("transborder", "black", "white");
  changeBtnColor("other", "black", "white");
}

function updateTransborder()
{
  btnTransborder = true;
  btnTotal = false;
  btnDomestic = false;
  btnOther = false;

  //change css color and background of buttons
  changeBtnColor("transborder", "white", "black");
  changeBtnColor("total", "black", "white");
  changeBtnColor("domestic", "black", "white");
  changeBtnColor("other", "black", "white");
}

function updateOther()
{
  btnOther = true;
  btnTotal = false;
  btnDomestic = false;
  btnTransborder = false;

  //change css color and background of buttons
  changeBtnColor("other", "white", "black");
  changeBtnColor("total", "black", "white");
  changeBtnColor("domestic", "black", "white");
  changeBtnColor("transborder", "black", "white");
}

var btn2013 = false;
var btn2014 = false;
var btn2015 = false;
var btn2016 = false;
var btn2016 = false;

document.getElementById("thirteen").addEventListener("click", update2013);
document.getElementById("fourteen").addEventListener("click", update2014);
document.getElementById("fifteen").addEventListener("click", update2015);
document.getElementById("sixteen").addEventListener("click", update2016);
document.getElementById("seventeen").addEventListener("click", update2017);


function update2013()
{
  year = 0;

  btn2013 = true;

  btn2014 = false;
  btn2015 = false;
  btn2016 = false;
  btn2016 = false;

  //change css color and background of buttons
  changeBtnColor("thirteen", "white", "black");
  changeBtnColor("fourteen", "black", "white");
  changeBtnColor("fifteen", "black", "white");
  changeBtnColor("sixteen", "black", "white");
  changeBtnColor("seventeen", "black", "white");
}

function update2014()
{
  year = 1;

  btn2013 = false;
  btn2014 = true;
  btn2015 = false;
  btn2016 = false;
  btn2016 = false;

  //change css color and background of buttons
  changeBtnColor("thirteen", "black", "white");
  changeBtnColor("fourteen", "white", "black");
  changeBtnColor("fifteen", "black", "white");
  changeBtnColor("sixteen", "black", "white");
  changeBtnColor("seventeen", "black", "white");
}

function update2015()
{
  year = 2;

  btn2013 = false;
  btn2014 = false;
  btn2015 = true;
  btn2016 = false;
  btn2016 = false;

  //change css color and background of buttons
  changeBtnColor("thirteen", "black", "white");
  changeBtnColor("fourteen", "black", "white");
  changeBtnColor("fifteen", "white", "black");
  changeBtnColor("sixteen", "black", "white");
  changeBtnColor("seventeen", "black", "white");
}

function update2016()
{
  year = 3;

  btn2013 = false;
  btn2014 = false;
  btn2015 = false;
  btn2016 = true;
  btn2016 = false;

  //change css color and background of buttons
  changeBtnColor("thirteen", "black", "white");
  changeBtnColor("fourteen", "black", "white");
  changeBtnColor("fifteen", "black", "white");
  changeBtnColor("sixteen", "white", "black");
  changeBtnColor("seventeen", "black", "white");
}

function update2017()
{
  year = 4;

  btn2013 = false;
  btn2014 = false;
  btn2015 = false;
  btn2016 = false;
  btn2016 = true;

  //change css color and background of buttons
  changeBtnColor("thirteen", "black", "white");
  changeBtnColor("fourteen", "black", "white");
  changeBtnColor("fifteen", "black", "white");
  changeBtnColor("sixteen", "black", "white");
  changeBtnColor("seventeen", "white", "black");
}

var btnHalifax = true;
var btnMontreal = true;
var btnOttawa = true;
var btnToronto = true;
var btnWinnipeg = true;
var btnCalgary = true;
var btnEdmonton = true;
var btnVancouver = true;

document.getElementById("halifax").addEventListener("click", updateHalifax);
document.getElementById("montreal").addEventListener("click", updateMontreal);
document.getElementById("ottawa").addEventListener("click", updateOttawa);
document.getElementById("toronto").addEventListener("click", updateToronto);
document.getElementById("winnipeg").addEventListener("click", updateWinnipeg);
document.getElementById("calgary").addEventListener("click", updateCalgary);
document.getElementById("edmonton").addEventListener("click", updateEdmonton);
document.getElementById("vancouver").addEventListener("click", updateVancouver);


function updateHalifax()
{
  btnHalifax = !btnHalifax;

  if(btnHalifax)
  {
    changeBtnColor("halifax", "white", "black");
  } else {
    changeBtnColor("halifax", "black", "white");
  }
}

function updateMontreal()
{
  btnMontreal = !btnMontreal;

  if(btnMontreal)
  {
    changeBtnColor("montreal", "white", "black");
  } else {
    changeBtnColor("montreal", "black", "white");
  }
}

function updateOttawa()
{
  btnOttawa = !btnOttawa;

  if(btnOttawa)
  {
    changeBtnColor("ottawa", "white", "black");
  } else {
    changeBtnColor("ottawa", "black", "white");
  }
}

function updateToronto()
{
  btnToronto = !btnToronto;

  if(btnToronto)
  {
    changeBtnColor("toronto", "white", "black");
  } else {
    changeBtnColor("toronto", "black", "white");
  }
}

function updateWinnipeg()
{
  btnWinnipeg = !btnWinnipeg;

  if(btnWinnipeg)
  {
    changeBtnColor("winnipeg", "white", "black");
  } else {
    changeBtnColor("winnipeg", "black", "white");
  }
}

function updateCalgary()
{
  btnCalgary = !btnCalgary;

  if(btnCalgary)
  {
    changeBtnColor("calgary", "white", "black");
  } else {
    changeBtnColor("calgary", "black", "white");
  }
}

function updateEdmonton()
{
  btnEdmonton = !btnEdmonton;

  if(btnEdmonton)
  {
    changeBtnColor("edmonton", "white", "black");
  } else {
    changeBtnColor("edmonton", "black", "white");
  }
}

function updateVancouver()
{
  btnVancouver = !btnVancouver;

  if(btnVancouver)
  {
    changeBtnColor("vancouver", "white", "black");
  } else {
    changeBtnColor("vancouver", "black", "white");
  }
}

//--------------MAIN FUNCTION THAT CONTROLS JS SCRIPT---------------
function main(data)
{
  let first = 7;
  let step = 4;

  for(let i = 0; i < 9; i++)
  {
    if(i == 0)
    {
      //instantiate canada
      cities.push(new City(halfWidth-(halfWidth/2)-28,10));

      //---------------Convert Data to Objects--------------------
      //structure the data in a meaningful way
      //within an object and parameters
      cities[i].data = setStructureOfData(data, first+step*i);
      cities[i].data.convertDataToNum();

      //initialize the rectangles
      cities[i].initRectangles(31,5);
      //console.log(cities[i]);

    } else {
      //instantiate the nine cities
      cities.push(new City(i*86-20,100));

      //---------------Convert Data to Objects--------------------
      //structure the data in a meaningful way
      //within an object and parameters
      cities[i].data = setStructureOfData(data, first+step*i);
      cities[i].data.convertDataToNum();

      //initialize the rectangles
      cities[i].initRectangles(5,10);
      //console.log(cities[i]);
    }
  }

  //set the css color and bg at start
  //active city buttons
  changeBtnColor("halifax", "white", "black");
  changeBtnColor("montreal", "white", "black");
  changeBtnColor("ottawa", "white", "black");
  changeBtnColor("toronto", "white", "black");
  changeBtnColor("winnipeg", "white", "black");
  changeBtnColor("calgary", "white", "black");
  changeBtnColor("edmonton", "white", "black");
  changeBtnColor("vancouver", "white", "black");
  //active properties of data viz
  changeBtnColor("thirteen", "white", "black");
  changeBtnColor("total", "white", "black");

  // //instantiate the appropriate rectangle colors
  // for(let i = 0; i < 9; i++)
  // {
  //   //update Canafa Viz
  //   if(i == 0)
  //   {
  //     let updatedColor = getColorValues(cities[i].data.total[year], 1000000)
  //     //console.log(cities[i].data.total[0]);
  //     let bottomRight = 154;
  //     let maxAmount = updatedColor[0];
  //     let lastOne = 255-updatedColor[1];
  //     //console.log(updatedColor);
  //     for(let j = 0; j < maxAmount+1; j++)
  //     {
  //       if(j < maxAmount)
  //       {
  //         cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';
  //
  //       } else {
  //         cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
  //       }
  //     }
  //
  //   } else {
  //     let updatedColor = getColorValues(cities[i].data.total[year], 1000000)
  //     //console.log(cities[i].data.total[0]);
  //     let bottomRight = 49;
  //     let maxAmount = updatedColor[0];
  //     let lastOne = 255-updatedColor[1];
  //     // console.log(maxAmount);
  //     // console.log(lastOne);
  //     // console.log();
  //
  //     for(let j = 0; j < maxAmount+1; j++)
  //     {
  //       if(j < maxAmount)
  //       {
  //         cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';
  //       } else {
  //         cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
  //       }
  //     }
  //   }
  // }


    // let sum = 0;
    // let other =  0;
    //
    // for(let i = 1; i < 9; i++)
    // {
    //   sum += cities[i].data.total[0];
    //   console.log(sum);
    // }
    // other = cities[0].data.total[0] - sum;
    // console.log(other);

  //---------------------animation-------------------------
  requestAnimationFrame(animate);

  function animate()
  {
    //draw the first city
    context.clearRect(0,0,canvasWidth,canvasHeignt);

    //COMPONENTS INTERACTION
    if(btnTotal)
    {

      //clear the previous color
      for(let i = 0; i < 9; i++)
      {
        for(let j = 0; j < cities[i].rectangles.length; j++)
        {
          cities[i].rectangles[j].red = 'rgba(255,255,255,255)';
        }
      }

      for(let i = 0; i < 9; i++)
      {
        if(i == 0)
        {
          //specify the canada data in html
          setHtmlContent('canadaData', cities[i].data.total[year]);

          let updatedColor = getColorValues(cities[i].data.total[year], 1000000)
          //console.log(cities[i].data.total[0]);
          let bottomRight = 154;
          let maxAmount = updatedColor[0];
          let lastOne = 255-updatedColor[1];
          //console.log(updatedColor);
          for(let j = 0; j < maxAmount+1; j++)
          {
            if(j < maxAmount)
            {
              cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';

            } else {
              cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
            }
          }
        } else {
          let updatedColor = getColorValues(cities[i].data.total[year], 1000000)
          //console.log(cities[i].data.total[0]);
          let bottomRight = 49;
          let maxAmount = updatedColor[0];
          let lastOne = 255-updatedColor[1];
          // console.log(maxAmount);
          // console.log(lastOne);
          // console.log();

          for(let j = 0; j < maxAmount+1; j++)
          {
            if(j < maxAmount)
            {
              cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';
            } else {
              cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
            }
          }
        }
      }
    }

    if(btnDomestic)
    {
      //clear the previous color
      for(let i = 0; i < 9; i++)
      {
        for(let j = 0; j < cities[i].rectangles.length; j++)
        {
          cities[i].rectangles[j].color = 'rgba(255,255,255,255)';
        }
      }


      for(let i = 0; i < 9; i++)
      {
        if(i == 0)
        {
          //specify the canada data in html
          setHtmlContent('canadaData', cities[i].data.domestic[year]);

          let updatedColor = getColorValues(cities[i].data.domestic[year], 1000000)
          //console.log(cities[i].data.total[0]);
          let bottomRight = 154;
          let maxAmount = updatedColor[0];
          let lastOne = 255-updatedColor[1];
          //console.log(updatedColor);
          for(let j = 0; j < maxAmount+1; j++)
          {
            if(j < maxAmount)
            {
              cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';

            } else {
              cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
            }
          }
        } else {
          let updatedColor = getColorValues(cities[i].data.domestic[year], 1000000)
          //console.log(cities[i].data.total[0]);
          let bottomRight = 49;
          let maxAmount = updatedColor[0];
          let lastOne = 255-updatedColor[1];
          // console.log(maxAmount);
            // console.log(lastOne);
            // console.log();

            for(let j = 0; j < maxAmount+1; j++)
            {
              if(j < maxAmount)
              {
                cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';

              } else {
                cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
              }
            }
          }
      }
    }

    if(btnTransborder)
    {
      //clear the previous color
      for(let i = 0; i < 9; i++)
      {
        for(let j = 0; j < cities[i].rectangles.length; j++)
        {
          cities[i].rectangles[j].color = 'rgba(255,255,255,255)';
        }
      }


        for(let i = 0; i < 9; i++)
        {
          if(i == 0)
          {
            //specify the canada data in html
            setHtmlContent('canadaData', cities[i].data.transborder[year]);

            let updatedColor = getColorValues(cities[i].data.transborder[year], 1000000)
            //console.log(cities[i].data.total[0]);
            let bottomRight = 154;
            let maxAmount = updatedColor[0];
            let lastOne = 255-updatedColor[1];
            //console.log(updatedColor);
            for(let j = 0; j < maxAmount+1; j++)
            {
              if(j < maxAmount)
              {
                cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';

              } else {
                cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
              }
            }
          } else {
            let updatedColor = getColorValues(cities[i].data.transborder[year], 1000000)
            //console.log(cities[i].data.total[0]);
            let bottomRight = 49;
            let maxAmount = updatedColor[0];
            let lastOne = 255-updatedColor[1];
            // console.log(maxAmount);
            // console.log(lastOne);
            // console.log();

            for(let j = 0; j < maxAmount+1; j++)
            {
              if(j < maxAmount)
              {
                cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';

              } else {
                cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
              }
            }
        }
      }
    }

    if(btnOther)
    {
      //clear the previous color
      for(let i = 0; i < 9; i++)
      {
        for(let j = 0; j < cities[i].rectangles.length; j++)
        {
          cities[i].rectangles[j].color = 'rgba(255,255,255,255)';
        }
      }

        for(let i = 0; i < 9; i++)
        {
          //update Canada
          if( i == 0)
          {
            //specify the canada data in html
            setHtmlContent('canadaData', cities[i].data.other[year]);

            let updatedColor = getColorValues(cities[i].data.other[year], 1000000)
            //console.log(cities[i].data.total[0]);
            let bottomRight = 154;
            let maxAmount = updatedColor[0];
            let lastOne = 255-updatedColor[1];
            //console.log(updatedColor);
            for(let j = 0; j < maxAmount+1; j++)
            {
              if(j < maxAmount)
              {
                cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';

              } else {
                cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
              }
            }

            //update all the cities
          } else {
            let updatedColor = getColorValues(cities[i].data.other[year], 1000000)
            //console.log(cities[i].data.total[0]);
            let bottomRight = 49;
            let maxAmount = updatedColor[0];
            let lastOne = 255-updatedColor[1];
            // console.log(maxAmount);
            // console.log(lastOne);
            // console.log();

            for(let j = 0; j < maxAmount+1; j++)
            {
              if(j < maxAmount)
              {
                cities[i].rectangles[bottomRight-j].color = 'rgba(255,0,0,255)';

              } else {
                cities[i].rectangles[bottomRight-j].color = 'rgba('+lastOne+',0,0,255)';
              }
            }
          }
      }
    }

    for(let i = 0; i < 9; i++)
    {
      cities[i].draw();
    }


    requestAnimationFrame(animate);
  }
}

function City(x, y)
{
  this.x = x;
  this.y = y;
  this.data = new Data();

  this.rectangles = [];

  this.initRectangles = function(width, height)
  {
    for(let i = 0; i < width; i++)
    {
      for(let j = 0; j < height; j++)
      {
        this.rectangles.push(new Rectangle(this.x+i*15, this.y+j*15, 10));
        //this.rectangles[i].draw();
      }
    }
  };

  this.draw = function()
  {
    for(let i = 0; i < this.rectangles.length; i++)
    {
      this.rectangles[i].draw();
    }
  };

  this.fadeInOrOut = function(target)
  {
    for(let i = 0; i < this.rectangles.length; i++)
    {
      this.rectangles[i].fade(target);
    };
  };
}

function Rectangle(x, y, size)
{
  this.x = x;
  this.y = y;
  this.w = size;
  this.h = size;
  this.speed = 10;
  this.opacity = 255;
  this.red = 255;
  this.color = 'rgba('+this.red+',255,255,'+this.opacity+')';
  this.stroke = 'rgba(0,0,0,'+this.opacity+')';
  //this.black = 'black';
  //this.faded = false;

  //methods
  //draw rectangle on canvas
  this.draw = function()
  {
  //  context.beginPath();
    //-------------drawing-------------
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.strokeStyle = this.stroke;
    context.strokeRect(this.x, this.y, this.w, this.h);
    //context.strokeStyle = 'black';
    //context.stroke();
    //context.strokeWidth();
    //context.closePath();
  };

  this.fade = function(target)
  {
    if(this.red > target)
    {
      this.red -= 1;
      this.color = 'rgba('+this.red+',255,255,'+this.opacity+')';
    }

    // let difference = target - this.opacity;
    // if(Math.abs(difference) > 0)
    // {
    //   this.opacity += difference/this.speed;
    //   this.color = 'rgba('+this.red+',255,255,'+this.opacity+')';
    //   //console.log(difference);
    // }
  };
}

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

function getColorValues(data, divider)
{
  let returnValues = [2];
  //find the amount of rectangles to be filled
  let f = data/divider;
  //console.log(f);
  //get the integer
  let num = Math.floor(f)
  //console.log(num);
  returnValues[0] = num;
  //get the decimal
  let decimal = f-num;
  decimal = convertDecimalToColor(decimal);
  returnValues[1] = decimal;

  return returnValues;
}

function convertDecimalToColor(val)
{
  let color = val*100;
  //math formula to convert to 255 for RGB
  color = 255-(((Math.floor(color))*255)/100);
  //make sure there is no decimal
  color = Math.floor(color);

  return color;
}

function getOther(data)
{
  let sumTotal = 0;
  let sumDomestic = 0;
  let sumTransborder = 0;
  let sumOther = 0;

  let otherObject = new Data();

  let other = 0;

  for(let i = 1; i < 9; i++)
  {
    sumTotal += 0;
  }

  other = cities[0].data.total[0] - sum;
}

function changeBtnColor(id, color, bg){
  document.getElementById(id).style.background = bg;
  document.getElementById(id).style.color = color;
}

function setHtmlContent(id, newHtml)
{
  document.getElementById(id).innerHTML = newHtml;
}
