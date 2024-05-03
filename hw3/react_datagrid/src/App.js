import Header from './header'
import DataGridFunc from './datagrid'
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        {Header()}
      </div>
      <div>
        {DataGridFunc()}
      </div>
    </div>
  );
}

export default App;
