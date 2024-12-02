import React, { useEffect, useState } from "react";
import GooglePayButton from "@google-pay/button-react";

import { buildPaymentRequest, getUpdatedPaymentData } from "./GooglePay";

const GooglePay: React.FC = () => {
  const [paymentRequest, setPaymentRequest] = useState(buildPaymentRequest([]));

  // If the cart changes, update the payment request object
  useEffect(() => {
    setPaymentRequest(paymentRequest);
  }, [paymentRequest]);

  /**Handles Google Pay checkout
   *
   * @param {google.payments.api.PaymentData} paymentData Google Pay payment data
   */
  function handleLoadPaymentData(paymentData: google.payments.api.PaymentData) {
    // Simply log to the console for this sample app
    // Normally this would be sent to a backend server for processing
    console.log("Payment data", paymentData);
  }

  return (
    <>
      <GooglePayButton
        environment="TEST"
        buttonColor="default"
        buttonType="plain"
        buttonRadius={20}
        buttonLocale="fr"
        buttonSizeMode="fill"
        style={{ width: 100, height: 45 }}
        paymentRequest={paymentRequest}
        onLoadPaymentData={handleLoadPaymentData}
        onError={(error) => console.error(error)}
        onPaymentDataChanged={(paymentData) =>
          getUpdatedPaymentData(paymentRequest, paymentData)
        }
      />
    </>
  );
};

export default GooglePay;
