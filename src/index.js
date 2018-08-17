import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import TournamentResults from './routes/tournament-results'
import WaitingToStart from './routes/waiting-to-start'
import NotFound from './routes/not-found'
import Welcome from './routes/welcome'
import Participants from './routes/participants-list'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/tournament-results" component={TournamentResults} />
      <Route exact path="/waiting-to-start" component={WaitingToStart} />
      <Route exact path="/participants" component={Participants} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
