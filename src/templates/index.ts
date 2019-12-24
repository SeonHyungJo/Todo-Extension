import store from "../store/store";
import actions from "../store/actions";
import './index.scss';

console.log('test', store);
store.subscribe(() => {
  console.log('sub', store.getState())
})

const text:string = `<p id="testBtn">test</p>`;
document.getElementById('root').insertAdjacentHTML('afterend', text);
document.getElementById('testBtn').addEventListener('click', () => {
  store.setState((actions(store).increment(store.getState())))
})