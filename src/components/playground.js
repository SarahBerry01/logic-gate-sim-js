import React, { useEffect, useState } from "react";
function Playground() {
  const gateDim = 32;
  const [selectedTool, setSelectedTool] = useState("move");
  const [selectedGate, setSelectedGate] = useState();

  const removeSelection = () => {
    const gateElement = document.querySelector(
      `[row="${selectedGate.row}"][col="${selectedGate.col}"]`
    );
    gateElement.classList.remove("selectedGate");
    setSelectedGate();
  };

  const handleToolClick = (buttonId) => {
    //remove any selections
    if (selectedGate) {
      removeSelection();
    }

    setSelectedTool(buttonId);
  };

  const generateGrid = () => {
    const rows = 15;
    const columns = 20;
    const grid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        grid.push(
          <button
            className="gridElement"
            row={row}
            col={col}
            onClick={() => handleClick(row, col)}
          ></button>
        );
      }
    }
    return grid;
  };

  useEffect(() => {
    const scale = 10;
    const elements = document.querySelectorAll(".gridElement");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = `rgb(26, 26, 26)`; // Line color
    ctx.lineWidth = scale * 2; // Line width
    // Loop through the selected elements
    elements.forEach((element) => {
      if (element.classList.contains("gate")) {
        console.log(element)
        if (element.getAttribute("inZeroRow")) {
          const x1 = scale * (parseInt(element.getAttribute("col"))) * gateDim + 20;
          const y1 = scale * (parseInt(element.getAttribute("row")) + 0.33) * gateDim;
          const x2 = scale * (parseInt(element.getAttribute("inZeroCol")) + 1) * gateDim;
          const y2 = scale * (parseInt(element.getAttribute("inZeroRow")) +0.5)  * gateDim;
          draw(ctx, x1, y1, x2, y2)
        }
        if (element.getAttribute("inOneRow")) {
          const x1 = scale * (parseInt(element.getAttribute("col"))) * gateDim + 20;
          const y1 = scale * (parseInt(element.getAttribute("row")) + 0.66) * gateDim;
          const x2 = scale * (parseInt(element.getAttribute("inOneCol")) + 1) * gateDim;
          const y2 = scale * (parseInt(element.getAttribute("inOneRow")) +0.5)  * gateDim;
          draw(ctx, x1, y1, x2, y2)
        }
      }
    });
  });

  function draw(ctx, x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo((x1 + x2)/2, y1);
    ctx.lineTo((x1 + x2)/2, y2);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function handleClick(row, col) {
    const element = document.querySelector(`[row="${row}"][col="${col}"]`);
    if (selectedTool === "erase") {
      element.setAttribute("gate", null);
      element.setAttribute("class", `gridElement`);
      //add logic to remove connections
    }
    if (selectedTool === "connect") {
      if (selectedGate === undefined && element.className !== "gridElement") {
        setSelectedGate({
          row: element.getAttribute("row"),
          col: element.getAttribute("col"),
        });
        element.classList.add("selectedGate");
      } else if (element.className !== "gridElement") {
        console.log(element.inzerorow)
        // if no inputs exist, connect to top input
        if (!element.getAttribute("inZeroRow")){
        element.setAttribute("inZeroRow", selectedGate.row);
        element.setAttribute("inZeroCol", selectedGate.col);
        removeSelection();}
        // if top input exists, connect to bottom input
        else if (!element.inOneRow){
          element.setAttribute("inOneRow", selectedGate.row);
          element.setAttribute("inOneCol", selectedGate.col);
          removeSelection();
        }
      }
    }
    if (["and", "or", "not"].includes(selectedTool)) {
      element.setAttribute("gate", selectedTool);
      element.setAttribute("class", `gridElement gate ${selectedTool}`);
    }
  }

  return (
    <div className="Playground">
      <div className="Toolbar">
        <button
          className={selectedTool === "and" ? "SelectedTool" : ""}
          onClick={() => handleToolClick("and")}
        >
          Add and
        </button>
        <button
          className={selectedTool === "or" ? "SelectedTool" : ""}
          onClick={() => handleToolClick("or")}
        >
          Add or
        </button>
        <button
          className={selectedTool === "not" ? "SelectedTool" : ""}
          onClick={() => handleToolClick("not")}
        >
          Add not
        </button>
        <button
          className={selectedTool === "connect" ? "SelectedTool" : ""}
          onClick={() => handleToolClick("connect")}
        >
          Connect
        </button>
        <button
          className={selectedTool === "erase" ? "SelectedTool" : ""}
          onClick={() => handleToolClick("erase")}
        >
          Erase
        </button>
        <button
          className={selectedTool === "move" ? "SelectedTool" : ""}
          onClick={() => handleToolClick("move")}
        >
          Move
        </button>
      </div>
      <div className="circuitPlayground">
        <div class="gridContainer">
        {generateGrid()}
      </div>
      <canvas id="canvas" width="6400" height="4800" />
      </div>
    </div>
  );
}

export default Playground;
