# DataPirates
Microsoft Codess Engage 2020
## PathFinding by DataPirates

See the demo at : [DataPirates](https://dhvani1710.github.io/DataPirates/)

### Meet the Algorithms
This application supports the following algorithms:

```
* AStar*
* Best First Search
* Breadth First Search*
* Dijkstra*
* Bi-AStar
* Bi-Best First Search
* Bi-Dijkstra* 
```
The prefix ***Bi*** for the last three finders in the above list stands for the bi-directional searching strategy. These finders can be used by checking the 'Bi-directional' button when an algorithm is selected. 
>NOTE : Only the Finders marked with asterisks are guaranteed to find the shortest path.


### Features
* This application makes use of the algorithms mentioned above and tries to find the shortest path.

* The user has the liberty to choose the staring and endpoints according to his will. Also, there is an option to set obstacles in the path. The default Grid size is set to 42 rows and 60 Columns. However, the grid can be resized under *'Reset Grid'* option. 

* On clicking *'Let's Begin'* , the path is displayed in the grid, and the name of the algorithm used is displayed. An alert box is displayed if the finder was unable to find the path.

* An alert box warns the user if he select the algorithm which may not gurantee the shortest path.

> Please note the algorithms use *Manhattan Heuristic* by default and diagonal movement is prohibited.

