class Node {
    constructor(x, y, isWalkable) {
      this.x = x;
      this.y = y;
      this.isWalkable = isWalkable;
      this.g = 0; // Cost from start to current node
      this.h = 0; // Heuristic (estimated cost from current node to goal)
      this.f = 0; // Total cost (g + h)
      this.parent = null;
    }
  
    calculateHeuristic(goal) {
      // Manhattan distance heuristic
      this.h = Math.abs(this.x - goal.x) + Math.abs(this.y - goal.y);
    }
  }
  
  
  
  export function astar(start_x, start_y, goal_x, goal_y, map, maxDepth = 100, cache) {
    const cacheKey = `${start_x},${start_y},${goal_x},${goal_y}`;
    if (cache[cacheKey]) {
        // console.log("USe Cache");
        return cache[cacheKey];
    }
  
    const openList = [];
    const closedList = [];
  
    const startNode = new Node(start_x, start_y, false); // Passable node
    const goalNode = new Node(goal_x, goal_y, false); // Passable node
  
    openList.push(startNode);
  
    let iterations = 0; // Track search depth
  
    while (openList.length > 0 && iterations < maxDepth) {
      iterations++;
  
      // Find node with lowest f cost in openList
      let current = openList[0];
      for (let i = 1; i < openList.length; i++) {
        if (openList[i].f < current.f) {
          current = openList[i];
        }
      }
  
      // Move current node from openList to closedList
      openList.splice(openList.indexOf(current), 1);
      closedList.push(current);
  
      // Check if goal is reached
      if (current.x === goal_x && current.y === goal_y) {
        let path = [];
        let node = current;
        while (node !== null) {
          path.unshift({ x: node.x, y: node.y });
          node = node.parent;
        }
        // console.log("*****************Add path to Cache ************");
        path.forEach((p, index) => {
            if (index !== 0 && index < path.length) { // Skip the first element, which is the goal node itself
              const cacheKey = `${p.x},${p.y},${goal_x},${goal_y}`;
              cache[cacheKey] = path[index+1];
            }
          });
  
        return path[1];
      }
  
      // Generate neighbors including diagonals
      const neighbors = [];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue; // Skip current node
          const nx = current.x + dx;
          const ny = current.y + dy;
          if (
            dx !== 0 &&
            dy !== 0 && // Check if it's a diagonal move
            (map[nx][current.y] !== 0 || map[current.x][ny] !== 0) // Check if there are obstacles at the adjacent cardinal positions
          ) {
            continue; // Skip diagonal moves through corners
          }
          if (
            nx >= 0 &&
            nx < map.length &&
            ny >= 0 &&
            ny < map[0].length &&
            map[nx][ny] === 0 // Passable terrain
          ) {
            neighbors.push(new Node(nx, ny, false)); // Passable node
          }
        }
      }
  
      // Process neighbors
      for (const neighbor of neighbors) {
        if (
          closedList.some(
            (node) => node.x === neighbor.x && node.y === neighbor.y
          )
        ) {
          continue; // Skip already processed nodes
        }
  
        const tentativeG = current.g + 1; // Assuming uniform cost
        const existingNode = openList.find(
          (node) => node.x === neighbor.x && node.y === neighbor.y
        );
        if (!existingNode || tentativeG < existingNode.g) {
          neighbor.g = tentativeG;
          neighbor.calculateHeuristic(goalNode);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
  
          if (!existingNode) {
            openList.push(neighbor);
          }
        }
      }
    }
  
    console.log("Reached maximum depth without finding a path.");
    return null; // No path found within maxDepth
  }
  
  export { Node };
