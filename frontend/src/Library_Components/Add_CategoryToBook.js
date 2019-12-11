import React, { Component } from 'react'
import axios from 'axios'
export default class Add_CategoryToBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book_name: '',
            category_id: '',
            allCategory: [],
            addedCategory: [],
            bookDetails: []
        }
    }
    componentDidMount = (e) => {
        axios.get("http://127.0.0.1:5000/getCategory")
            .then((response) => {
                this.setState({
                    allCategory: response.data
                })
            })
            .catch((err) => alert(err))

        axios.get("http://127.0.0.1:5000/get-book-categories/" + this.props.match.params.book_id)
            .then((response) => {
                this.setState({
                    addedCategory: response.data
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
        var categoryDetails = {
            category_id: this.state.category_id
        }
        axios.post("http://127.0.0.1:5000/add-category-to-book/" + this.props.match.params.book_id, categoryDetails)
            .then(response => {
                alert('Added Sucessfully')
                window.location.reload(false);
            })
            .catch(error => { console.log(error) })

    }
    deleteCategory = (map_id) => {
        axios.delete("http://127.0.0.1:5000/delete-category-book/" + map_id)
            .then((response) => {
                alert(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }
    render() {
        let category = this.state.allCategory.map(e => {
            return (
                <option value={e.category_id}>{e.category_name}</option>
            )
        })
        let addedCategory = this.state.addedCategory.reverse().map((e, index) => {
            return (
                <div>
                    <div className="ml-5">{index + 1} . {e.category_name}</div>
                    <button className="btn btn-danger" onClick={() => this.deleteCategory(e.map_id)} style={{ marginLeft: "200px", marginTop: "-50px" }}>Delete</button>
                </div>
            )
        })
        return (
            <div>
                <h3 className="offset-4 mt-5">Book Name: <b>{this.state.bookDetails.book_name}</b></h3>
                <h3 className="offset-4 mt-3">Publisher Name: <b>{this.state.bookDetails.publisher_name}</b></h3>
                <h2 className="offset-5 mt-5">Add Category</h2>
                <form onSubmit={this.onSubmit}>
                    <select className="offset-4 form-control w-25 mt-3" name="category_id" onChange={this.onChange}>
                        <option selected>Select Category</option>
                        {category}
                    </select>
                    <button className="btn btn-danger w-25 offset-4 mt-3" >Add</button>
                </form>
                <div className="offset-5 mt-5">
                    <h2>Added Categories</h2>
                    {addedCategory}
                </div>
            </div>
        )
    }
}