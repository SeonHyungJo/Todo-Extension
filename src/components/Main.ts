import { testUserLogout } from '@/redux/auth';

class Main {
  $mainPage: HTMLElement;
  data: any;
  dispatch: any;

  constructor($target: HTMLElement | null, props: any) {
    const $mainPage = document.createElement('section');
    this.$mainPage = $mainPage;

    this.data = props.data;
    this.dispatch = props.dispatch;

    $target?.appendChild($mainPage);
    this.render();
  }

  render() {
    this.$mainPage.innerHTML = `
      <div>main</div>
      <button class="logout">로그아웃</button>
    `;

    document
      .getElementsByClassName('logout')[0]
      .addEventListener('click', () => {
        this.dispatch(testUserLogout());
      });
  }
}

export default Main;
