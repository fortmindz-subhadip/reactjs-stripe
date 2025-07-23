import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Call your backend to confirm payment and update DB
      axios.post('/api/stripe/verify-payment', { sessionId })
        .then(res => {
          console.log('Payment Verified:', res.data);
        })
        .catch(err => {
          console.error('Payment Verification Failed:', err);
        });
    }
  }, [sessionId]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
      <p>Thank you for booking. We’ll contact you soon.</p>
    </div>
  );
}

export default PaymentSuccess;
