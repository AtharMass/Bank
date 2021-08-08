const express = require('express')

const router = express.Router()
const Transaction = require('../models/Transactions')

router.get('/transactions', function (req, res) {
    Transaction
        .find({},{__v : 0})
        .exec(function (err, transactions) {
            res.send(transactions)
        })
})

router.post('/transaction', function (request, response) {
    let data = request.body
    let result = {}

    let newTrans = new Transaction({
        amount: Number(data.amount),
        vendor: data.vendor,
        category: data.category
    })

    if (data.vendor !== '' && data.amount !== '' && data.category !== '') {
        const savePromise = newTrans.save()
        savePromise.then(saved => {
          
        }).catch(err => {
            console.log(err)
        })
        result.code = 201
        result.transaction = newTrans
        result.message = "The data inserted successfuly"
        
    } else {
        result.code = 422
        result.message = "All fields are required"
    }
    
    response.send( result)
})

router.delete('/transaction', function (request, response) {
    let {id} = request.query
    let result = {}
    console.log(id)
    Transaction.deleteOne({ _id: id })
        .exec((err, success) => {
            if (success === null) {
                result.code = 404
                result.message = "Sorry, we could not found the transaction"
            } else {
                if ( success.deletedCount === 1){
                    result.code = 200
                    result.message = "The transaction was successfully deleted"
                }else{
                    result.code = 304
                    result.message = "The transaction has already been deleted"
                }
            }
            console.log(result);
            
            response.send(result)
        })
})

router.get('/transactions/categories', function (req, res) {
    const aggregate = [
        {
            "$group":{
                "_id" : "$category",
                "total": { 
                    "$sum": "$amount" 
                } 
            }
        }
    ]

    Transaction.aggregate(aggregate)
                .exec(function (err, result){
                    if(err){
                        console.log(err)
                        return;
                    }
                    res.send(result)
            });
})

module.exports = router