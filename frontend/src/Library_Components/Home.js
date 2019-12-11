import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Link to="/addBook"><button className="btn btn-primary offset-2 mt-5">Add New Book</button></Link>
                <Link to="/showAllBooks"><button className="btn btn-success offset-1 mt-5">Show All Books</button></Link>
                <Link to="/addAuthor"><button className="btn btn-secondary offset-1 mt-5">Add New Authors</button></Link>
                <Link to="/addPublisher"><button className="btn btn-dark offset-1 mt-5">Add New Publishers</button></Link>
                <Link to="/addCategory"><button className="btn btn-danger offset-1 mt-5">Add New Categories</button></Link>
            </div>
        )
    }
}
