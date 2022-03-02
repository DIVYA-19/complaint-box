import './App.css';
import Complaints from './components/Complaints/Complaints';
import Header from './components/Header/Header';
import Summary from './components/Summary/Summary';

function App() {
  return (
    <div className="App">
      <Header />
      <Summary />
      <Complaints />
    </div>
  );
}

export default App;
