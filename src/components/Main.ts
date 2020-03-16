class Main {
  $mainPage: HTMLElement;
  constructor($target: HTMLElement | null) {
    const $mainPage = document.createElement('section');
    this.$mainPage = $mainPage;

    $target?.appendChild($mainPage);
    this.render();
  }

  render() {
    this.$mainPage.innerHTML = `
      <div>main</div>
    `;
  }
}

export default Main;
