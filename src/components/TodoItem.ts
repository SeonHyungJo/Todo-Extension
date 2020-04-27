import LabelItem from '@/components/LabelItem';

class TodoItem {
  $todoItem: HTMLElement;
  $label: LabelItem | null = null;
  data: any;
  dispatch: any;

  constructor($target: HTMLElement | null, props: any) {
    const $todoItem = document.createElement('section');
    $todoItem.classList.add('todo-item');
    this.$todoItem = $todoItem;

    this.data = props.data;
    this.dispatch = props.dispatch;

    $target?.appendChild($todoItem);
    this.render();
  }

  render() {
    this.$todoItem.innerHTML = /*html*/ `
      <article class="todo-item__form">
        <input type="checkbox" class="todo-item__form__done-box">
        <h1 class="todo-item__form__title">Title</h1>
        <button class="todo-item__form__delete-btn">X</button>
      </article>
      <article class="todo-item__form todo-item__form_open">
        <textarea class="todo-item__form__contents" placeholder="Contents"></textarea>
      </article>
    `;

    new LabelItem(this.$todoItem, {
      dispatch: this.dispatch,
    });

    const todoItem = document.getElementsByClassName(
      'todo-item__form__title',
    )[0];

    todoItem.addEventListener('click', () => {
      const content = <HTMLInputElement>(
        document.getElementById('todo-item-content')
      );
      if (content.classList.contains('todo-item__form_close')) {
        content.classList.remove('todo-item__form_close');
        content.classList.add('todo-item__form_open');
      } else {
        content.classList.remove('todo-item__form_open');
        content.classList.add('todo-item__form_close');
      }
    });
  }
}

export default TodoItem;
