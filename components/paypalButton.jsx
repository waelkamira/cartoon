'use client'; // Required for Next.js 14 client components

import { useEffect } from 'react';

export default function PayPalButton({ amount, onSuccess }) {
  useEffect(() => {
    const loadPayPalScript = async () => {
      if (!window.paypal) {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount, // Dynamic amount
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                const details = await actions.order.capture();
                onSuccess(details); // Handle success callback
              },
              onError: (err) => {
                console.error('PayPal Button Error:', err);
              },
            })
            .render('#paypal-button-container');
        };
      }
    };
    loadPayPalScript();
  }, [amount]);

  return <div id="paypal-button-container"></div>;
}
