import { CustomCommonModule } from './common.module';

describe('CommonModule', () => {
  let commonModule: CustomCommonModule;

  beforeEach(() => {
    commonModule = new CustomCommonModule();
  });

  it('should create an instance', () => {
    expect(commonModule).toBeTruthy();
  });
});
