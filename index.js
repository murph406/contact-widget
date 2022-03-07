
var render = function (template, node) {
    if (!node) return;
    node.innerHTML = (typeof template === 'function' ? template() : template);
};

var App = function () {
    const { users, viewable } = App.state
    const content = document.getElementById('content_id')
    const isOdd = (num) => num % 2;

    content.querySelectorAll('*').forEach(n => n.remove());

    function returnDotStyle(status) {
        let dotStyle = ""

        switch (status) {
            case 0:
                dotStyle = "dot bg-red mr-1"
                break;

            case 1:
                dotStyle = "dot bg-yellow mr-1"
                break;

            case 2:
                dotStyle = "dot bg-green mr-1"
                break;

            default:
                dotStyle = "dot bg-red mr-1"
                break;
        }
        return dotStyle
    }

    function returnDetailText(user) {
        let detailText = "";

        switch (viewable) {
            case 'email':

                detailText = user.email

                break;

            case 'phone':
                detailText = user.phone

                break;

            case 'address':
                detailText = user.address

                break;

            default:
                detailText = user.email

                break;
        }

        return detailText
    }

    for (var i = 0; i < users.length; i++) {
        const user = users[i]

        var containerDiv = document.createElement('div');
        containerDiv.className = isOdd(i) ? "text-container" : "text-container bg-grey-2"

        var nameDiv = document.createElement('div');
        var name = document.createElement('p');
        var dotDiv = document.createElement('div');

        nameDiv.className = "name-text-container"
        name.textContent = user.name
        name.className = "white"
        dotDiv.className = returnDotStyle(user.status)

        var contactDiv = document.createElement('div');
        var contact = document.createElement('p');

        contactDiv.className = "contact-text-container"
        contact.textContent = returnDetailText(user)
        contact.className = "contact-text"

        nameDiv.appendChild(dotDiv)
        nameDiv.appendChild(name)
        contactDiv.appendChild(contact)
        containerDiv.appendChild(nameDiv)
        containerDiv.appendChild(contactDiv)

        content.appendChild(containerDiv)
    }

    return content;
};

App.state = {
    viewable: 'email',
    users: []
};

App.setState = function (props) {
    for (var key in props) {
        if (props.hasOwnProperty(key)) {
            App.state[key] = props[key];
        }
    }

    render(App, document.querySelector('#content_id'));
};

function onChangeSelection(evt) {
    App.setState({
        ...App.state,
        viewable: evt.value
    })
}

render(App, document.getElementById('#content_id'));

fetch("./data/users.json")
    .then(response => response.json())
    .then((data) => {
        let users = []

        data.forEach((u, i) => users.push({ ...u, status: Math.floor(Math.random() * 3) }))
        App.setState({ ...App.state, users })
    })
    .catch(error => alert("Error Loading Data"))
        