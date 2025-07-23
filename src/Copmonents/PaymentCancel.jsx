function PaymentCancel() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-red-600">Payment Canceled</h2>
      <p>You canceled the payment. You can try again from the booking page.</p>

      <a href="/" className="text-blue-500 hover:underline"> Back to Home</a>
    </div>
  );
}

export default PaymentCancel;
