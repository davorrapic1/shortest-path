export default function Box({ coordinates, path, start }) {
  // Function to check if the coordinates are in the path
  const isInPath = () => {
    return path.some(
      (coord) => coord.x === coordinates.x && coord.y === coordinates.y
    );
  };

  // If coordinates are in the path, return the first JSX structure
  if (isInPath()) {
    return (
      <div className="border flex justify-center items-center bg-green-300">
        {`${coordinates.x}, ${coordinates.y}`}
      </div>
    );
  }

  // Otherwise, return the second JSX structure
  return (
    <div
      className={`border flex justify-center items-center border-gray-300 ${
        coordinates.isTarget
          ? "bg-red-400"
          : coordinates.x === start.x && coordinates.y === start.y
          ? "bg-green-600"
          : "bg-blue-400"
      }`}
    >
      {`${
        coordinates.x === start.x && coordinates.y === start.y
          ? "Start"
          : coordinates.isTarget
          ? "Target"
          : `${coordinates.x}, ${coordinates.y}`
      }`}
    </div>
  );
}
