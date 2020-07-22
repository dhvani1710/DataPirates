var given = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0]
  ];
  
  start_i = 0;
  start_j = 0;
  end_i = 4;
  end_j = 4;
  
   var  startOpenList = [];
    var endOpenList=[];
    var startCloseList = [];
    var endCloseList=[];
    var path = [];
  
  
  
  
  //node
  /***********************************/
  
  function point(i, j, wall) {
    this.x = i;
    this.y = j;
  
    this.startParent = null;
    this.endParent= null;
  
    this.wall = wall;
    
  }
  
  
  function findneighbours(point, grid) {
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
  
  
  function BiBFS(given, start_i, start_j, end_i, end_j){
       c = given.length;
    r = given[0].length;
    
   
  
    var grid = new Array(c);
  
    for (var i = 0; i < c; i++) {
  
      grid[i] = new Array(r);
    }
  
    for ( i = 0; i < c; i++) {
      for (var j = 0; j < r; j++) {
        grid[i][j] = new point(i, j, given[i][j]);
      }
    }
  
    var start = grid[start_i][start_j];
    var end = grid[end_i][end_j];
    
    var temp, neighbour,neighbours;
  
      startOpenList.push(start);
      
      endOpenList.push(end);
      
       while(startOpenList.length>0 && endOpenList.length>0)
       {
         var current1= startOpenList.shift();
         var current2=  endOpenList.shift();
         
        
      
          
         if(current1.endParent)
           {  
               path=[];
               
               temp = current1;
  
           while (temp.startParent) {
             path.push([temp.x, temp.y]);
              temp = temp.startParent;
           }
  
            path.push([start.x, start.y]);
             path.reverse();
               
               temp=current2.endParent;
  
                while (temp.endParent) 
               {
                  path.push([temp.x, temp.y]);
                  temp = temp.endParent;
               }
       
                 path.push([end.x, end.y]);
               
               console.log(path);
               return path;
              
           }
           
           
           
            if(current2.startParent)
           {  
               path=[];
               
               temp = current2;
  
           while (temp.startParent) {
             path.push([temp.x, temp.y]);
              temp = temp.startParent;
           }
  
            path.push([start.x, start.y]);
             path.reverse();
               
               temp=current2.endParent;
  
                while (temp.endParent) 
               {
                  path.push([temp.x, temp.y]);
                  temp = temp.endParent;
               }
       
                 path.push([end.x, end.y]);
               
               console.log(path);
               return path;
               
           }
              
           // search from start
              
             startCloseList.push(current1);
  
            neighbours = findneighbours(current1, grid);
  
             for ( i = 0; i < neighbours.length; i++) 
           {
             neighbour = neighbours[i];
             if (!startCloseList.includes(neighbour)&&  !startOpenList.includes(neighbour)) 
            {
              neighbour.startParent = current1;
              startOpenList.push(neighbour);
            }
           } 
          
          
        // search from end
        
             endCloseList.push(current2);
  
            neighbours = findneighbours(current2, grid);
  
             for ( i = 0; i < neighbours.length; i++) 
           {
              neighbour = neighbours[i];
             if (!endCloseList.includes(neighbour)&&  !endOpenList.includes(neighbour)) 
            {
              neighbour.endParent = current2;
              endOpenList.push(neighbour);
            }
           }  
        }
          
      
      
       console.log("NO PATH");
      return [];
     
  }
  BiBFS(given, start_i, start_j, end_i, end_j);
  
  
  
  
  
  
  
  