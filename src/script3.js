//---------------------Global Variables-------------------------
var canvas = document.getElementById('dataViz');
var context = canvas.getContext('2d');

//canvas height and width
var canvasWidth = canvas.width;
var canvasHeignt = canvas.height;
var halfWidth = canvas.width/2;
var halfHeight = canvas.height/2;

var cities = [9];

//scaling x and y values to canvas height and width
var scaleX = d3.scaleLinear()
                .domain([0, 40000000])
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

function main(data)
{
  for(let i = 0; i < 9; i++)
  {
    //instantiate the nine cities
    cities[i] = new City();

    //---------------Convert Data to Objects--------------------
    //structure the data in a meaningful way
    //within an object and parameters
    cities[i].data = setStructureOfData(data, first+step*i);
    cities[i].convertDataToNum();

    console.log(cities[i]);

    //let d = scaleX(cities[i].data.total[0]);
    // console.log(d);
  }
}

function Data()
{
  //parameters
  this.total = 0;
  this.domestic = 0;
  this.transborder = 0;
  this.other = 0;
}

function City()
{
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
