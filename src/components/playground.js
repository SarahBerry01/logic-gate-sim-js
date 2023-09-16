import React, { useState, useEffect} from 'react';
import interact from 'interactjs';
import and from '../assets/and.svg'


function Playground() {
    function Canvas(){
        return <div className="Canvas" id="Canvas">
        <svg src="../assets/and.svg"/>
        {gates.map((gate) => (
          <div
            key={gate.id}
            id={gate.id}
            className={`gate ${gate.type}`}
            x={gate.x}
            y={gate.y}
            style={{ transform: `translate(${gate.x}px, ${gate.y}px)` }}
          ></div>
        ))}
      </div>

    }
  const [gates, setGates] = useState([]);

  const addGate = (gateType) => {
    const newGate = {
      type: gateType,
      id: Date.now(), // Use a unique identifier
      x: 0, // Initial X position
      y: 0, // Initial Y position
    };

    setGates([...gates, newGate]);
  };


useEffect(() => {


  gates.forEach((gate) => {
    const element = document.getElementById(gate.id);

    if (element) {
      interact(element).draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent'
          })
        ],
        onmove: (event) => {
          const target = event.target;
          const x = parseFloat(target.getAttribute('x')) || 0;
          const y = parseFloat(target.getAttribute('y')) || 0;
  
          target.style.transform = `translate(${x + event.dx}px, ${y + event.dy}px)`;
          target.setAttribute('x', x + event.dx);
          target.setAttribute('y', y + event.dy);
          gate.x = x + event.dx
          gate.y = y + event.dy
        },
      });
    }
  });
}, [gates]);

  return (
    <div className='Playground'>
      <div className='Toolbar'>
        <button onClick={() => addGate('and')}>Add and</button>
        <button onClick={() => addGate('or')}>Add or</button>
        <button onClick={() => addGate('not')}>Add not</button>
      </div>
      <Canvas/>
      <div className='Toolbar'>
      <button>Connect</button>
      <button>Erase</button>
      <button>Move</button>
    </div>
    </div>
  );
}


export default Playground;