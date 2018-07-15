import { User } from '../../entities/user';

export interface IAuthService {
  login(email: string, password: string): User;
  logout(): void;
  isAuthenticated(): boolean;
  getUser(): User;
}

export abstract class GuidAuthService implements IAuthService {

  public abstract login(email: string, password: string): User;
  public abstract logout(): void;
  public abstract isAuthenticated(): boolean;
  public abstract getUser(): User;

  protected guid(): string {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

}
