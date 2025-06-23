// components/BuyButton.tsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/axios'; // ✅ استخدم الـ API المجهز مسبقاً

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

export const BuyButton: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBuy = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await api.post('/create-checkout-session');
      const stripe = await stripePromise;
      await stripe!.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error(err);
      alert('Failed to initiate checkout.');
    }
  };

  return (
    <button className="btn btn-lg btn-primary buy-btn-mobile" onClick={handleBuy}>
      Buy Model ($10)
    </button>
  );
};
