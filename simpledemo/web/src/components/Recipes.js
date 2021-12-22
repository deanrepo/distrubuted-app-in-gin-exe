import React from 'react'
import Recipe from './Recipe'

const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL

export default class Recipes extends React.Component {
    getRecipes() {
        fetch(`${REACT_APP_SERVER_API_URL}/recipes`)
          .then(response => response.json())
          .then(data => this.setState({recipes: data}))
          .catch(err => console.error("fetch recipes err: ", err))
    }

    constructor(props) {
        super(props)
        this.state = {
            recipes: []
        }

        this.getRecipes()
    }

    render() {
        const {recipes} = this.state
        return (
            <div>
                {recipes.map((recipe, idx) => {
                    return <Recipe key={`recipe-${idx}`} recipe={recipe} />
                })}
            </div>
        )
    }
} 