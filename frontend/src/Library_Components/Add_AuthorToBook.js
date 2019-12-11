import React, { Component } from 'react'
import axios from 'axios'
export default class Add_AuthorToBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book_name: '',
            author_id: '',
            allAuthor: [],
            addedAuthor: [],
            bookDetails: [],
            map_id: ''
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

        axios.get("http://127.0.0.1:5000/get-book-authors/" + this.props.match.params.book_id)
            .then((response) => {
                this.setState({
                    addedAuthor: response.data
                })
            })
            .catch((err) => alert(err))

        axios.get("http://127.0.0.1:5000/get-book/" + this.props.match.params.book_id)
            .then((response) => {
                this.setState({
                    bookDetails: response.data[0]
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
        var authorDetails = {
            author_id: this.state.author_id
        }
        axios.post("http://127.0.0.1:5000/add-author-to-book/" + this.props.match.params.book_id, authorDetails)
            .then(response => {
                alert('Added Sucessfully')
                window.location.reload(false);
            })
            .catch(error => { console.log(error) })

    }
    deleteAuthor = (map_id) => {
        axios.delete("http://127.0.0.1:5000/delete-author-book/" + map_id)
            .then((response) => {
                alert(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }
    render() {
        let author = this.state.allAuthor.map(e => {
            return (
                <option value={e.author_id}>{e.author_name}</option>
            )
        })
        let addedAuthor = this.state.addedAuthor.reverse().map((e, index) => {
            return (
                <div>
                    <div className="ml-5">{index + 1} . {e.author_name}</div>
                    <button className="btn btn-danger" onClick={() => this.deleteAuthor(e.map_id)} style={{ marginLeft: "200px", marginTop: "-50px" }}>Delete</button>
                </div>
            )
        })
        return (
            <div>
                <h3 className="offset-4 mt-5">Book Name: <b>{this.state.bookDetails.book_name}</b></h3>
                <h3 className="offset-4 mt-3">Publisher Name: <b>{this.state.bookDetails.publisher_name}</b></h3>
                <h2 className="offset-5 mt-5">Add Author</h2>
                <form onSubmit={this.onSubmit}>
                    <select className="offset-4 form-control w-25 mt-3" name="author_id" onChange={this.onChange}>
                        <option selected>Select Author</option>
                        {author}
                    </select>
                    <button className="btn btn-primary w-25 offset-4 mt-3" >Add</button>
                </form>
                <div className="offset-5 mt-5">
                    <h2>Added Authors</h2>
                    {addedAuthor}
                </div>
            </div>
        )
    }
}
