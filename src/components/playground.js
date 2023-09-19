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
        if (element.getAttribute("inZeroRow")) {
          let x1 = scale * parseInt(element.getAttribute("col")) * gateDim + 20;
          let y1 =
            scale * (parseInt(element.getAttribute("row")) + 1 / 3) * gateDim;
          let x2 =
            scale * (parseInt(element.getAttribute("inZeroCol")) + 1) * gateDim;
          let y2 =
            scale *
            (parseInt(element.getAttribute("inZeroRow")) + 0.5) *
            gateDim;
          if (
            element.classList.contains("not") ||
            element.classList.contains("output")
          ) {
            y1 =
              scale * (parseInt(element.getAttribute("row")) + 0.5) * gateDim;
          }
          draw(ctx, x1, y1, x2, y2);
        }
        if (element.getAttribute("inOneRow")) {
          const x1 = scale * parseInt(element.getAttribute("col")) * gateDim;
          const y1 =
            scale * (parseInt(element.getAttribute("row")) + 2 / 3) * gateDim;
          const x2 =
            scale * (parseInt(element.getAttribute("inOneCol")) + 1) * gateDim;
          const y2 =
            scale *
            (parseInt(element.getAttribute("inOneRow")) + 0.5) *
            gateDim;
          draw(ctx, x1, y1, x2, y2);
        }
      }
    });
  });

  function draw(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo((x1 + x2) / 2, y1);
    ctx.lineTo((x1 + x2) / 2, y2);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function clear() {
    window.location.reload();
  }

  function handleSwitch(element) {
    if (selectedTool === "select") {
      if (element.classList.contains("switchOff")) {
        element.classList.remove("switchOff");
        element.classList.add("switchOn");
        element.setAttribute("gate", "switchOn");
      } else if (element.classList.contains("switchOn")) {
        element.classList.remove("switchOn");
        element.classList.add("switchOff");
        element.setAttribute("gate", "switchOff");
      }
    }
  }
  function handleErase(element){
  if (selectedTool === "erase") {
    element.setAttribute("gate", null);
    element.setAttribute("class", `gridElement`);
    //add logic to remove connections
  }}

  function handleAddGate(element){
    if (["and", "or", "not", "switchOff", "output"].includes(selectedTool)) {
      element.setAttribute("gate", selectedTool);
      element.setAttribute("class", `gridElement gate ${selectedTool}`);
    }
  }

  function handleConnect(element){
    if (selectedTool === "connect") {
      if (selectedGate === undefined) {
        if (
          element.className !== "gridElement" &&
          !element.classList.contains("output")
        ) {
          setSelectedGate({
            row: element.getAttribute("row"),
            col: element.getAttribute("col"),
          });
          element.classList.add("selectedGate");
        }
      } else if (element.className !== "gridElement") {
        // if no inputs exist, connect to top input
        if (!element.getAttribute("inZeroRow")) {
          element.setAttribute("inZeroRow", selectedGate.row);
          element.setAttribute("inZeroCol", selectedGate.col);
          removeSelection();
        }
        // if top input exists, connect to bottom input
        else if (!element.inOneRow && !element.classList.contains("not")) {
          element.setAttribute("inOneRow", selectedGate.row);
          element.setAttribute("inOneCol", selectedGate.col);
          removeSelection();
        }
      }
    }
  }

  function handleClick(row, col) {
    const element = document.querySelector(`[row="${row}"][col="${col}"]`);
    handleSwitch(element);
    handleErase(element);
    handleAddGate(element);
    handleConnect(element);

  }

  return (
    <div className="Playground">
      <div className="Toolbar">
        <button
          className={
            selectedTool === "switchOff" ? "tool SelectedTool" : "tool"
          }
          onClick={() => handleToolClick("switchOff")}
        >
          Add switch
        </button>
        <button
          className={selectedTool === "output" ? "tool SelectedTool" : "tool"}
          onClick={() => handleToolClick("output")}
        >
          Add output
        </button>
        <button
          className={selectedTool === "and" ? "tool SelectedTool" : "tool"}
          onClick={() => handleToolClick("and")}
        >
          Add and
        </button>
        <button
          className={selectedTool === "or" ? "tool SelectedTool" : "tool"}
          onClick={() => handleToolClick("or")}
        >
          Add or
        </button>
        <button
          className={selectedTool === "not" ? "tool SelectedTool" : "tool"}
          onClick={() => handleToolClick("not")}
        >
          Add not
        </button>
        <button
          className={selectedTool === "connect" ? "tool SelectedTool" : "tool"}
          onClick={() => handleToolClick("connect")}
        >
          Connect
        </button>
        <button
          className={selectedTool === "erase" ? "tool SelectedTool" : "tool"}
          onClick={() => handleToolClick("erase")}
        >
          Erase
        </button>
        <button
          className={selectedTool === "select" ? "tool SelectedTool" : "tool"}
          onClick={() => handleToolClick("select")}
        >
          select
        </button>
        <button className={"tool"} onClick={() => clear()}>
          clear
        </button>
      </div>
      <div className="circuitPlayground">
        <div class="gridContainer">{generateGrid()}</div>
        <canvas id="canvas" width="6400" height="4800" />
      </div>
    </div>
  );
}

export default Playground;
