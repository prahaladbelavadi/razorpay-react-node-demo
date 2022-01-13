require( 'dotenv' ).config();
const express = require( 'express' );
const Razorpay = require( 'razorpay' );

const app = express();

app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );

// var instance = new Razorpay( { key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_KEY_SECRET', } );
// instance.payments.fetch( paymentId );

var instance = new Razorpay( { key_id: `${process.env.key_id}`, key_secret: `${process.env.key_secret}` } );

app.get( '/order', async ( req, res ) => {
    // const { amount, currency } = req.body;

    var options = {
        amount: 20000000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    };
    instance.orders.create( options, function ( err, order ) {
        res.json( order );
    } );
} );

app.listen( 3500, () => {
    console.log( 'Server up' );
} );