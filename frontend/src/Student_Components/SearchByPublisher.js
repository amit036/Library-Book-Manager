import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default class SearchByPublisher extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allBooks: []
        }
    }

    componentDidMount = (e) => {
        axios.get("http://127.0.0.1:5000/get-book-by-publisher/" + this.props.match.params.publisher_id)
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
                <div>
                    {index + 1} :<Link to={`/bookDetails/${e.book_id}`}> {e.book_name}</Link>
                </div>
            )
        })
        return (
            <div>
                <div className="offset-5 mt-5">
                    {allBooks}
                </div>
            </div>
        )
    }
}