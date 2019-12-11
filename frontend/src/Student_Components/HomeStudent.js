import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class HomeStudent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchByname: '',
            searchByAuthor: '',
            searchByPublisher: '',
            searchByCategory: '',
            allAuthor: [],
            allPublisher: [],
            allCategory: []
        }
    }
    componentDidMount = (e) => {
        axios.get("http://127.0.0.1:5000/getAuthor")
            .then((response) => {
                this.setState({
                    allAuthor: response.data
                })
            })
            .catch((err) => alert(err))

        axios.get("http://127.0.0.1:5000/getPublisher")
            .then((response) => {
                this.setState({
                    allPublisher: response.data
                })
            })
            .catch((err) => alert(err))

        axios.get("http://127.0.0.1:5000/getCategory")
            .then((response) => {
                this.setState({
                    allCategory: response.data
                })
            })
            .catch((err) => alert(err))
    }

    onChangeName = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onChangeAuthor = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onChangePublisher = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onChangeCategory = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let author = this.state.allAuthor.map(e => {
            return (
                <option value={e.author_id}>{e.author_name}</option>
            )
        })
        let category = this.state.allCategory.map(e => {
            return (
                <option value={e.category_id}>{e.category_name}</option>
            )
        })
        let publisher = this.state.allPublisher.map(e => {
            return (
                <option value={e.publisher_id}>{e.publisher_name}</option>
            )
        })
        console.log(this.state.allPublisher)
        return (
            <div>
                <h2 className="offset-4">Search by Book name</h2>
                <input className="offset-4 form-control w-25 mt-4" name="searchByname" placeholder="Enter book name" onChange={this.onChangeName}></input>
                <Link to={`/search_books_name/${this.state.searchByname}`} className="btn btn-danger w-25 mt-3 offset-4" >Search</Link>
                <h2 className="offset-4">Search by Author Name</h2>
                <select className="offset-4 form-control w-25 mt-3" name="searchByAuthor" onChange={this.onChangeAuthor}>
                    <option selected>Select Author</option>
                    {author}
                </select>
                <Link to={`/search_books_author/${this.state.searchByAuthor}`} className="btn btn-primary w-25 offset-4 mt-3" >Search</Link>
                <h2 className="offset-4">Search by Publisher Name</h2>
                <select className="offset-4 form-control w-25 mt-3" name="searchByPublisher" onChange={this.onChangePublisher}>
                    <option selected>Select publisher</option>
                    {publisher}
                </select>
                <Link to={`/search_books_publisher/${this.state.searchByPublisher}`} className="btn btn-success w-25 offset-4 mt-3" >Search</Link>
                <h2 className="offset-4">Search by Category Name</h2>
                <select className="offset-4 form-control w-25 mt-3" name="searchByCategory" onChange={this.onChangeCategory}>
                    <option selected>Select Category</option>
                    {category}
                </select>
                <Link to={`/search_books_category/${this.state.searchByCategory}`} className="btn btn-secondary w-25 offset-4 mt-3" >Search</Link>
            </div>
        )
    }
}
