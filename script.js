const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;
const CANVAS_SIZE_PX = 960;

const gridContainer = document.getElementById("grid-container");
const resizeButton = document.getElementById("resize-button");

function getRandomChannelValue() {
  return Math.floor(Math.random() * 256);
}

function getDarkenedColor(baseColor, darkenStep) {
  const darknessFactor = Math.max(0, 1 - darkenStep * 0.1);
  const red = Math.round(baseColor.r * darknessFactor);
  const green = Math.round(baseColor.g * darknessFactor);
  const blue = Math.round(baseColor.b * darknessFactor);
  return `rgb(${red}, ${green}, ${blue})`;
}

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
      const currentStep = Number(square.dataset.darkenStep ?? "0");
      const nextStep = Math.min(10, currentStep + 1);
      square.dataset.darkenStep = String(nextStep);

      if (!square.dataset.baseColor) {
        const randomColor = {
          r: getRandomChannelValue(),
          g: getRandomChannelValue(),
          b: getRandomChannelValue(),
        };
        square.dataset.baseColor = JSON.stringify(randomColor);
      }

      const baseColor = JSON.parse(square.dataset.baseColor);
      square.style.backgroundColor = getDarkenedColor(baseColor, nextStep);
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
