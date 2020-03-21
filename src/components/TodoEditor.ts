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
      <article class="todo-editor__collapse-form">
        <button class="todo-editor__collapse-form__write-btn"> 메모 작성.. </button>
      </article>
      <article class="todo-editor__active">
        <button class="todo-editor__active__label-add-btn"> + </button>
        <input type="text" class="todo-editor__active-form__title-input" placeholder="Title"/>
        <textarea class="todo-editor__active__contents" placeholder="Contents"></textarea>
      </article>
    `;
  }
}

export default TodoEditor;
