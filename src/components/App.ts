import Main from '@/components/Main';
import Config from '@/components/Config';
import { Store } from 'redux';

class App {
  $main: Main | undefined;
  $config: Config | undefined;
  rootStore: any;

  constructor($target: HTMLElement | null, store: Store) {
    this.rootStore = store.getState();

    if (this.rootStore.auth.repoID === '') {
      this.$config = new Config($target, {
        data: this.rootStore.auth,
        dispatch: store.dispatch,
      });
    } else {
      this.$main = new Main($target);
    }

    // store의 변경사항 감지 및 리렌더링
    store.subscribe(() => {
      const nextRootStore = store.getState();

      // auth 비교 로직
      this.$config?.setState(nextRootStore.auth);
    });
  }
}

export default App;
