import { Role } from 'src/common/enums/role.enum';

export interface User {
  id?: string;
  email: string;
  password: string;
  refreshToken?: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
