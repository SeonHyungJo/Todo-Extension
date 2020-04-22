import Main from '@/components/Main';
import Config from '@/components/Config';
import { Store } from 'redux';

class App {
  $target: HTMLElement;
  $main: Main | null = null;
  $config: Config | null = null;
  rootStore: any;

  constructor($target: HTMLElement, store: Store) {
    this.$target = $target;
    this.rootStore = store.getState();

    if (this.rootStore.auth.repoID === '') {
      this.$config = new Config($target, {
        data: this.rootStore.auth,
        dispatch: store.dispatch,
      });
    } else {
      this.$main = new Main($target, {
        data: this.rootStore.todo,
        dispatch: store.dispatch,
      });
    }

    // store의 변경사항 감지 및 리렌더링
    store.subscribe(() => {
      const nextRootStore = store.getState();

      if (this.rootStore.auth.repoID === '') {
        this.$target.innerHTML = '';
        this.$main = new Main(this.$target, {
          data: nextRootStore.todo,
          dispatch: store.dispatch,
        });
      } else {
        this.$target.innerHTML = '';
        this.$config = new Config($target, {
          data: nextRootStore.auth,
          dispatch: store.dispatch,
        });
      }
    });
  }
}

export default App;
