import {bodyStyle, titleText} from './dom';
import users, { Activepremium } from './data';

bodyStyle();
titleText('Hello from the Dom 🔥' );

const results = Activepremium(users);
console.log(users , results);

console.log('test');