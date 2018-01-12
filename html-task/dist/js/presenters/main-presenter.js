import Presenter from './presenter';
import IndexPresenter from './index-page';
import MainModel from '../models/main-model';
import MainView from '../views/main-view';

import Database from '../database';

// var data = {
//     name: 'name',
//     surname: 'surname'
// };

function MainPresenter() {
    Presenter.apply(this, arguments);
    this.view = new MainView();
    this.model = new MainModel();
}

MainPresenter.prototype = Object.create(Presenter.prototype);
MainPresenter.prototype.constructor = MainPresenter;

MainPresenter.prototype.init = function() {
    this.render(this.view.getTemplate(this.model.getData(database)));
    //this.getButtons();
    this.bindEvents();
};

// MainPresenter.prototype.getButtons = function() {
//     this.button1 = document.getElementById('button1');
//     this.button2 = document.getElementById('button2');
// };

MainPresenter.prototype.bindEvents = function() {
    this.button1.addEventListener('click', this.handleButtonClick, false);
    this.button2.addEventListener('click', this.handleButtonClick, false);
};

MainPresenter.prototype.handleButtonClick = function(event) {
    console.log(`Click to button #${event.target.dataset.id}`);
};

export default MainPresenter;