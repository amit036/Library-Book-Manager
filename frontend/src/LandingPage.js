import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
            <Link to="/home-student"><button className="btn btn-primary mt-5 offset-5">Student</button></Link>
            <Link to="/home-library"><button className="btn btn-secondary mt-5 offset-1">Librarian</button></Link>
            </div>
        )
    }
}
