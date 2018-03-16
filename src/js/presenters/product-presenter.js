import paths from '../paths';

import Presenter from './presenter';

import ProductModel from '../models/product-model';
import ProductView from '../views/product-view';

import {setActive, nextSlide, previousSlide} from '../slider';

export default class ProductPresenter extends Presenter {
	constructor(idOfProduct) {
		super();

		const requestUrl = paths.ajax.product.url + idOfProduct;
		const requestParameters = paths.ajax.product.params;

		this.fetchReq = new Request(requestUrl, requestParameters);

		this.view = new ProductView();
		this.model = new ProductModel();

		this.title = "EXTREME SHOP";
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}

	getEventTargets() {
		//this.viewChangeButton = document.getElementById('viewChanger');
		this.logo = document.getElementById('logo');
		this.body = document.body;

		this.sliderLeftControl = document.getElementById('leftControl');
		this.sliderRightControl = document.getElementById('rightControl');
		this.sliderPreviews = document.getElementsByClassName('slider__preview-image');
	}

	bindEvents() {
		this.sliderLeftControl.addEventListener('click', previousSlide, false);
		this.sliderRightControl.addEventListener('click', nextSlide, false);
		// forEach(this.sliderPreviews, function(preview) {
		// 	preview.addEventListener('click', setActive(preview), false);
		// });
		//this.sliderPreviews.addEventListener('click', setActive, false);
		//$(".sliderPreviews").click(setActive);
	}

	unbindEvents() {
		this.sliderLeftControl.removeEventListener('click', previousSlide, false);
		this.sliderRightControl.removeEventListener('click', nextSlide, false);
		//this.sliderPreviews.removeEventListener('click', setActive, false);
	}
}