// RxJS v6+
import { fromEvent } from 'rxjs';
import { map, delay, debounceTime } from 'rxjs/operators';

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
      <input class="repo-name-input">${repoName}</input>
      <input class="owner-input">${owner}</input>
      <input class="token-input">${token}</input>
      <button class="sample">Get sample Data</button>
    `;

    //create observable that emits click events
    const getData = fromEvent(
      document.getElementsByClassName('sample')[0],
      'click',
    );

    const handleRepoInput = fromEvent(
      document.getElementsByClassName('repo-name-input')[0],
      'keyup',
    );

    const handleOwnerInput = fromEvent(
      document.getElementsByClassName('owner-input')[0],
      'keyup',
    );

    const handleTokenInput = fromEvent(
      document.getElementsByClassName('token-input')[0],
      'keyup',
    );

    //map to string with given event timestamp
    const example = getData.pipe(
      map(event => `Event time: ${event.timeStamp}`),
      delay(700),
    );

    const example1 = handleRepoInput.pipe(
      map(() => document.getElementsByClassName('repo-name-input')[0].value),
      debounceTime(500),
    );

    const example2 = handleOwnerInput.pipe(
      map(event => `Event time: ${event}`),
      debounceTime(500),
    );

    const example3 = handleTokenInput.pipe(
      map(event => `Event time: ${event}`),
      debounceTime(500),
    );
    //output (example): 'Event time: 7276.390000000001'
    const subscribe = example.subscribe(val => {
      console.log('???');
      // this.dispatch(
      //   testUserLogin({
      //     repoName: 'sample',
      //     token: 'sample',
      //     owner: 'sample',
      //   }),
      // );
    });

    const subscribe1 = example1.subscribe(val => {
      console.log(val);
    });

    const subscribe2 = example2.subscribe(val => {
      console.log(val);
    });

    const subscribe3 = example3.subscribe(val => {
      console.log(val);
    });
    subscribe.unsubscribe();
  }
}

export default Config;
