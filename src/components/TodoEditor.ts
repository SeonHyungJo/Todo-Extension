class TodoEditor {
  $todoEditor: HTMLElement;
  data: any;
  dispatch: any;

  constructor($target: HTMLElement | null, props: any) {
    const $todoEditor = document.createElement('section');
    $todoEditor.classList.add('todo-editor');
    this.$todoEditor = $todoEditor;

    this.data = props.data;
    this.dispatch = props.dispatch;

    $target?.appendChild($todoEditor);
    this.render();
  }

  render() {
    this.$todoEditor.innerHTML = /*html*/ `
      <article class="todo-editor__collapse-form todo-editor__hidden">
        <button class="todo-editor__collapse-form__write-btn"> 메모 작성.. </button>
      </article>
      <article class="todo-editor__active">
        <div class="todo-editor__active-top-form">
          <input type="text" class="todo-editor__active-form__title-input" placeholder="Title"/>
          <button class="todo-editor__active__label-add-btn"> + </button>
        </div>
        <div class="todo-editor__active-bottom-form">
          <textarea class="todo-editor__active__contents" placeholder="Contents"></textarea>
        </div>
      </article>
    `;

    const createBtn = document.getElementsByClassName(
      'todo-editor__collapse-form__write-btn',
    )[0];

    const hiddenEditor = document.getElementsByClassName(
      'todo-editor__active',
    )[0];

    createBtn.addEventListener('click', function () {
      createBtn.classList.add('todo-editor__hidden');
      hiddenEditor.classList.remove('todo-editor__hidden');
    });
  }
}

export default TodoEditor;
