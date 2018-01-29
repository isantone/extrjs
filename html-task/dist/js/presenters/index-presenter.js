import paths from '../paths';

import Presenter from './presenter';

import IndexModel from '../models/index-model';
import IndexView from '../views/index-view';

export default class IndexPresenter extends Presenter {
	constructor() {
		const requestUrl = paths.ajax.index.url;
		const requestParameters = paths.ajax.index.params;
		const indexFetchReq = new Request(requestUrl, requestParameters);

		super(indexFetchReq);

		this.view = new IndexView();
		this.model = new IndexModel();
		this.title = "EXTREME SHOP";
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}
}