import logo from './logo.svg';
import './App.css';
import Todo from './Todo';
import Formtoapi from './Formtoapi';
import { BrowserRouter, Route ,Router, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <BrowserRouter>
     <Routes>
      <Route path="/" element={<Formtoapi />} />
      <Route path="/Todo" element={<Todo />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
