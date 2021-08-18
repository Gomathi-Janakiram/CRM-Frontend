import HomePage from './components/homePage/home'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './components/navbar/navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Router>
          <Switch>
            <Route exact path='/'>
              <HomePage/>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
