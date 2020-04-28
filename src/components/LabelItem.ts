class LabelItem {
  $labelItem: HTMLElement;
  data: any;
  dispatch: any;

  constructor($target: HTMLElement | null, props: any) {
    const $labelItem = document.createElement('section');
    this.$labelItem = $labelItem;

    this.data = props.data;
    this.dispatch = props.dispatch;

    $target?.appendChild($labelItem);
    this.render();
  }

  render() {
    this.$labelItem.innerHTML = `
      <div class="label-item"><span></span></div>
    `;
  }
}

export default LabelItem;
