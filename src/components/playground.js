import React, { useState, useEffect } from "react";
import interact from "interactjs";
import { findConnectionPoint, connectionValid } from "./helpers.js";

function Playground() {
  const [gates, setGates] = useState([]);
  const [selectedTool, setSelectedTool] = useState("move");
  const [gateToConnect, setGateToConnect] = useState();

  const handleToolClick = (buttonId) => {
    setGateToConnect();
    setSelectedTool(buttonId);
  };

  const addGate = (gateType) => {
    const newGate = {
      type: gateType,
      id: Date.now(),
      x: 0,
      y: 0,
    };

    setGates([...gates, newGate]);
  };

  const connectGates = (secondId, secondConnPoint) => {
    // check if not valid
    const validInfo = connectionValid(
      gateToConnect.id,
      secondId,
      gateToConnect.conn,
      secondConnPoint
    );
    // if valid, update gate property to define its input
    if (validInfo.valid) {
      const updatedGates = gates.map((gate) => {
        if (gate.id === parseInt(validInfo.in)) {
          return { ...gate, [validInfo.inConn]: validInfo.out };
        }
        return gate;
      });
      setGates(updatedGates);
    }
    setGateToConnect();
  };

  const connectLogic = (id, conn) => {
    if (gateToConnect === undefined) {
      setGateToConnect({ id, conn });
    } else {
      connectGates(id, conn);
    }
  };

  const handleGateTap = (event) => {
    const clickedElement = event.target;
    if (selectedTool === "erase") {
      const updatedGates = gates.filter(
        (gate) => gate.id === clickedElement.id
      );
      setGates(updatedGates);
    }

    if (selectedTool === "connect") {
      // Get the dimensions and position of the element
      const rect = clickedElement.getBoundingClientRect();
      const connPoint = findConnectionPoint(rect, event.clientX, event.clientY);
      connectLogic(clickedElement.id, connPoint);
    }
  };

  useEffect(() => {
    gates.forEach((gate) => {
      const element = document.getElementById(gate.id);

      if (element && selectedTool === "move") {
        interact(element).draggable({
          modifiers: [
            interact.modifiers.restrictRect({ restriction: "parent" }),
          ],
          onmove: (event) => {
            const target = event.target;
            const x = parseFloat(target.getAttribute("x")) || 0;
            const y = parseFloat(target.getAttribute("y")) || 0;

            target.style.transform = `translate(${x + event.dx}px, ${
              y + event.dy
            }px)`;
            target.setAttribute("x", x + event.dx);
            target.setAttribute("y", y + event.dy);
            gate.x = x + event.dx;
            gate.y = y + event.dy;
          },
        });
      }
    });
  }, [gates, selectedTool]);

  const renderGates = () => {
    return gates.map((gate) => (
      <div
        key={gate.id}
        id={gate.id}
        className={`gate ${gate.type}`}
        x={gate.x}
        y={gate.y}
        style={{ transform: `translate(${gate.x}px, ${gate.y}px)` }}
        onClick={handleGateTap}
      ></div>
    ));
  };

  return (
    <div className="Playground">
      <div className="Toolbar">
        <button onClick={() => addGate("and")}>Add and</button>
        <button onClick={() => addGate("or")}>Add or</button>
        <button onClick={() => addGate("not")}>Add not</button>
      </div>
      <div className="Canvas" id="Canvas">
        <svg src="../assets/and.svg" />
        {renderGates()}
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
