import paths from '../paths';

import Presenter from './presenter';

import HeaderModel from '../models/header-model';
import HeaderView from '../views/header-view';

import {signPresenter} from '../router';

export default class HeaderPresenter extends Presenter {
	constructor() {
		super();

		const requestUrl = paths.ajax.index.url;
		const requestParameters = paths.ajax.index.params;

		this.fetchReq = new Request(requestUrl, requestParameters);

		this.view = new HeaderView();
		this.model = new HeaderModel();
	}

	init() { // <-- SINGLETON
		if (!this.template) {
			super.init();
		}
  }

	insertTemplate(compiledTemplate) {
		this.body.insertAdjacentHTML("afterBegin", compiledTemplate);
		this.template = document.getElementById('pageHeader');
	}

	removeTemplate() {
		//this.template.remove();
	}

	getEventTargets() {
    return new Promise((resolve, reject) => {
			this.accountBtn = document.getElementById("accountBtn");
			this.catalogBtn = document.getElementById("catalogBtn");
			this.navContainer = document.getElementById("navContainer");
			this.submenuContainer = document.getElementById("submenuContainer");

			resolve();
    });
  }

  bindEvents() {
		document.getElementById("accountBtn").addEventListener("click", this.showRegForm.bind(this), false);
		//this.accountBtn.addEventListener("click", signPresenter.showRegForm()/*.bind(this)*/, false);
		this.catalogBtn.addEventListener("mouseover", this.showMenu.bind(this), false);
		this.catalogBtn.addEventListener("mouseleave", this.closeMenu.bind(this));
		//this.navContainer.addEventListener("mouseover", this.closeMenu.bind(this));
		this.submenuContainer.addEventListener("mouseleave", this.closeMenu.bind(this));
	}

	showRegForm(event) {
		signPresenter.showRegForm(event);
	}

	showMenu(event) {
		event.preventDefault();

		this.submenuContainer.classList.remove("hide");
		//this.menuContainer.classList.toggle("hide");
	}

	closeMenu(event) {
		event.preventDefault();

		if (event.currentTarget === this.catalogBtn) {
			if (event.movementY > 0) {

			} else {
				this.submenuContainer.classList.add("hide");
			}
		} else {
			this.submenuContainer.classList.add("hide");
		}

		//if (event.clientY > 250 || event.currentTarget === this.navContainer) {
			//this.submenuContainer.classList.add("hide");
		//}
	}
}