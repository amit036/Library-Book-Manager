import React, { Component } from 'react'
import axios from 'axios'
export default class Add_Categories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category_name: '',
        }
    }
    onChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        var categoryDetails = {
            category_name: this.state.category_name
        }
        axios.post("http://127.0.0.1:5000/add-category", categoryDetails)
            .then(response => {
                console.log(response.data)
                alert('Added Sucessfully')
                this.props.history.push('/home-library')
            })
            .catch(error => { console.log(error) })
    }

    render() {
        return (
            <div>
                <h2 className="offset-5">Add Category</h2>
                <form onSubmit={this.onSubmit}>
                    <input className="offset-4 form-control w-25 mt-4" name="category_name" onChange={this.onChange}></input>
                    <button className="btn btn-danger w-25 offset-4 mt-3" >Add</button>
                </form>
            </div>
        )
    }
}
