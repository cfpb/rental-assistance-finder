import './App.css';
import programs from "./data/programs.json";
import Results from "./Results.js";

function App() {
  return (
    <div className="App">
      <Results data={ programs }/>
    </div>
  );
}

export default App;
