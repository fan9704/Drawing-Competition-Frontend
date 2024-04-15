interface User {
  id: number;
  password: string;
  last_login: timestamp;
  is_superuser: boolean;
  usernane: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: timestamp;
  groups: number[];
  user_permissions: number[];
}

interface OAuthRegisterDTO {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
interface OAuthLoginDTO {
  username: string
  email: string
}

export { User, OAuthRegisterDTO, OAuthLoginDTO }
