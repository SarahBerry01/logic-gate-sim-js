import React, { useState } from 'react';


function Playground() {

    const [gates, setGates] = useState([]);
    class Gate {
        constructor(type) {
          this.type = type
        }
      }
    
    function GatePicker() {
        return <div className="GatePicker">
        <button className="GateButton" onClick={() => addGate({ type: "and" })}>AND</button>
        <button className="GateButton" onClick={() => addGate({ type: "not" })}>NOT</button>
        <button className="GateButton" onClick={() => addGate({ type: "or" })}>OR</button>
        </div>
    }
    function Canvas(){
        return <div className="Canvas">
        </div>
    }
    
    function Toolbar() {
        return <div className="Toolbar">
        </div>
    }
    
    function addGate(props) {
        const newGate = new Gate(props.type)
        console.log(props.type)
        console.log(gates)
        setGates([...gates, newGate]);
      };

      
    return(
    <div className='Playground'>
        <GatePicker/>
        <Canvas/>
        <Toolbar/>
      </div>)
}

export default Playground;