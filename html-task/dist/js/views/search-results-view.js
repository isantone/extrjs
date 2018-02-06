export default class SearchResultsView {
  getTemplate(data) {
    const searchResultsTemplate = `
    {{#each this}}
      <a href="#products/{{this.id}}">
        <p class="search-results__result">{{this.title}}</p>
      </a>
    {{/each}}
    `;

    const compiledSearchResultsTemplate = Handlebars.compile(searchResultsTemplate);
    return compiledSearchResultsTemplate(data);
    //return Handlebars.compile(searchResultsTemplate(data));
  }
}