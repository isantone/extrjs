export default class HeaderView {
  getTemplate(data) {
    const headerTemplate = `
		<header id="pageHeader" class="header">
			<div id="headerContainer" class="header__container">
				<button id="navBtn" class="nav-btn mobile-btn header__nav-btn" onclick="toggleNav();">
					<span class="nav-btn__top"></span>
					<span class="nav-btn__mid"></span>
					<span class="nav-btn__bot"></span>
				</button>
				<div class="header__logo-wrapper">
					<a class="non-text-link header__logo" href="#">
						<!-- <img class="header__logo-img" src="http://localhost:3000/images/ex_shop_logo_m.png"> -->
					</a>
				</div>

				<nav id="navContainer" class="desktop-menu__container">
					<a id="catalogBtn" class="desktop-menu__btn" href="#">CATALOG</a>
					<a class="desktop-menu__btn" href="#">STORES</a>
					<a id="accountBtn" class="desktop-menu__btn" href="#">ACCOUNT</a>
				</nav>

				<svg class="svg-btn header__search-btn" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>
				<div class="header__cart mobile-btn">
					<a href="#cart">
						<svg class="svg-btn" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
							<path d="M0 0h24v24H0z" fill="none"/>
						</svg>
					</a>
				</div>
				<div id="searchForm" class="search-form">
					<svg class="svg-btn search-form__fa-search" class="search-form__fa-search" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>
					<input class="search-form__input" type="text" placeholder="Search here..." required>
				</div>
      </div>

			<div id="submenuContainer" class="desktop-menu__sub-menu hide">

			{{#each this}}
				<ul class="desktop-menu__sub-ul">
					<li>
						<a class="desktop-menu__sub-header" href="#categories/{{this.name}}/products">{{this.title}}</a>
					</li>
					{{#each catalog}}
						<li class="desktop-menu__sub-btn">
							<a href="#categories/{{this.name}}/products" class="desktop-menu__sub-link">{{this.title}}</a>
						</li>
					{{/each}}
				</ul>
			{{/each}}
			</div>
		</header>
    `;

    const compiledCategoryTemplate = Handlebars.compile(headerTemplate);
    return compiledCategoryTemplate(data);
  }
}
