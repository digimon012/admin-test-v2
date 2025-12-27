
import { User, Payment, Reservation } from './types';

const currentTimestamp = new Date().toISOString();

export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  uid: `U${1000 + i}`,
  create_time: currentTimestamp,
  language: i % 2 === 0 ? 'en' : 'tc',
  user_type: i < 20 ? 'normal' : i < 35 ? 'normal_frd' : i < 45 ? 'walkin' : 'walkin_other',
  category: 'NBE',
  user_status: i % 5 === 0 ? 'registered' : 'otp_verified',
  bf: i % 3 === 0 ? 'true' : 'false',
  cafe: i % 4 === 0 ? 'true' : 'false',
  with_guest: i % 4 === 0 ? '1' : 'false',
  inviter_uid: i % 4 === 0 ? `U${1000 + i - 1}` : undefined,
  title: i % 3 === 0 ? 'Mr' : 'Miss',
  first_name: ['John', 'Jane', 'Alice', 'Bob', 'Charlie'][i % 5],
  last_name: ['Doe', 'Smith', 'Wong', 'Lee', 'Chen'][i % 5],
  country_code: '852',
  phone: `9000${1000 + i}`,
  email: `user${i}@example.com`,
  tc: 'true',
  comm: 'true',
  consent: 'true',
  reg_time: currentTimestamp,
  update_time: currentTimestamp,
  utm: 'google_ads',
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'summer_sale'
}));

export const mockReservations: Reservation[] = mockUsers.map((user, i) => ({
  id: i + 1,
  uid: user.uid,
  res_status: 'valid',
  user_type: user.user_type,
  event_type: 'basic',
  reserve_date: '2024-05-20',
  time_slot: i % 2 === 0 ? '10:00 - 11:00' : '14:00 - 15:00',
  check_in: 'false',
  update_time: currentTimestamp,
  create_time: currentTimestamp
}));

export const mockPayments: Payment[] = Array.from({ length: 15 }, (_, i) => {
  const user = mockUsers[i % 15];
  return {
    id: i + 1,
    rid: `PAY-${10000 + i}`,
    is_vip: 'false',
    uid: user.uid,
    target: 'bf',
    first_name: user.first_name,
    last_name: user.last_name,
    country_code: user.country_code,
    phone: user.phone,
    email: user.email,
    city: 'Hong Kong',
    country: 'HK',
    valid_user: 'true',
    status: 'completed',
    payment_status: 'authorised',
    locale: 'en',
    amount: 300,
    signed_date_time: currentTimestamp,
    submit_time: currentTimestamp,
    transaction_id: `TXN-${50000 + i}`,
    reg_time: currentTimestamp,
    update_time: currentTimestamp
  };
});
