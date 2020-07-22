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



//heuristic :: Using Manhattan Heuristic
function heuristic4(a, b)
 {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  dx = Math.abs(dx);
  dy = Math.abs(dy);

  return dx + dy;
}


//node
function point4(i, j, wall) {
  this.x = i;
  this.y = j;

  this.h = 0;

  this.parent = null;

  this.wall = wall;

}

//FIND NEIGHBOURS
function findneighbours4(point, grid) 
{
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
function BestFirst(given, start_i, start_j, end_i, end_j) {

 open = [];
 close = [];
 path = [];

  c = given.length;
  r = given[0].length;


 //initializing the grid
  var grid = new Array(c);

  for (var i = 0; i < c; i++) 
  {
    grid[i] = new Array(r);
  }

  for (var i = 0; i < c; i++) 
  {
    for (var j = 0; j < r; j++) 
    {
      grid[i][j] = new point4(i, j, !given[i][j]);
    }
  }

  
  //initialize starting and ending points
  var start = grid[start_i][start_j];
  var end = grid[end_i][end_j];

  open.push(start);

  //start searching

  while (open.length > 0)
   {
    //continue
    var lowest = 0;
    for (var i = 0; i < open.length; i++) 
    {
      if (open[i].h < open[lowest].h) 
      {
        lowest = i;
      }
    }

    var current = open[lowest];

   //path found
    if (current === end)
     {
      // console.log("PATH FOUND");
      path = [];

      var temp = current;

      while (temp.parent!=null) 
      {
        path.push([temp.x, temp.y]);
        temp = temp.parent;
      }

      path.push([start.x, start.y]);
      path.reverse();

      //console.log(path);
      return path;
    } 

    else  //not found
    {
      const index = open.indexOf(current);
      open.splice(index, 1);
      close.push(current);
      
      //exploring neighbours
      var neighbours = findneighbours4(current, grid);

      for (var i = 0; i < neighbours.length; i++) 
      {
        var neighbour = neighbours[i];
        if (!close.includes(neighbour) && !open.includes(neighbour))
         {
          open.push(neighbour);
          neighbour.h = heuristic4(neighbour, end);
          neighbour.parent = current;
        }

      }

    }
  }
  
  
  //no path exits
  //console.log("NO PATH");
  return [];

}
//BestFirst(given, start_i, start_j, end_i, end_j);
