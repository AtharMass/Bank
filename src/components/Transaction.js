import React, { Component } from 'react';
import { HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi';
import {GoTrashcan} from 'react-icons/go'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../styles/transaction.css';

export class Transaction extends Component {

    remove = () => {
        return this.props.removeTransaction(this.props.transaction._id)
    }
    
    render() {
        let transaction = this.props.transaction
        return (
            <div className="transaction">
                <Card border="warning" >
                    <Card.Header className="transaction-title">{transaction.category}</Card.Header>
                    <Card.Body className="body-card">
                        <Card.Text >{transaction.vendor}</Card.Text>
                        <Card.Title className="salary-style">{transaction.amount < 0 ? <HiArrowNarrowDown className="withdraw" /> : <HiArrowNarrowUp className="deposit" />} <span>{transaction.amount}</span></Card.Title>
                    </Card.Body>
                        <Button className="remove" variant="outline-danger" onClick={this.remove}><GoTrashcan/></Button>
                </Card>
            </div>
        );
    }
}