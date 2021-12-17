import React from 'react'
import Recipe from './Recipe'

export default class Recipes extends React.Component {
    getRecipes() {
        fetch('http://localhost/api/recipes')
          .then(response => response.json())
          .then(data => this.setState({recipes: data}))
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