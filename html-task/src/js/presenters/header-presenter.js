import paths from '../paths';
import ls from '../local-storage';

import Presenter from './presenter';

import HeaderModel from '../models/header-model';
import HeaderView from '../views/header-view';
import SearchResultsView from '../views/search-results-view';

import {signPresenter} from '../router';

export default class HeaderPresenter extends Presenter {
	constructor() {
		super();

		const requestUrl = paths.ajax.index.url;
		const requestParameters = paths.ajax.index.params;

		this.fetchReq = new Request(requestUrl, requestParameters);

		this.view = new HeaderView();
		this.model = new HeaderModel();

		this.searchResultsView = new SearchResultsView();
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

			this.cartValue = document.getElementById("cartValue");

			this.searchForm = document.getElementById("searchForm");
			this.searchInput = document.getElementById("searchInput");
			this.searchResultsContainer = document.getElementById("searchResults");
			this.searchBtn = document.getElementById("searchIcon");

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

		this.searchInput.addEventListener("focus", this.animateSearchForm.bind(this), false);
		this.searchInput.addEventListener("blur", this.animateSearchForm.bind(this), false);
		this.searchInput.addEventListener("input", this.showSearchResults.bind(this), false);

		this.refreshHeaderInfo();

		///// ---- WATCHER ------ /////////

		// Select the node that will be observed for mutations
		setTimeout(() => {
			//var targetNode = document.querySelector("#pageContent");
			var targetNode = document.body;

			// Options for the observer (which mutations to observe)
			var config = { attributes: true, childList: true };

			// Callback function to execute when mutations are observed
			var callback = (mutationsList) => {
				this.refreshHeaderInfo();
			};

			// Create an observer instance linked to the callback function
			var observer = new MutationObserver(callback);

			// Start observing the target node for configured mutations
			observer.observe(targetNode, config);

			// Later, you can stop observing
			//observer.disconnect();
		}, 1000);
		///// ----- WATCHER ----- //////
	}



	showRegForm(event) {
		signPresenter.showRegForm(event);
	}

	showMenu(event) {
		event.preventDefault();

		this.submenuContainer.classList.remove("hide");
		//this.submenuContainer.classList.toggle("hide");
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

	animateSearchForm(event) {
		event.preventDefault();

		this.searchForm.classList.toggle("search-form_focused");
		this.searchBtn.classList.toggle("search-form__fa-search_focused");
		setTimeout(()=> { 
			this.searchResultsContainer.classList.toggle("hide"); 
		}, 200);
		
		if (this.searchForm.classList.contains("search-form_focused")) {
			event.currentTarget.select();
		}
	}

	showSearchResults(event) {
		event.preventDefault();

		const requestUrl = paths.ajax.search.url + event.currentTarget.value;
		console.log(requestUrl);
		const requestParameters = paths.ajax.search.params;

		const searchFetchReq = new Request(requestUrl, requestParameters);

		this.model.fetchData(searchFetchReq)
    .then((jsonData) => {
			console.log(jsonData);
      return this.searchResultsView.getTemplate(jsonData);
    })
    .then((compiledTemplate) => {
			this.searchResultsContainer.innerHTML = compiledTemplate;
      return true;
    }) //PUT CATCH HERE?
    .catch((ex) => {
      console.log('Displaying of the search results failed: ', ex);

      if (this.fetchErrorHandler) {
        this.fetchErrorHandler(ex);
      }
    });
	}
}