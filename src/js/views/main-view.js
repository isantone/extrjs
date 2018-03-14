function MainView() {}

MainView.prototype.getTemplate = function(data) {
    return `
        <div>
            ${data.name} ${data.surname}
            <button id="button1" data-id="1">#1</button>
            <button id="button2" data-id="2">#2</button>
        </div>
    `;
};

export default MainView;