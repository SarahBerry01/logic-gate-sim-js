import React, { useState } from "react";
function Playground() {
  const [selectedTool, setSelectedTool] = useState("move");
  // const [gridContent, setGridContent] = useState(Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => null)));

  const handleToolClick = (buttonId) => {
    setSelectedTool(buttonId);
  };

  const generateGrid = () => {
    const rows = 15;
    const columns = 15;
    const grid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        grid.push(
            <button className="gridElement" row={row} col={col} onClick={() => handleClick(row, col)}></button>
        );
      }
    }
    return grid;
  };

  function handleClick (row, col){
    const element = document.querySelector(`[row="${row}"][col="${col}"]`);
    if (["and", "or", "not"].includes(selectedTool)){

      element.setAttribute("gate", selectedTool)
      element.setAttribute("class", `gridElement ${selectedTool}`)
      console.log(element)
    }

  }



  return (
    <div className="Playground">
      <div className="Toolbar">
        <button className={selectedTool === "and" ? "SelectedTool" : ""}
        onClick={() => handleToolClick("and")}>Add and</button>
        <button className={selectedTool === "or" ? "SelectedTool" : ""}
        onClick={() => handleToolClick("or")}>Add or</button>
        <button className={selectedTool === "not" ? "SelectedTool" : ""}
        onClick={() => handleToolClick("not")}>Add not</button>
      </div>
      <div class="gridContainer">
      {generateGrid()}
      </div>
      <div className="Toolbar">
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
    </div>
  );
}

export default Playground;
