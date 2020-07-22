// var given = [
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0],
//   [0, 1, 1, 0, 1],
//   [0, 0, 0, 0, 0]
// ];

// start_i = 1;
// start_j = 1;
// end_i = 4;
// end_j = 4;






//heuristic
/***********************************/

function heuristica(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  dx = Math.abs(dx);
  dy = Math.abs(dy);

  return dx + dy;
}


//node
/***********************************/

function pointa(i, j, wall)
{
  this.x = i;
  this.y = j;

  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.startparent = null;
  this.endparent = null;

  this.wall = wall;
}

//FIND NEIGHBOURS
  /****************************************/

function findneighboursa(point, grid) {
  var i = point.x;
  var j = point.y;

  var neighbours = [];

  if (i > 0 && grid[i - 1][j].wall == 0) {
    neighbours.push(grid[i - 1][j]);
  }
  if (i < c - 1 && grid[i + 1][j].wall == 0) {
    neighbours.push(grid[i + 1][j]);
  }
  if (j < r - 1 && grid[i][j + 1].wall == 0) {
    neighbours.push(grid[i][j + 1]);
  }
  if (j > 0 && grid[i][j - 1].wall == 0) {
    neighbours.push(grid[i][j - 1]);
  }
  return neighbours;
}

//search
//***************************************************/

function BiAstar(given, start_i, start_j, end_i, end_j) {

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
      grid[i][j] = new pointa(i, j, given[i][j]);
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
      if (startopen[i].f < startopen[startlowest].f) 
      {
        startlowest = i;
      }
    }

    var endlowest = 0;
    for (var i = 0; i < endopen.length; i++)
     {
      if (endopen[i].f < endopen[endlowest].f) 
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

      var startneighbours = findneighboursa(startcurrent, grid);
      var endneighbours = findneighboursa(endcurrent, grid);


      for (var i = 0; i < startneighbours.length; i++) 
      {
        var startneighbour = startneighbours[i];
        if (!startclose.includes(startneighbour)) 
        {
          var starttemp = startcurrent.g + 1;
          if (startopen.includes(startneighbour)) 
          {
            if (starttemp < startneighbour.g) 
            {
              startneighbour.g = starttemp;
            }
          } 
          else 
          {
            startneighbour.g = starttemp;
            startopen.push(startneighbour);
          }
          startneighbour.h = heuristica(startneighbour, end);
          startneighbour.f = startneighbour.g + startneighbour.h;

          startneighbour.startparent = startcurrent;
        } 
      }

      for (var i = 0; i < endneighbours.length; i++) 
      {
        var endneighbour = endneighbours[i];
        if (!endclose.includes(endneighbour)) 
        {
          var endtemp = endcurrent.g + 1;
          if (endopen.includes(endneighbour)) 
          {
            if (endtemp < endneighbour.g) 
            {
              endneighbour.g = endtemp;
            }
          } 
          else 
          {
            endneighbour.g = endtemp;
            endopen.push(endneighbour);
          }
          endneighbour.h = heuristica(endneighbour, start);
          endneighbour.f = endneighbour.g + endneighbour.h;

          endneighbour.endparent = endcurrent;
        }
        
      }

    }
     
    //no path exists

    // console.log("NO PATH");
    return [];
  
}

// BiAstar(given, start_i, start_j, end_i, end_j);
