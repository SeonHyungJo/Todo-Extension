import TodoItem from './TodoItem';

class Main {
  $mainPage: HTMLElement;
  $todoItem: HTMLElement;
  data: any; // Todo 정의 필요
  dispatch: any; // Todo 정의 필요

  constructor($target: HTMLElement | null, props: any) {
    const $mainPage = document.createElement('section');
    const $todoItem = document.createElement('section');

    $mainPage.classList.add('main');
    this.$mainPage = $mainPage;

    $todoItem.classList.add('todo-item');
    this.$todoItem = $todoItem;

    $target?.appendChild($mainPage);

    this.data = props.data;
    this.dispatch = props.dispatch;

    this.render();
  }

  setState(nextState: any) {
    this.data = nextState;
    this.render();
  }

  render() {
    this.$mainPage.innerHTML = /*html*/ `
      <section class="main__top">
        <div class="main__top__todo-container">
          <input type="text" id="main__todo-input" placeholder="Type your todo item..." autofocus>
        </div>
        <div class="main__content__todo-container">
          <section class="todo-item">
            <article class="todo-item__form" id="todo-item-id">
              <input type="checkbox" class="todo-item__form__done-box">
              <h1 class="todo-item__form__title">Title</h1>
              <button class="todo-item__form__delete-btn">X</button>
            </article>
            <article id="todo-item-content" class="todo-item__form todo-item__form_open">
              <textarea class="todo-item__form__contents" placeholder="todoItem row클릭하면 나올 textarea"></textarea>
            </article>
          </section>
        </div>
      </section>
    `;

    const todoItem = document.getElementsByClassName('todo-item__form')[0];

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

export default Main;
