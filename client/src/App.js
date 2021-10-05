import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect strict from={'/(profiles|id)/:userId/'} to={'/(profiles|id)/:userId'} />
        <Route path='/(profiles|id)/:userId' component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
