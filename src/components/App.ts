import Main from '@/components/Main';
import Config from '@/components/Config';
import { Store } from 'redux';

const PATH_INDEX: string = 'index';
const PATH_CONFIG: string = 'config';

class App {
  $target: HTMLElement;
  $main: Main | null = null;
  $config: Config | null = null;
  rootStore: any;
  currentPath: string = PATH_CONFIG;

  constructor($target: HTMLElement, store: Store) {
    this.$target = $target;
    this.rootStore = store.getState();

    if (this.rootStore.auth.repoID === '') {
      this.$config = new Config($target, {
        data: this.rootStore.auth,
        dispatch: store.dispatch,
      });
      this.currentPath = PATH_CONFIG;
    } else {
      this.$main = new Main($target, {
        data: this.rootStore.todo,
        dispatch: store.dispatch,
      });
      this.currentPath = PATH_INDEX;
    }

    // store의 변경사항 감지 및 리렌더링
    store.subscribe(() => {
      const nextRootStore = store.getState();

      if (this.currentPath === PATH_CONFIG) {
        this.$target.innerHTML = '';
        this.$main = new Main(this.$target, {
          data: nextRootStore.todo,
          dispatch: store.dispatch,
        });

        this.currentPath = PATH_INDEX;
      } else if (this.currentPath === PATH_INDEX) {
        this.$target.innerHTML = '';
        this.$config = new Config($target, {
          data: nextRootStore.auth,
          dispatch: store.dispatch,
        });

        this.currentPath = PATH_CONFIG;
      }
    });
  }
}

export default App;
