import React, { Component } from 'react'
import axios from 'axios'
export default class Add_Book extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book_name: '',
            publisher_id: '',
            allPublisher: []
        }
    }
    componentDidMount = (e) => {
        axios.get("http://127.0.0.1:5000/getPublisher")
            .then((response) => {
                this.setState({
                    allPublisher: response.data
                })
            })
            .catch((err) => alert(err))
    }
    onChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        var bookDetails = {
            book_name: this.state.book_name,
            publisher_id: this.state.publisher_id,
        }
        axios.post("http://127.0.0.1:5000/add-book", bookDetails)
            .then(response => {
                console.log(response.data)
                alert('Added Sucessfully')
                this.props.history.push('/showAllBooks')
            })
            .catch(error => { console.log(error) })

    }

    render() {
        console.log(this.state)
        console.log(this.state.allPublisher)
        let publisher = this.state.allPublisher.map(e => {
            return (
                <option value={e.publisher_id}>{e.publisher_name}</option>
            )
        })
        return (
            <div>
                <h2 className="offset-5">Add Book</h2>
                <form onSubmit={this.onSubmit}>
                    <input className="offset-4 form-control w-25 mt-4" name="book_name" onChange={this.onChange}></input>
                    <select className="offset-4 form-control w-25 mt-3" name="publisher_id" onChange={this.onChange}>
                        <option selected>Select Publisher</option>
                        {publisher}
                    </select>
                    <button className="btn btn-danger w-25 offset-4 mt-3" >Add</button>
                </form>
            </div>
        )
    }
}
