import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'rxdb-hooks';
import HomePage from "./pages/HomePage";
import Trial from "./pages/Trial";
import ThreeTrial from "./pages/ThreeTrial";

import './App.css';

function App() {

  return (
    <Provider>
      <Router>
          <Routes>
            {/* <Route exact path='/map' element={ <HomePage /> } /> */}
            <Route exact path='/three' element={ <ThreeTrial /> } />
            <Route exact path='/trial' element={ <Trial /> } />
            <Route exact path='*' element={<div><h1>No such Page</h1></div>} />
          </Routes>
        </Router>
    </Provider>
  );
}

export default App;
