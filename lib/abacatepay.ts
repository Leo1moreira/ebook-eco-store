export async function createPixPayment(email: string, nsu: string, amount: number) {
  const res = await fetch('https://api.abacatepay.com/v1/billing/create', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.ABACATEPAY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      frequency: 'ONE_TIME',
      methods: ['PIX'],
      products: [{ externalId: nsu, name: 'Ebook Empreendedorismo Ecologico', quantity: 1, price: amount }],
      returnUrl: `${process.env.APP_URL}/obrigado?nsu=${nsu}`,
      completionUrl: `${process.env.APP_URL}/api/webhook/abacatepay`,
      customer: { email }
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}
