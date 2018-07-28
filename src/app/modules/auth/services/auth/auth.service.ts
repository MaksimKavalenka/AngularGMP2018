import { User } from '../../entities/user';

export interface IAuthService {
  login(email: string, password: string): User;
  logout(): void;
  isAuthenticated(): boolean;
  getUser(): User;
}
