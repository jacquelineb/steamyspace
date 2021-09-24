import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/(profiles|id)/:userId' component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
