export type IArrayOfStrings = Array<string>;

export interface PaymentMeta {
  by_order_of: any;
  payee: any;
  payer: any;
  payment_method: any;
  payment_processor: any;
  ppd_id: any;
  reason: any;
  reference_number: any;
}

export interface TransactionInterface {
  account_id: string;
  account_owner: any;
  amount: number;
  authorized_date: any;
  authorized_datetime: any;
  category: IArrayOfStrings;
  category_id: string;
  check_number: any;
  date: string;
  datetime: string;
  iso_currency_code: string;
  location: Location;
  merchant_name: string;
  name: string;
  payment_channel: string;
  payment_meta: PaymentMeta;
  pending: boolean;
  pending_transaction_id: any;
  personal_finance_category: any;
  transaction_code: string;
  transaction_id: string;
  transaction_type: string;
  unofficial_currency_code: any;
}

export interface FormattedDateData {
  account_id: string;
  amount: number;
  category: IArrayOfStrings;
  merchant_name: any;
  name: string;
  pending: boolean;
  transaction_code: string;
  transaction_type: string;
  payment_channel: string;
  iso_currency_code: string;
}


export interface FormattedDate {
  date: string;
  // data: Array<FormattedDateData>;
  data: Array<TransactionInterface>;
}
