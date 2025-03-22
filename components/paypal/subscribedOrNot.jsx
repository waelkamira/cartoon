'use client';

import { useContext, useState, useEffect, useCallback } from 'react';
import CurrentUser from '../CurrentUser';
import { inputsContext } from '../Context';

export default function SubscribedOrNot() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const user = CurrentUser();
  const { dispatch } = useContext(inputsContext);

  // Check subscription status
  const checkSubscriptionStatus = useCallback((startDate, daysLimit) => {
    if (!startDate) return false;

    const currentDate = new Date();
    const subscriptionDate = new Date(startDate);
    const daysSinceSubscription =
      (currentDate.getTime() - subscriptionDate.getTime()) /
      (1000 * 60 * 60 * 24);

    return daysSinceSubscription <= daysLimit;
  }, []);

  // Update user subscription in database
  const updateUserSubscription = useCallback(async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...user,
          monthly_subscribed: false,
          yearly_subscribed: false,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update subscription status');
      }
      console.log('Subscription status updated successfully');
    } catch (error) {
      console.error('Error updating subscription status:', error);
    }
  }, []);

  useEffect(() => {
    // Function to determine subscription status
    const determineSubscriptionStatus = () => {
      if (!user) return;

      const currentDate = new Date();
      const createdAtDate = new Date(user.createdAt);

      const daysSinceAccountCreated =
        (currentDate.getTime() - createdAtDate.getTime()) /
        (1000 * 60 * 60 * 24);

      if (
        !user.monthly_subscribed &&
        !user.yearly_subscribed &&
        daysSinceAccountCreated <= 1
      ) {
        console.log('user', 'مشترك تجريبي');
        setIsSubscribed(true);
      } else if (user.monthly_subscribed) {
        if (checkSubscriptionStatus(user.monthly_subscribed_date, 30)) {
          console.log('user', 'مشترك شهري');
          setIsSubscribed(true);
        } else {
          console.log('user', 'انتهى الاشتراك الشهري');
          setIsSubscribed(false);
          updateUserSubscription();
        }
      } else if (user.yearly_subscribed) {
        if (checkSubscriptionStatus(user.yearly_subscribed_date, 365)) {
          console.log('user', 'مشترك سنوي');
          setIsSubscribed(true);
        } else {
          console.log('user', 'انتهى الاشتراك السنوي');
          setIsSubscribed(false);
          updateUserSubscription();
        }
      } else {
        console.log('user', 'غير مشترك');
        setIsSubscribed(false);
      }
    };

    determineSubscriptionStatus();
  }, [checkSubscriptionStatus, updateUserSubscription]);

  return isSubscribed;
}
