const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;
const CANVAS_SIZE_PX = 960;

const gridContainer = document.getElementById("grid-container");
const resizeButton = document.getElementById("resize-button");

function createGrid(size) {
  gridContainer.replaceChildren();

  const totalSquares = size * size;
  const squareSize = CANVAS_SIZE_PX / size;

  for (let index = 0; index < totalSquares; index += 1) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.addEventListener("mouseenter", () => {
      square.classList.add("hovered");
    });

    gridContainer.append(square);
  }
}

function askForGridSize() {
  const input = prompt(`Enter the number of squares per side (1-${MAX_SIZE}):`);

  if (input === null) {
    return;
  }

  const parsedValue = Number(input.trim());

  if (!Number.isInteger(parsedValue) || parsedValue < 1 || parsedValue > MAX_SIZE) {
    alert(`Please enter a whole number between 1 and ${MAX_SIZE}.`);
    return;
  }

  createGrid(parsedValue);
}

resizeButton.addEventListener("click", askForGridSize);
createGrid(DEFAULT_SIZE);
