// Webpack bootstrap file.

import './asset/style/base.scss';
import ignition from './asset/script/main';

const app = new ignition();
app.init();