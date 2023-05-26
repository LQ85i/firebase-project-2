import './App.css';
import handleSubmit from './handles/handlesubmit';
import { useRef } from 'react';
import resetDatabase from './resetDatabase';


function App() {
  const dataRef = useRef()

  const submithandler = (e) => {
    e.preventDefault();
    const value = dataRef.current.value;
    const strData = value.split(",");
    // [id,x,y]
    // for now the id's are 0-9
    const intData = [
      parseInt(strData[0]),
      parseInt(strData[1]),
      parseInt(strData[2])
    ];
    try {
      handleSubmit(intData)
    } catch (error) {
      console.log(error);
    }
    dataRef.current.value = ""
  }


  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
      <button onClick={resetDatabase}>reset</button>
    </div>
  );
}

export default App;