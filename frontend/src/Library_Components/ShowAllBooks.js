import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class ShowAllBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allBooks: []
        }
    }
    componentDidMount = (e) => {
        axios.get("http://127.0.0.1:5000/getBooks")
            .then((response) => {
                this.setState({
                    allBooks: response.data
                })
            })
            .catch((err) => alert(err))
    }
    render() {
        console.log(this.state.allBooks)
        let allBooks = this.state.allBooks.map((e, index) => {
            return (

                <tbody>
                    <tr>
                        <td>{index + 1}</td>
                        <td><Link to={`/bookDetails/${e.book_id}`}>{e.book_name}</Link></td>
                        <td><Link to={`/addAuthorToBook/${e.book_id}`}><button className="btn btn-primary ml-5">Add Author</button></Link></td>
                        <td><Link to={`/addCategoryToBook/${e.book_id}`}><button className="btn btn-primary ml-5">Add Category</button></Link></td>
                    </tr>
                </tbody>
            )
        })
        return (
            <div>
                <h2 className="offset-5 mt-5">ALL BOOKS</h2>
                <table class="table w-50 offset-3 mt-5">
                    {allBooks}
                </table>
            </div>
        )
    }
}
