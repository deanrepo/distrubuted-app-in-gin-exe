import React from 'react';
import './Recipe.css';

class Recipe extends React.Component {
    render() {
        const {recipe} = this.props
        console.log(recipe)
        return (
            <div className="recipe">
                <h4>{recipe.name}</h4>
                <ul>
                    {recipe.ingredients && 
                        recipe.ingredients.map((ingredient, index) => {
                        return <li key={index}>{ingredient}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Recipe;