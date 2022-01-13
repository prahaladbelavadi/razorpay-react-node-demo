import React, { useEffect, useState, useCallback } from 'react';

import logo from './logo.svg';
import './App.css';
import useRazorpay from "react-razorpay";

function App() {
  const [order, setOrder] = useState();

  const getOrderId = () => fetch( process.env.REACT_APP_BASEURL_TO_FETCH_RAZORPAY_ORDER_ID_FROM );

  // const amount = Math.round(Math.random()*10000 *100);

  useEffect( () => {
    getOrderId().then( ( response ) => response.json() ).then( res => {
      console.log( '====================================' );
      console.log( res );
      console.log( '====================================' );
      setOrder( res.id );

    } );

  }, [] );

  const Razorpay = useRazorpay();

  const handlePayment = useCallback( () => {

    const options = {
      key: process.env.REACT_APP_RAZORPAY_PUBLIC_KEY_ID,
      amount: 20000000,
      currency: process.env.REACT_APP_CURRENCY_OF_PAYMENT_ACCEPTANCE,
      name: process.env.REACT_APP_USER_DATA_NAME,
      description: process.env.REACT_APP_RAZORPAY_DESCRIPTION,
      image: process.env.REACT_APP_IMAGE_OF_BRAND,
      order_id: order,
      handler: ( res ) => {
        alert( JSON.stringify( res ) );
      },
      prefill: {
        name: process.env.REACT_APP_USER_DATA_NAME,
        email: process.env.REACT_APP_USER_DATA_EMAIL,
        contact: process.env.REACT_APP_USER_DATA_CONTACT,
      },
      // notes: JSON.parse( process.env.REACT_APP_USER_INFO_NOTES ),
      theme: {
        color: process.env.REACT_APP_BRAND_THEME_COLOR,
      },
    };

    const rzpay = new Razorpay( options );
    rzpay.open();
  }, [Razorpay] );

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://github.com/prahaladbelavadi/razorpay-react-node-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            Accept Payments via <code>Razorpay</code>
          </p>
          <p>
            Built with <code> Node, Express and React</code>
          </p>
          github.com/prahaladbelavadi/razorpay-react-node-demo
        </a>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App">
          {order ? ( <div>Ready to Accept Payments
            <br /> {"Order ID : " + order} <br />
            <button onClick={handlePayment}>Pay</button>
          </div>
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
