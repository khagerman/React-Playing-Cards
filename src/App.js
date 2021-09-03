import logo from "./logo.svg";
import "./App.css";
import ClickToDraw from "./ClickToDraw";
import TimerToDraw from "./TimerToDraw";
function App() {
  return (
    <div className="App">
      {
        // <TimerToDraw />

        <ClickToDraw />
      }
    </div>
  );
}

export default App;
