import React, { useState, useEffect } from 'react';
import interact from 'interactjs';

function Playground() {
  const [gates, setGates] = useState([]);
  const [selectedTool, setSelectedTool] = useState('move');

  const handleToolClick = (buttonId) => {
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

  const handleGateTap = (event) => {
    if (selectedTool === 'erase') {
      console.log("tap")
      const clickedElement = event.target;
      const updatedGates = gates.filter((gate) => gate.id === clickedElement.id);
      setGates(updatedGates);
    }
  };

  useEffect(() => {
    gates.forEach((gate) => {
      const element = document.getElementById(gate.id);

      if (element && selectedTool === 'move') {
        interact(element).draggable({
          modifiers: [interact.modifiers.restrictRect({ restriction: 'parent' })],
          onmove: (event) => {
            const target = event.target;
            const x = parseFloat(target.getAttribute('x')) || 0;
            const y = parseFloat(target.getAttribute('y')) || 0;

            target.style.transform = `translate(${x + event.dx}px, ${y + event.dy}px)`;
            target.setAttribute('x', x + event.dx);
            target.setAttribute('y', y + event.dy);
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
        <button onClick={() => addGate('and')}>Add and</button>
        <button onClick={() => addGate('or')}>Add or</button>
        <button onClick={() => addGate('not')}>Add not</button>
      </div>
      <div className="Canvas" id="Canvas">
        <svg src="../assets/and.svg" />
        {renderGates()}
      </div>
      <div className="Toolbar">
        <button className={selectedTool === 'connect' ? 'SelectedTool' : ''} onClick={() => handleToolClick('connect')}>
          Connect
        </button>
        <button className={selectedTool === 'erase' ? 'SelectedTool' : ''} onClick={() => handleToolClick('erase')}>
          Erase
        </button>
        <button className={selectedTool === 'move' ? 'SelectedTool' : ''} onClick={() => handleToolClick('move')}>
          Move
        </button>
      </div>
    </div>
  );
}

export default Playground;
