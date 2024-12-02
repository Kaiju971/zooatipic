import {
  PayPalButtons,
  usePayPalScriptReducer,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";

// Styles des boutons PayPal
const style: PayPalButtonsComponentProps["style"] = {
  color: "blue",
  shape: "pill",
  borderRadius: 10,
  disableMaxWidth: true,
  label: "paypal",
  layout: "vertical",
};

// Fonction pour capturer une commande
async function onApprove(data: any) {
  const response = await fetch(
    "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderID: data.orderID }),
    }
  );
  const orderData = await response.json();
  console.log("Order captured:", orderData);
}

// Composant personnalisé pour le bouton PayPal
const ButtonWrapper: React.FC = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        onApprove={onApprove}
      />
    </>
  );
};

export default ButtonWrapper;
