import React from 'react';
import { WebView } from 'react-native-webview';


const html = `
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <script src="https://cdn.kushkipagos.com/kushki-checkout.js"></script>
        <form id="kushki-pay-form" action="confirm" method="post">
            <input type="hidden" name="cart_id" value="123">
        </form>
        <script type="text/javascript">
    var kushki = new KushkiCheckout({
        form: "kushki-pay-form",
        merchant_id: "public-merchant-id",
        amount: "1.14",
        currency: "USD",
      payment_methods:["credit-card"], // Payment Methods enabled
      is_subscription: true,
      inTestEnvironment: true, 
      regional:false // Optional
    });
</script>
    </body>
    </html>
`;

export default class PaymentScreen extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <WebView
                source={{html, baseUrl: 'web/'}}
                style={{flex: 1, height: 500, marginTop: 50}}
                mixedContentMode='always'
            />
        );
    }
}

