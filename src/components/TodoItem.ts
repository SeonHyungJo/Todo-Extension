import LabelItem from '@/components/LabelItem';
import { Label } from '@/model';

class TodoItem {
  $todoItem: HTMLElement;
  $todoItemTop: HTMLElement;
  $todoItemBottom: HTMLElement;
  $labelItems: HTMLElement;
  $label: LabelItem | null = null;
  data: any;
  dispatch: any;

  constructor($target: HTMLElement | null, props: any) {
    const $todoItem = document.createElement('section');
    const $todoItemTop = document.createElement('section');
    const $todoItemBottom = document.createElement('section');
    const $labelItems = document.createElement('section');

    $todoItem.classList.add('todo-item');
    this.$todoItem = $todoItem;

    $todoItemTop.classList.add('todo-item-top');
    this.$todoItemTop = $todoItemTop;

    $todoItemBottom.classList.add('todo-item-bottom');
    this.$todoItemBottom = $todoItemBottom;

    $labelItems.classList.add('label-items');
    this.$labelItems = $labelItems;

    this.data = props.data;
    this.dispatch = props.dispatch;

    $todoItemBottom?.appendChild($labelItems);
    $todoItem?.appendChild($todoItemTop);
    $todoItem?.appendChild($todoItemBottom);
    $target?.appendChild($todoItem);
    this.render();
  }

  render() {
    const { updatedAt, body, id, labelList, title } = this.data;

    this.$todoItem.dataset['id'] = id;
    this.$todoItem.dataset['updateAt'] = updatedAt;

    this.$todoItemTop.innerHTML = /*html*/ `
      <article class="todo-item__form" data-updated-at=${updatedAt} >
        <div class="round">
          <input type="checkbox" id="${id}_checkbox" class="todo-item__form__done-box">
          <label for="${id}_checkbox"></label>
        </div>
        <h1 id=${id}_title class="todo-item__form__title">${title}</h1>
        <button class="todo-item__form__delete-btn">X</button>
      </article>
      <article id=${id}_body class="todo-item__form todo-item__form_close">
        <textarea class="todo-item__form__contents" placeholder="Contents">${body}</textarea>
      </article>
    `;

    labelList.map((label: Label) => {
      new LabelItem(this.$labelItems, {
        data: label,
        dispatch: this.dispatch,
      });
    });

    const todoItem = <HTMLElement>document.getElementById(`${id}_title`);

    todoItem.addEventListener('click', () => {
      const content = <HTMLInputElement>document.getElementById(`${id}_body`);

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
