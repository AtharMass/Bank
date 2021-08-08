import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import '../styles/breakdown.css'
import axios from 'axios'

export class Breakdown extends Component {
    constructor(){
        super()
        this.state = {
           categories: [] 
        }
    }
    
    async getCategories() {
        return axios.get("http://localhost:8080/transactions/categories")
    }

    async componentDidMount() {
        const response = await this.getCategories()
        this.setState({ categories: response.data })
    }
    
    render() {
        let categories = this.state.categories
        return (
            <div className="body-fill">
                <Card className="card-style">
                    <Card.Header as="h5">Categories </Card.Header>
                    <Card.Body>
                        { (categories.length !== 0)
                        ?
                            <div className="categories">
                                { categories.map(category => {
                                return (<div key={category._id} className="category">
                                    <Card border="warning" >
                                        <Card.Header className="transaction-title">{category._id}</Card.Header>
                                        <Card.Body>
                                            <Card.Title className={`${category.total >= 500 ? "green" :"red" } `}>{category.total } </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>)

                                } )}
                            </div>
                        : <p>There are no categories to display</p> 
                        }
                    </Card.Body>
                </Card>
            </div>
        )
    }
}