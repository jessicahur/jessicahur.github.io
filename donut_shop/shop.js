function Donuts(place, avgSale, maxCus, minCus){
  this.place = place;
  this.avgSale = avgSale;
  this.maxCus = maxCus;
  this.minCus = minCus;
}

Donuts.prototype.numDonuts = function (hours){
  var sales = [];
  var total = 0;

  numHours = hours[1]-hours[0]; //opens at (hours[0]-hour[1])

  //Generate number of customers per hour based on min and max customers
  for (var ii = 0; ii < numHours; ii++){
    var numCustomers = Math.floor(Math.random()*(this.maxCus-this.minCus+1))+this.minCus;
      //Debug: console.log("numCustomers is "+numCustomers);
  //Calculate the number of donuts per hour and store them in array
  // testing if numCustomers was correctly installed: console.log(numCustomers);
    var donutsPerHr = Math.ceil(numCustomers*this.avgSale);
    //Debug: console.log("donuts per hour is "+donutsPerHr); //Debug
    sales.push(donutsPerHr);//put total in the end of the sales array
    total+=donutsPerHr;
  }
  sales.push(total);
  return sales;
}



Donuts.prototype.addTableData = function(table, rowNum, hours){
  var Sales = this.numDonuts(hours);
  var Row = table.insertRow(rowNum);
  var rowHeader = this.place;
  var cell = Row.insertCell(0);
  cell.innerHTML = "<b>"+rowHeader+"<b>";
  for (var jj = 1; jj <= Sales.length; jj++){
    cell = Row.insertCell(jj);
    cell.innerHTML = Sales[jj-1];
  }
}

//Storing all chain stores in object Chain and instantiate 5 objects


function Instantiate(numShops, Chain){ //Instantiate donut location objects
  var donutsLocations = [];
  for (var ii=0; ii < numShops; ii++){
    donutsLocations.push(ii);
  }
  for (var jj=0; jj<Chain['locations'].length; jj++){
  donutsLocations[jj] = new Donuts(Chain.locations[jj], Chain.avgSale[jj], Chain.maxCus[jj], Chain.minCus[jj]);
  }
  return donutsLocations;
}

var Chain = {
  locations: ['Down Town', 'Capitol Hill', 'South Lake Union', 'Wedgewood', 'Ballard'],
  avgSale: [4.5, 2, 6.33, 1.25, 3.75],
  maxCus: [43, 37, 23, 28, 58],
  minCus: [8, 4, 9, 2, 8]
  }
var Locations = Instantiate (5,Chain);

function donutSimulation(Shops, hours){
  var table = document.getElementById("myTable");
  for (var kk = 0; kk < Shops.length; kk++){
    Locations[kk].addTableData(table, kk+1, hours);
  }
}

hoursHeading([7,18]);
donutSimulation(Locations, [7,18]);


/***********Part2**********/


function hoursHeading(hours){
  var row = document.getElementById("hoursHeading");
  for (ii = hours[0]+1; ii <= hours[1]; ii++){
      var cell = row.insertCell(ii-hours[0]);
      if (ii===12){
        cell.innerHTML = ii+"PM";
      }
      else if (ii > 11){
        cell.innerHTML = (ii-12)+"PM";
      }
      else{
        cell.innerHTML = ii+"AM";
      }
  }
  row.insertCell(-1).innerHTML = "<th scope='col'> Total </th>";

}

function addNewLoc(hours){
  var location = document.getElementById("Loc").value;
  var avgSale = parseFloat(document.getElementById("Average").value);
  var minCus = parseInt(document.getElementById("Min").value);
  var maxCus = parseInt(document.getElementById("Max").value);
  if (location!=="" && avgSale!=NaN && minCus!=NaN && maxCus!=NaN){
    var newLoc = new Donuts(location, avgSale, maxCus, minCus);
    Locations.push(newLoc);
    var table = document.getElementById("myTable");
    newLoc.addTableData(table, -1, hours);
  }
  //Make sure that avgSale is converted to num
  //console.log(typeof avgSale);
}

function fixExistingLoc(){
  var location = document.getElementById("Loc").value;
  var avgSale = parseFloat(document.getElementById("Average").value);
  var minCus = parseInt(document.getElementById("Min").value);
  var maxCus = parseInt(document.getElementById("Max").value);
  //Check if the location entered match the location already on the table
  for (var ii=0; ii<Locations.length; ii++){
    if (location == Locations[ii].place){
      Locations[ii].avgSale = avgSale;
      Locations[ii].minCus = minCus;
      Locations[ii].maxCus = maxCus;
      break;
    }

  }
  var myTable = document.getElementById("myTable");
  myTable.innerHTML = "<table><tr id='hoursHeading' class='hours'><th></th></tr></table>";
  hoursHeading([7,18]);
  donutSimulation(Locations,[7,18]);
}



/*
function donutSimulation(hours){
  //Instantiate donut locations and calculate the number of donuts at each location
  var Locations = Instantiate();
  console.log("Locations: "+Locations); //testing
  var Input = [];
  for (var ii = 0; ii < Locations.length; ii++){
    Input.push(Locations[ii].numDonuts([7,18]));
  }
  console.log(Input);
  //Adding rows to table and data to table
  var myTable = document.getElementById("myTable");
  for (var jj = 0; jj < Input.length; jj++){
    var row = myTable.insertRow(jj+1); //Input row 1 thru 6 bc row 0 is occupied by the operating time
    if (jj < Input.length){ //Make sure we don't get Locations[5].place, which is undefined
    var rowHeader = Locations[jj].place;
    }

    for (var kk = 0; kk <= Input[jj].length; kk++){
      var cell = row.insertCell(kk);
      if (kk===0){
        cell.innerHTML = "<b>"+rowHeader+"<b>";
      }
      else{
        cell.innerHTML = Input[jj][kk-1];
        console.log(Input[jj][kk-1]); //Testing
      }
    }
  }
}

donutSimulation([7,18]); */
