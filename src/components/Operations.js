import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { withRouter } from "react-router";

import '../styles/operations.css'

class Operations extends Component {

    constructor(){
        super()
        this.state ={
            amount: parseInt(0),
            vendor: "",
            category: ""
        }
    }

    handleEvent =  event => {
        let target = event.target
        let value = target.value
        let key = target.name

        key === "amount" ? value = parseInt(value) :  String(value)
        this.setState({ [key]: value})

    }

    
    addNewTransaction =  event => {
        let target = event.target
        let type = target.name
        let transaction = {amount: parseInt(0), vendor: "", category: ""}

        transaction = this.state
        type === "deposit" ? transaction.amount  *= 1 : transaction.amount *= -1

        this.props.addNewTransaction(transaction)
        this.props.history.push("/")
    }

    render() {
       
        return (
            <div className="container-fluid">
                <Card className="card-style">
                    <Card.Header as="h5">Operations</Card.Header>
                    
                    <Form className="form-style" >
                        <Form.Group >
                            <Form.Label>Vendor</Form.Label>
                            <Form.Control name="vendor" type="text" onChange={this.handleEvent} placeholder="Enter Vendor" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Category</Form.Label>
                            <Form.Control  name="category" type="text" onChange={this.handleEvent} placeholder="Enter Category" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control name="amount" type="number" min={0} onChange={this.handleEvent} placeholder="Enter amount" />
                        </Form.Group>

                       <Button className="button-style" variant="success" name="deposit" onClick={this.addNewTransaction}>Deposit</Button>
                       <Button className="button-style" variant="danger" name="withdraw" onClick={this.addNewTransaction}>Withdraw</Button>
                    </Form> 
                </Card>
            </div>
        );
    }
}

export default withRouter(Operations)