
export interface User {
  id: number;
  uid: string;
  create_time: string;
  language: 'en' | 'tc';
  user_type: string;
  category: string;
  user_status: string;
  bf: 'true' | 'false';
  cafe: 'true' | 'false';
  with_guest: string;
  inviter_uid?: string;
  title: string;
  first_name: string;
  last_name: string;
  country_code: string;
  phone: string;
  email: string;
  tc: 'true' | 'false';
  comm: 'true' | 'false';
  consent: 'true' | 'false';
  first_learn?: string;
  reg_time: string;
  update_time: string;
  utm?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface Payment {
  id: number;
  rid: string;
  is_vip: 'true' | 'false';
  uid: string;
  target: string;
  first_name: string;
  last_name: string;
  country_code: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  valid_user: 'true' | 'false';
  status: string;
  payment_status: string;
  locale: string;
  amount: number;
  signed_date_time: string;
  submit_time?: string;
  transaction_id?: string;
  reason_code?: string;
  decision?: string;
  message?: string;
  reg_time: string;
  update_time: string;
}

export interface Reservation {
  id: number;
  res_status: string;
  user_type: string;
  event_type: string;
  uid: string;
  reserve_date: string;
  time_slot: string;
  check_in: 'true' | 'false';
  check_in_time?: string;
  update_time: string;
  create_time: string;
}

export interface NormalUserWithReservation extends User {
  reservation?: Reservation;
}

export interface PaymentUserWithDetails extends Payment {
  user_details?: User;
}
