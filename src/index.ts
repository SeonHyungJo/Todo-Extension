import configureStore from '@/redux';
import App from '@/components/App';

import './reset.css';
import './style.css';

const store = configureStore();

new App(document.getElementById('app') || document.body, store);
