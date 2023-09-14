import './css/App.css';
import Header from './components/header';
import Toolbar from './components/toolbar';
import GatePicker from './components/gatePicker';
import Playground from './components/playground';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='PlaygroundGatePickerCont'>
        <GatePicker/>
        <Playground/>
        <Toolbar/>
      </div>
    </div>
  );
}

export default App;
