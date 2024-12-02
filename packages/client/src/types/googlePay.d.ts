export declare namespace google {
  namespace payments {
    namespace api {
      interface PaymentsClient {
        new (config: PaymentClientConfig): PaymentsClient;
        isReadyToPay(
          request: IsReadyToPayRequest
        ): Promise<IsReadyToPayResponse>;
        loadPaymentData(request: PaymentDataRequest): Promise<PaymentData>;
        createButton(options: ButtonOptions): HTMLElement;
        prefetchPaymentData(request: PaymentDataRequest): void;
      }

      interface PaymentClientConfig {
        environment: string;
        merchantInfo?: MerchantInfo;
        paymentDataCallbacks?: PaymentDataCallbacks;
      }

      interface IsReadyToPayRequest {
        apiVersion: number;
        apiVersionMinor: number;
        allowedPaymentMethods: Array<any>;
      }

      interface IsReadyToPayResponse {
        result: boolean;
      }

      interface PaymentDataRequest {
        apiVersion: number;
        apiVersionMinor: number;
        allowedPaymentMethods: Array<any>; // Remplacez `any` par le type exact si vous avez plus d'infos
        transactionInfo: TransactionInfo;
        merchantInfo: MerchantInfo;
        callbackIntents?: Array<string>;
        shippingAddressRequired?: boolean;
        shippingAddressParameters?: ShippingAddressParameters; // Ajout de cette propriété
        shippingOptionRequired?: boolean;
        shippingOptionParameters?: ShippingOptionParameters; // Ajout de cette propriété si nécessaire
      }

      interface PaymentData {
        paymentMethodData: PaymentMethodData;
      }

      interface PaymentMethodData {
        type: string;
        description?: string;
        tokenizationData: TokenizationData;
      }

      interface ShippingAddressParameters {
        allowedCountryCodes: string[];
        phoneNumberRequired: boolean;
      }

      interface ShippingOptionParameters {
        defaultSelectedOptionId: string;
        shippingOptions: Array<{
          id: string;
          label: string;
          description: string;
        }>;
      }

      interface TokenizationData {
        type: string;
        token: string;
      }

      interface TransactionInfo {
        totalPriceStatus: "FINAL" | "ESTIMATED" | "NOT_CURRENTLY_KNOWN";
        totalPrice: string;
        currencyCode: string;
        countryCode: string;
      }

      interface MerchantInfo {
        merchantName: string;
        merchantId?: string;
      }

      interface ButtonOptions {
        onClick: () => void;
        allowedPaymentMethods: Array<any>;
      }

      interface PaymentDataCallbacks {
        onPaymentAuthorized?: (paymentData: PaymentData) => Promise<any>;
        onPaymentDataChanged?: (intermediatePaymentData: any) => Promise<any>;
      }
    }
  }
}
