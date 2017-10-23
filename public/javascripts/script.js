
import '../sass/style.scss';

import listJs from './modules/listJs';
import ckEditor from './modules/ckEditor';
import activate from './modules/activate';
import materialize from './modules/materialize';

const postSubItems = document.getElementById('show-post-items');
const subItem1 = document.getElementById('subItem1');

postSubItems.addEventListener('click', function() {
    if(subItem1.classList.contains('hide')){
        subItem1.classList.remove('hide');
        subItem1.classList.add('show');
    }
    else{
        subItem1.classList.remove('show');
        subItem1.classList.add('hide');
    }
});

const categorySubItems = document.getElementById('show-category-items');
const subItem2 = document.getElementById('subItem2');

categorySubItems.addEventListener('click', function() {
    if(subItem2.classList.contains('hide')){
        subItem2.classList.remove('hide');
        subItem2.classList.add('show');
    }
    else{
        subItem2.classList.remove('show');
        subItem2.classList.add('hide');
    }
});

ckEditor( $('.content'));

