import HomePage from './components/homePage/home'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import LoginPage from './components/LoginPage/login'
import AddContact from './components/addContact/contact'
import Contacts from './components/contacts/contact'

function App() {
  return (
    <div className="App" style={{backgroundColor:'rgb(247,248,249)',minHeight:'100vh'}}>
      <header className="App-header">
        <Navbar/>
        <Router>
          <Switch>
            <Route exact path='/'>
              <HomePage/>
            </Route>
            <Route exact path='/login'>
                <LoginPage/>
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
