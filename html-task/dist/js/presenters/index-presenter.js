import Presenter from './presenter';
//import IndexPresenter from './index-page';
import IndexModel from '../models/index-model';
import IndexView from '../views/index-view';

import Database from '../database';

// var data = {
//     name: 'name',
//     surname: 'surname'
// };

function IndexPresenter() {
    Presenter.apply(this, arguments);
    this.view = new IndexView();
    this.model = new IndexModel();
}

IndexPresenter.prototype = Object.create(Presenter.prototype);
IndexPresenter.prototype.constructor = IndexPresenter;

IndexPresenter.prototype.init = function() {
    this.render(this.view.getTemplate(this.model.getData(Database())));
    //this.getButtons();
    //this.bindEvents();
};

// MainPresenter.prototype.getButtons = function() {
//     this.button1 = document.getElementById('button1');
//     this.button2 = document.getElementById('button2');
// };

IndexPresenter.prototype.bindEvents = function() {
    this.button1.addEventListener('click', this.handleButtonClick, false);
    this.button2.addEventListener('click', this.handleButtonClick, false);
};

IndexPresenter.prototype.handleButtonClick = function(event) {
    console.log(`Click to button #${event.target.dataset.id}`);
};

export default IndexPresenter;