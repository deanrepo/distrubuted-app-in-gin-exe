import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import NewRecipe from './components/NewRecipe';
import { Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'

class App extends React.Component {
  render() {

    return (
      <Container>
        <Navbar />
        <Route exact path="/" component={Recipes} />
        <Route exact path="/newRecipe" component={NewRecipe} />
      </Container>
    )
  }
}

export default App;
