import React, { Component } from 'react'
import axios from 'axios'
export default class BookDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allAuthor: [],
            allCategory: [],
            bookDetails: []

        }
    }

    componentDidMount = (e) => {

        axios.get("http://127.0.0.1:5000/get-book/" + this.props.match.params.book_id)
            .then((response) => {
                this.setState({
                    bookDetails: response.data[0]
                })
            })
            .catch((err) => alert(err))

        axios.get("http://127.0.0.1:5000/get-book-authors/" + this.props.match.params.book_id)
            .then((response) => {
                this.setState({
                    allAuthor: response.data
                })
            })
            .catch((err) => alert(err))

        axios.get("http://127.0.0.1:5000/get-book-categories/" + this.props.match.params.book_id)
            .then((response) => {
                this.setState({
                    allCategory: response.data
                })
            })
            .catch((err) => alert(err))

    }
    render() {
        let bookDetails = this.state.bookDetails
        let allAuthor = this.state.allAuthor
        let allCategory = this.state.allCategory

        return (
            <div>
                <h3 className=" mt-5" style={{ marginLeft: "900px" }}>Book Details</h3>
                <div class="card offset-5 mt-5" style={{ "width": "20rem" }}>
                    <div class="card-body">
                        <h5 class="card-title text-center">{bookDetails.book_name}</h5>
                        <p class="card-text text-center">Publisher: <b>{bookDetails.publisher_name}</b></p>
                    </div>
                    <h4 className="text-center">Authors</h4>
                    <ul class="list-group list-group-flush">
                        {
                            allAuthor ? allAuthor.map((e, index) => {
                                return (
                                    <li class="list-group-item text-center">{index + 1}. {e.author_name}</li>
                                )
                            }) : <li class="list-group-item text-center">No Author added</li>
                        }
                    </ul>
                    <h4 className="text-center">Categories</h4>
                    <ul class="list-group list-group-flush">
                        {
                            allCategory ? allCategory.map((e, index) => {
                                return (
                                    <li class="list-group-item text-center">{index + 1}. {e.category_name}</li>
                                )
                            }) : <li class="list-group-item text-center">No Category added</li>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
