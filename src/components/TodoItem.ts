import LabelItem from './LabelItem';

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

    const $label = new LabelItem(this.$todoItem, {
      dispatch: this.dispatch,
    });
    this.$label = $label;
  }
}

export default TodoItem;
