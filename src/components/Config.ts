import { testUserLogin } from '@/redux/auth';

class Config {
  $configPage: HTMLElement;
  data: any;
  dispatch: any;
  constructor($target: HTMLElement | null, props: any) {
    const $configPage = document.createElement('section');
    this.$configPage = $configPage;

    $target?.appendChild($configPage);

    this.data = props.data;
    this.dispatch = props.dispatch;

    this.render();
  }

  setState(nextState: any) {
    this.data = nextState;
    this.render();
  }

  render() {
    const { repoName, owner, token } = this.data;

    this.$configPage.innerHTML = `
      <div>${repoName}</div>
      <div>${owner}</div>
      <div>${token}</div>
      <button class="sample">Get sample Data</button>
    `;

    document
      .getElementsByClassName('sample')[0]
      .addEventListener('click', () => {
        this.dispatch(
          testUserLogin({
            repoName: 'sample',
            token: 'sample',
            owner: 'sample',
          }),
        );
      });
  }
}

export default Config;
