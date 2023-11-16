import Box from "./components/Box.component";

const rowNumber = 30;
const columnNumber = 30;

const columnItems = new Array(columnNumber).fill(null);
const rowItems = new Array(rowNumber).fill(null);

function generateRandomCoordinate(rowNumber, columnNumber) {
  const x = Math.floor(Math.random() * rowNumber);
  const y = Math.floor(Math.random() * columnNumber);
  return { x, y };
}

const targetPoint = generateRandomCoordinate(rowNumber, columnNumber);
const startPoint = generateRandomCoordinate(rowNumber, columnNumber);

function App() {
  const coordinates = [];

  function findPath(startPoint, targetPoint, maxRows, maxCols) {
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    let queue = [startPoint];
    let visited = new Set([`${startPoint.x},${startPoint.y}`]);
    let cameFrom = new Map();

    while (queue.length > 0) {
      let current = queue.shift();

      // Check if target is reached
      if (current.x === targetPoint.x && current.y === targetPoint.y) {
        return reconstructPath(cameFrom, startPoint, targetPoint);
      }

      // Explore neighbors
      for (let dir of directions) {
        const next = { x: current.x + dir.x, y: current.y + dir.y };
        const key = `${next.x},${next.y}`;

        if (
          next.x >= 0 &&
          next.x < maxCols &&
          next.y >= 0 &&
          next.y < maxRows &&
          !visited.has(key)
        ) {
          queue.push(next);
          visited.add(key);
          cameFrom.set(key, current);
        }
      }
    }

    return []; // Return empty path if no path is found
  }

  function reconstructPath(cameFrom, startPoint, targetPoint) {
    let current = cameFrom.get(`${targetPoint.x},${targetPoint.y}`);
    let path = [];

    // Start reconstructing the path from the point just before the targetPoint
    while (
      current &&
      (current.x !== startPoint.x || current.y !== startPoint.y)
    ) {
      path.unshift(current);
      current = cameFrom.get(`${current.x},${current.y}`);
    }

    return path; // startPoint is not included in the path
  }

  // Example usage
  const path = findPath(startPoint, targetPoint, rowNumber, columnNumber);

  return (
    <div className="h-screen w-screen">
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
          gridTemplateRows: `repeat(${rowNumber}, 1fr)`,
        }}
      >
        {columnItems.map((_, indexX) =>
          rowItems.map((_, indexY) => {
            coordinates.push({ x: indexX, y: indexY });
            return (
              <Box
                key={indexX + indexY}
                coordinates={{
                  x: indexX,
                  y: indexY,
                  isTarget:
                    indexX === targetPoint.x && indexY === targetPoint.y
                      ? true
                      : false,
                }}
                path={path}
                start={startPoint}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
