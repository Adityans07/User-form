import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import ParentComponent from './components/ParentComponent';
import BasicExample from './components/Nav';
function App() {
  return (
    <div className="App">
      <BasicExample />
      {/* <Form /> */}
      <ParentComponent />
    </div>
  );
}

export default App;
