import axios from 'axios'
import React from 'react'
import './NewRecipe.css'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove';

const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL

export default class NewRecipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: "",
            tags: [""],
            ingredients: [""],
            instructions: [""]
        }
    }

    createRecipe = async (data) => {
        try {
            await axios.post(`${REACT_APP_SERVER_API_URL}/recipes`, data)
            alert('The recipe has been created successfully!')
        } catch (err) {
            console.error(err)
            alert("Create recipe error: ", err)
        }
    }

    assemblyData = () => {
        const data = {}
        const { fullName, tags, ingredients, instructions } = this.state
        data.name = fullName
        data.tags = tags
        data.ingredients = ingredients
        data.instructions = instructions
        console.log("data: ", data)
        return data
    }

    handleInput = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleMultiInput = (event, idx) => {
        event.preventDefault()
        const fields = this.state[event.target.name]
        fields[idx] = event.target.value
        this.setState({
            [event.target.name]: fields
        })
    }

    handleSubmit = () => {
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

    handleAddField = (fieldName) => {
        const fields = this.state[fieldName]
        fields.push("")
        this.setState({
            [fieldName]: fields
        })
    }

    handleRemoveField = (fieldName, idx) => {
        const fields = this.state[fieldName]
        fields.splice(idx, 1)
        this.setState({
            [fieldName]: fields
        })
    }

    renderDynamicInputFields = (fields, fieldName, labl, placeholder) => {
        const nodes = fields.map((field, idx) => {
            return (
                <div className={'input-field'} key={idx}>
                    {idx === 0 && <label className={'input-labl'}>{`${labl}: `}</label>}
                    <input className={idx === 0 ? 'name-input' : 'name-input-sub'} type="text" placeholder={placeholder}
                        value={field} name={fieldName} onChange={(event) => this.handleMultiInput(event, idx)} />
                    {idx === 0 ? <IconButton
                        className={'icon-button'}
                        onClick={() => this.handleAddField(fieldName)}
                    >
                        <AddIcon />
                    </IconButton> : <IconButton className={'icon-button'} onClick={() => this.handleRemoveField(fieldName, idx)}>
                        <RemoveIcon />
                    </IconButton>}
                </div>
            )
        })

        return (
            <div>
                {nodes}
            </div>
        )
    }

    render() {
        const { fullName, tags, ingredients, instructions } = this.state
        return (
            <div className={'new-recipe'}>
                <h1>Create a new recipe</h1>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    {this.renderInputField('fullName', fullName, 'Name', "Input your name")}
                    {this.renderDynamicInputFields(tags,'tags',  'Tags', "Input recipe tags")}
                    {this.renderDynamicInputFields(ingredients, 'ingredients', 'Ingredients', 'Input recipe ingredients')}
                    {this.renderDynamicInputFields(instructions,'instructions', 'Instructions', "Input recipe instructions")}
                    <button type="button" onClick={this.handleSubmit}>Create</button>
                </form>
            </div>
        )
    }
}