import configureStore from '@/redux';
import App from '@/components/App';

const store = configureStore();

new App(document.getElementById('app') || document.body, store);
