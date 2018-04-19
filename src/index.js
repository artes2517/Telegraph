import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import NewStory from './containers/NewStory/NewStory'
import StoryPage from './containers/StoryPage/StoryPage'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter , Route, Switch } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path = '/' component={ NewStory }/>
      <Route path='/:id' component={ StoryPage }/>
    </Switch>
  </BrowserRouter>, 
  document.getElementById('root')
)
registerServiceWorker()
