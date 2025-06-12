export interface UserTg {
  id: number;
  first_name: string;
  last_name?: string;
  photo_url?: string;
  username?: string;
  hash: string;
  auth_date: number;
}

interface NotificationSettings {
  status: boolean;
  can_change: boolean;
}

interface SubData {
  tg_notif: NotificationSettings;
  ws_notif: NotificationSettings;
  push_notif: NotificationSettings;
  lang: string;
}

export interface User {
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  date_of_diagnostic: string | null;
  gender: string | null;
  weight: number | null;
  diabetic_type: string | null;
  isf: number | null;
  cir: number | null;
  glucose_unit: string;
  email: string;
  phone: string | null;
  tg_username: string | null;
  identity: string;
  sub_data: SubData;

  user_photo?: string | null;
}
