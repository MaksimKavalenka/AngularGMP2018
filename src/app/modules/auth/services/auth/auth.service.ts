import { User } from '../../entities/user';

export interface IAuthService {
  login(user: User): string;
  logout(id: string): void;
  isAuthenticated(id: string): boolean;
  getUser(id: string): User;
}
