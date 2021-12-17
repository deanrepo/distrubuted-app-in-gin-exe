import axios from 'axios'
import React from 'react'
import './NewRecipe.css'

export default class NewRecipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: "", 
            tags: "",
            ingredients: "",
            instructions: ""
        }
    }

    createRecipe = async (data) => {
        try {
            let res = await axios.post("http://localhost/api/recipes", data)
            alert('The recipe has been created successfully!')
        } catch(err) {
            console.log(err)
            alert("Create recipe error: ", err)
        }
    } 

    assemblyData = () => {
        const data = {}
        const { fullName, tags, ingredients, instructions } = this.state
        data.name = fullName
        data.tags = tags.trim().split(",")
        data.ingredients = ingredients.trim().split("|")
        data.instructions = instructions.trim().split("|")
        console.log("data: ", data)
        return data
    }

    handleInput = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { fullName, tags, ingredients, instructions } = this.state

        console.log("handle submit...")
        this.createRecipe(this.assemblyData())
    }

    renderInputField = (fieldName, fieldValue, labl, placeholder) => {
        return (
            <div className={'input-field'}>
                <label className={'input-labl'}>{`${labl}: `}</label>
                <input className={'name-input'} type="text" placeholder={placeholder} 
                            value={fieldValue} name={fieldName} onChange={(event) => this.handleInput(event)} />
            </div>
        )
    }

    renderTextarea = (fieldName, fieldValue, labl, placeholder) => {
        return (
            <div className={'input-textarea'}>
                <label className={'input-labl'}>{`${labl}: `}</label>
                <textarea className={'name-input'} name={fieldName} value={fieldValue} placeholder={placeholder} onChange={(event) => this.handleInput(event)}></textarea>
            </div>
        )
    }

    render() {
        const {fullName, tags, ingredients, instructions} = this.state
        return (
            <div className={'new-recipe'}>
                <h1>Create a new recipe</h1>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    {this.renderInputField('fullName', fullName, 'Name', "Input your name")}
                    {this.renderInputField('tags', tags, 'Tags', "Input recipe tags")}
                    {this.renderTextarea('ingredients', ingredients, 'Ingredients', "Input recipe ingredients")}
                    {this.renderTextarea('instructions', instructions, 'Instructions', "Input recipe instructions")}
                    <button type="submit">Create</button>
                </form>
            </div>
        )
    }
}