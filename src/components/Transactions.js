import React, { Component } from 'react';
import {Transaction} from './Transaction'
import Card from 'react-bootstrap/Card'
import '../styles/transactions.css';

export class Transactions extends Component {

    render() {
       let props = this.props
        return (
            <div className="container-fluid">
                <Card className="card-style pb-4">
                    <Card.Header as="h5">Transactions - Balance: <span  className={props.balance >=500 ? "green" : "red"}> {props.balance} </span> </Card.Header>
                    <Card.Body className="body-card">
                    { (props.transactions.length !== 0)
                        ?
                        <div className="transactions">
                            { props.transactions.map(transaction => <Transaction key={`transaction-${transaction._id}`} removeTransaction={props.removeTransaction} transaction={transaction}/> )}
                        </div>
                        : <p>There are no transactions to display</p> 
                    }
                    </Card.Body>
                </Card>
            </div>
        );
    }
}