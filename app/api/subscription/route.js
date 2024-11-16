import paypal from '@paypal/checkout-server-sdk';

const environment =
  process.env.PAYPAL_ENV === 'live'
    ? new paypal.core.LiveEnvironment(
        process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      )
    : new paypal.core.SandboxEnvironment(
        process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      );

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req) {
  try {
    const { amount } = await req.json();
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
          },
        },
      ],
    });

    const order = await client.execute(request);
    return new Response(JSON.stringify(order.result), { status: 200 });
  } catch (error) {
    console.error('PayPal Order Creation Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
