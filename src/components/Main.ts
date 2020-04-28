import TodoEditor from '@/components/TodoEditor';
import TodoItem from '@/components/TodoItem';

class Main {
  $mainPage: HTMLElement;
  $todoEditor: HTMLElement;
  $todoItemContainer: HTMLElement;
  data: any; // Todo 정의 필요
  dispatch: any; // Todo 정의 필요

  constructor($target: HTMLElement | null, props: any) {
    const $mainPage = document.createElement('section');
    const $todoEditor = document.createElement('section');
    const $todoItemContainer = document.createElement('section');

    $mainPage.classList.add('main');
    this.$mainPage = $mainPage;

    $todoEditor.classList.add('todo-editor-container');
    this.$todoEditor = $todoEditor;

    $todoItemContainer.classList.add('todo-items');
    this.$todoItemContainer = $todoItemContainer;

    $mainPage.appendChild($todoEditor);
    $mainPage.appendChild($todoItemContainer);
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
    // this.$mainPage.innerHTML = /*html*/ `
    //   <section class="main__top">
    //     <div class="main__top__todo-container">
    //       <input type="text" id="main__todo-input" placeholder="Type your todo item..." autofocus>
    //     </div>
    //     <div class="main__content__todo-container">
    //       <section class="todo-item">
    //         <article class="todo-item__form" id="todo-item-id">
    //           <input type="checkbox" class="todo-item__form__done-box">
    //           <h1 class="todo-item__form__title">Title</h1>
    //           <button class="todo-item__form__delete-btn">X</button>
    //         </article>
    //         <article id="todo-item-content" class="todo-item__form todo-item__form_open">
    //           <textarea class="todo-item__form__contents" placeholder="todoItem row클릭하면 나올 textarea"></textarea>
    //         </article>
    //       </section>
    //     </div>
    //   </section>
    // `;

    new TodoEditor(this.$todoEditor, {
      data: this.data,
      dispatch: this.dispatch,
    });

    new TodoItem(this.$todoItemContainer, {
      data: this.data,
      dispatch: this.dispatch,
    });

    new TodoItem(this.$todoItemContainer, {
      data: this.data,
      dispatch: this.dispatch,
    });

    new TodoItem(this.$todoItemContainer, {
      data: this.data,
      dispatch: this.dispatch,
    });

    new TodoItem(this.$todoItemContainer, {
      data: this.data,
      dispatch: this.dispatch,
    });

    new TodoItem(this.$todoItemContainer, {
      data: this.data,
      dispatch: this.dispatch,
    });

    new TodoItem(this.$todoItemContainer, {
      data: this.data,
      dispatch: this.dispatch,
    });

    new TodoItem(this.$todoItemContainer, {
      data: this.data,
      dispatch: this.dispatch,
    });

    new TodoItem(this.$todoItemContainer, {
      data: this.data,
      dispatch: this.dispatch,
    });
  }
}

export default Main;
