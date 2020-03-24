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
      // } else {
      //   this.$main = new Main($target, {
      //     data: this.rootStore.todo,
      //     dispatch: store.dispatch,
      //   });
      //   this.currentPath = PATH_INDEX;
    }
  }
}

export default App;
