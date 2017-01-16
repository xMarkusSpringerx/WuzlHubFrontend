import { WuHuWebAppPage } from './app.po';

describe('wu-hu-web-app App', function() {
  let page: WuHuWebAppPage;

  beforeEach(() => {
    page = new WuHuWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
