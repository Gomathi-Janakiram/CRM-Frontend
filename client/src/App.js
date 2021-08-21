import HomePage from './components/homePage/home'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import AddContact from './components/addContact/contact'
import Contacts from './components/contacts/contact'

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
            <Route exact path='/addContact'>
              <AddContact/>
            </Route>
            <Route exact path='/contacts'>
              <Contacts/>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
