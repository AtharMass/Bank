import { BrowserRouter as Router, Route} from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content'
import {Transactions} from './components/Transactions'
import Operations from './components/Operations'
import {Breakdown} from './components/Breakdown'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Swal from 'sweetalert2'
import axios from 'axios';

import logo from './images/logo.png';
import './App.css';
import { Component } from 'react';

const MySwal = withReactContent(Swal)

export class App extends Component{

  constructor(){
    super()
    this.state = {
      transactions: [],
      balance: 0
    }
  }

  async getTransactions() {
    return axios.get("http://localhost:8080/transactions")
  }

  async componentDidMount() {
    const response = await this.getTransactions()
    this.setState({ transactions: response.data })

    this.updateBalance()
  }


  updateBalance = () =>{
    let transactions = this.state.transactions
    let balance = 0
    transactions.forEach(transaction => {
      balance  += transaction.amount
    }) 
    this.setState({ balance})
  }

  deleteTransaction = async id =>{
    return axios.delete(`http://localhost:8080/transaction?id=${id}`)
  }

  handleButton = async id => {
    let transactions = this.state.transactions

    for (const index in transactions) {
      if (id === transactions[index]._id) {
        transactions.splice(index,1)
        this.setState({transactions})
        break; 
      }
    }

    const response = await this.deleteTransaction(id)

    MySwal.fire({
      icon: `${response.data.code === 200 ? "success": "error" }`,
      title: response.data.message,
      showConfirmButton: false,
      timer: 2000
    })

    this.updateBalance()
  }

  addTransaction = async transaction =>{
    return axios.post(`http://localhost:8080/transaction`,transaction)
  }
  
  addNewTransaction = async transaction => {

    const response = await this.addTransaction(transaction)
    
    let transactions = [...this.state.transactions]
    transactions.push(response.data.transaction)
    this.setState({transactions: transactions})
    this.updateBalance()

    MySwal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 2000
    })
  } 

  render(){
    let state = this.state
    return (
      <Router>
        <div className="App">
          <Navbar className="navbar-style" variant="dark">
            <Navbar.Brand href="/"> <img src={logo} width="160" className="d-inline-block align-top right" alt="React Bootstrap logo"/></Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/operations">Operations</Nav.Link> 
              <Nav.Link href="/">Transactions</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
            </Nav>
          </Navbar>
          
          <Route exact path="/" component={() => <Transactions transactions={state.transactions} balance={state.balance} removeTransaction={this.handleButton}/>} />
          <Route exact path="/operations" render={() => <Operations transactions={state.transactions} addNewTransaction={this.addNewTransaction}/>} />
          <Route exact path="/categories" render={() => <Breakdown />}  />
    
          <footer>
              <p id="footer">&copy; All rights reserved, {new Date().getFullYear()} - Design & devlopement by - Atar Saadi with &hearts; </p>
          </footer>
        </div>
         
      </Router>
    )
  }
  
}