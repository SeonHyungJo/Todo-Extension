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
      <button style="border: 1px solid black;width: 50px;height:20px;background:black;"></button>
    `;
  }
}

export default LabelItem;
