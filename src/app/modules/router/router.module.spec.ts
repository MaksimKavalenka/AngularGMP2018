import { CustomRouterModule } from './router.module';

describe('RouterModule', () => {
  let routerModule: CustomRouterModule;

  beforeEach(() => {
    routerModule = new CustomRouterModule();
  });

  it('should create an instance', () => {
    expect(routerModule).toBeTruthy();
  });
});
