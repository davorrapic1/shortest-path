import Box from "./components/Box.component";
import useSetup from "./hooks/useSetup";



function App() {
  const { settings, setSettings } = useSetup();

  const coordinates = [];

  setSettings((prev) => {
    return {
      ...prev,

    };
  });

  const columnItems = new Array(settings.columnNumber).fill(null);
  const rowItems = new Array(settings.rowNumber).fill(null);

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

      if (current.x === targetPoint.x && current.y === targetPoint.y) {
        return reconstructPath(cameFrom, startPoint, targetPoint);
      }

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

    return [];
  }

  function reconstructPath(cameFrom, startPoint, targetPoint) {
    let current = cameFrom.get(`${targetPoint.x},${targetPoint.y}`);
    let path = [];

    while (
      current &&
      (current.x !== startPoint.x || current.y !== startPoint.y)
    ) {
      path.unshift(current);
      current = cameFrom.get(`${current.x},${current.y}`);
    }

    return path;
  }

  const path = findPath(
    settings.defaultStart,
    settings.defaultTarget,
    settings.rowNumber,
    settings.columnNumber
  );

  return (
    <div className="h-screen w-screen">
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${settings.columnNumber}, 1fr)`,
          gridTemplateRows: `repeat(${settings.rowNumber}, 1fr)`,
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
                    indexX === settings.defaultTarget.x &&
                    indexY === settings.defaultTarget.y
                      ? true
                      : false,
                }}
                path={path}
                start={settings.defaultStart}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
