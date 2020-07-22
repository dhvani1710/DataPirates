
//heuristic
function heuristicb(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  dx = Math.abs(dx);
  dy = Math.abs(dy);

  return dx + dy;
}


//node
function pointb(i, j, wall)
{
  this.x = i;
  this.y = j;

  this.g = 0;

  this.startparent = null;
  this.endparent = null;

  this.wall = wall;
}


//FIND NEIGHBOURS
function findneighboursb(point, grid) {
  var i = point.x;
  var j = point.y;

  var neighbours = [];

  if (i > 0 && grid[i - 1][j].wall == 1) {
    neighbours.push(grid[i - 1][j]);
  }
  if (i < c - 1 && grid[i + 1][j].wall == 1) {
    neighbours.push(grid[i + 1][j]);
  }
  if (j < r - 1 && grid[i][j + 1].wall == 1) {
    neighbours.push(grid[i][j + 1]);
  }
  if (j > 0 && grid[i][j - 1].wall == 1) {
    neighbours.push(grid[i][j - 1]);
  }
  return neighbours;
}


//search
function BiBestFirst(given, start_i, start_j, end_i, end_j) {

  c = given.length;
  r = given[0].length;


var startopen = [];
var endopen = [];

var startclose = [];
var endclose = [];

  //initializing the grid

  var grid = new Array(c);

  for (var i = 0; i < c; i++) {

    grid[i] = new Array(r);
  }

  for (var i = 0; i < c; i++) {
    for (var j = 0; j < r; j++) {
      grid[i][j] = new pointb(i, j, !given[i][j]);
    }
  }


  //initializing the starting point and end point
  var start = grid[start_i][start_j];
  var end = grid[end_i][end_j];

  startopen.push(start);
  endopen.push(end);

  
  while (startopen.length > 0 && endopen.length > 0) 
  {
    //continue
    var startlowest = 0;
    for (var i = 0; i < startopen.length; i++)
     {
      if (startopen[i].h < startopen[startlowest].h) 
      {
        startlowest = i;
      }
    }

    var endlowest = 0;
    for (var i = 0; i < endopen.length; i++)
     {
      if (endopen[i].h < endopen[endlowest].h) 
      {
        endlowest = i;
      }
    }


    var startcurrent = startopen[startlowest];
    var endcurrent = endopen[endlowest];
   
    //path found

    if (endcurrent.startparent)
     {
        // console.log("PATH FOUND");
      path = [];
      
      var temp=endcurrent;

      while (temp.startparent!=null) 
      {
        path.push([temp.x, temp.y]);
        temp = temp.startparent;
      }
     
      path.push([start.x, start.y]);
      path.reverse();

      temp=endcurrent.endparent;

      while (temp.endparent!=null) 
      {
        path.push([temp.x, temp.y]);
        temp = temp.endparent;
      }
     
      path.push([end.x, end.y]);
      console.log(path);
      return path;
    }

    //path found

     if (startcurrent.endparent)
     {
     // console.log("PATH FOUND");
      path = [];
      
      var temp=startcurrent;

      while (temp.startparent!=null) 
      {
        path.push([temp.x, temp.y]);
        temp = temp.startparent;
      }
     
      path.push([start.x, start.y]);
      path.reverse();
      
      temp=startcurrent.endparent;
      

      while (temp.endparent!=null) 
      {
        path.push([temp.x, temp.y]);
        temp = temp.endparent;
      }
     
      path.push([end.x, end.y]);
      console.log(path);
      return path;
    }

    //path not found so continue
      const startindex = startopen.indexOf(startcurrent);
      startopen.splice(startindex, 1);
      startclose.push(startcurrent);

      const endindex = endopen.indexOf(endcurrent);
      endopen.splice(endindex, 1);
      endclose.push(endcurrent);


      //find neighbouring cells

      var startneighbours = findneighboursb(startcurrent, grid);
      var endneighbours = findneighboursb(endcurrent, grid);


      for (var i = 0; i < startneighbours.length; i++) 
      {
        var startneighbour = startneighbours[i];
        if (!startclose.includes(startneighbour) && !startopen.includes(startneighbour)) 
        {
          startopen.push(startneighbour);
          startneighbour.h = heuristicb(startneighbour, end);
          startneighbour.startparent = startcurrent;        
        }        
          
      } 
      

      for (var i = 0; i < endneighbours.length; i++) 
      {
        var endneighbour = endneighbours[i];
        if (!endclose.includes(endneighbour) && !endopen.includes(endneighbour)) 
        {
          endopen.push(endneighbour);
          endneighbour.h = heuristicb(endneighbour, start);
          endneighbour.endparent = endcurrent;
        }
        
      }

    }
     
    //no path exists

    console.log("NO PATH");
    return [];
  
}

BiBestFirst(given, start_i, start_j, end_i, end_j);
