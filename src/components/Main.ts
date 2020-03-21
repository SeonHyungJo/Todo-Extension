import TodoEditor from '@/components/TodoEditor';
import TodoItem from './TodoItem';

class Main {
  $mainPage: HTMLElement;
  $todoEditor: TodoEditor | null = null;
  $todoItem: TodoItem | null = null;
  data: any;
  dispatch: any;

  constructor($target: HTMLElement | null, props: any) {
    const $mainPage = document.createElement('section');
    $mainPage.classList.add('main');
    this.$mainPage = $mainPage;

    this.data = props.data;
    this.dispatch = props.dispatch;

    $target?.appendChild($mainPage);
    this.render();
  }

  render() {
    const $todoEditor = new TodoEditor(this.$mainPage, {
      dispatch: this.dispatch,
    });
    this.$todoEditor = $todoEditor;

    const $todoItem = new TodoItem(this.$mainPage, {
      dispatch: this.dispatch,
    });
    this.$todoItem = $todoItem;
  }
}

export default Main;
