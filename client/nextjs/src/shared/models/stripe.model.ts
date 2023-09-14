export interface IStripeSessionResponse {
  id: string;
  object: string;
  after_expiration: null | any;
  allow_promotion_codes: null | any;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: {
    enabled: boolean;
    status: null | any;
  };
  billing_address_collection: null | any;
  cancel_url: string;
  client_reference_id: null | any;
  consent: null | any;
  consent_collection: null | any;
  created: number;
  currency: string;
  currency_conversion: null | any;
  custom_fields: any[];
  custom_text: {
    shipping_address: null | string;
    submit: null | string;
  };
  customer: null | any;
  customer_creation: string;
  customer_details: {
    address: {
      city: null | string;
      country: string;
      line1: null | string;
      line2: null | string;
      postal_code: null | string;
      state: null | string;
    };
    email: string;
    name: string;
    phone: null | string;
    tax_exempt: string;
    tax_ids: string[];
  };
  customer_email: null | string;
  expires_at: number;
  invoice: null | any;
  invoice_creation: {
    enabled: boolean;
    invoice_data: {
      account_tax_ids: null | any;
      custom_fields: null | any;
      description: null | any;
      footer: null | any;
      metadata: Record<string, any>;
      rendering_options: null | any;
    };
  };
  line_items: {
    object: string;
    data: {
      id: string;
      object: string;
      amount_discount: number;
      amount_subtotal: number;
      amount_tax: number;
      amount_total: number;
      currency: string;
      description: string;
      price: {
        id: string;
        object: string;
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: string;
        custom_unit_amount: null | any;
        livemode: boolean;
        lookup_key: null | any;
        metadata: Record<string, any>;
        nickname: null | any;
        product: {
          id: string;
          object: string;
          active: boolean;
          attributes: any[];
          created: number;
          default_price: null | any;
          description: string;
          images: any[];
          livemode: boolean;
          metadata: Record<string, any>;
          name: string;
          package_dimensions: null | any;
          shippable: null | any;
          statement_descriptor: null | any;
          tax_code: null | any;
          type: string;
          unit_label: null | any;
          updated: number;
          url: null | any;
        };
        recurring: null | any;
        tax_behavior: string;
        tiers_mode: null | any;
        transform_quantity: null | any;
        type: string;
        unit_amount: number;
        unit_amount_decimal: string;
      };
      quantity: number;
    }[];
  };
  livemode: boolean;
  locale: null | any;
  metadata: Record<string, any>;
  mode: string;
  payment_intent: {
    id: string;
    object: string;
    amount: number;
    amount_capturable: number;
    amount_details: {
      tip: Record<string, any>;
    };
    amount_received: number;
    application: null | any;
    application_fee_amount: null | any;
    automatic_payment_methods: null | any;
    canceled_at: null | any;
    cancellation_reason: null | any;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    created: number;
    currency: string;
    customer: null | any;
    description: null | any;
    invoice: null | any;
    last_payment_error: null | any;
    latest_charge: string;
    livemode: boolean;
    metadata: Record<string, any>;
    next_action: null | any;
    on_behalf_of: null | any;
    payment_method: string;
    payment_method_options: {
      card: {
        installments: null | any;
        mandate_options: null | any;
        network: null | any;
        request_three_d_secure: string;
      };
    };
    payment_method_types: string[];
    processing: null | any;
    receipt_email: null | any;
    review: null | any;
    setup_future_usage: null | any;
    shipping: null | any;
    source: null | any;
    statement_descriptor: null | any;
    statement_descriptor_suffix: null | any;
    status: string;
    transfer_data: null | any;
    transfer_group: null | any;
  };
  payment_link: null | any;
  payment_method_collection: string;
  payment_method_options: Record<string, any>;
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: {
    enabled: boolean;
  };
  recovered_from: null | any;
  setup_intent: null | any;
  shipping_address_collection: null | any;
  shipping_cost: null | any;
  shipping_details: null | any;
  shipping_options: any[];
  status: string;
  submit_type: null | any;
  subscription: null | any;
  success_url: string;
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
  url: string | null;
}

export interface IStripeCreateSession {
  id: string;
  object: string;
  after_expiration: null | any;
  allow_promotion_codes: null | any;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: {
    enabled: boolean;
    status: null | any;
  };
  billing_address_collection: null | any;
  cancel_url: string;
  client_reference_id: null | any;
  consent: null | any;
  consent_collection: null | any;
  created: number;
  currency: string;
  currency_conversion: null | any;
  custom_fields: any[];
  custom_text: {
    shipping_address: null | any;
    submit: null | any;
  };
  customer: null | any;
  customer_creation: 'if_required' | any;
  customer_details: null | any;
  customer_email: null | any;
  expires_at: number;
  invoice: null | any;
  invoice_creation: {
    enabled: boolean;
    invoice_data: {
      account_tax_ids: null | any;
      custom_fields: null | any;
      description: null | any;
      footer: null | any;
      metadata: Record<string, any>;
      rendering_options: null | any;
    };
  };
  livemode: boolean;
  locale: null | any;
  metadata: Record<string, any>;
  mode: 'payment';
  payment_intent: null | any;
  payment_link: null | any;
  payment_method_collection: 'always';
  payment_method_options: Record<string, any>;
  payment_method_types: string[];
  payment_status: 'unpaid';
  phone_number_collection: {
    enabled: boolean;
  };
  recovered_from: null | any;
  setup_intent: null | any;
  shipping_address_collection: null | any;
  shipping_cost: null | any;
  shipping_details: null | any;
  shipping_options: any[];
  status: 'open';
  submit_type: null | any;
  subscription: null | any;
  success_url: string;
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
  url: string;
}
