export class Router {
  routes= {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)
    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    const navItems = {
      '/': document.getElementById('homeNav'),
      '/universe': document.getElementById('universeNav'),
      '/exploration': document.getElementById('explorationNav')
    };

    Object.values(navItems).forEach(navItem => navItem.classList.remove('selectedNav'));

    if (navItems[pathname]) {
      navItems[pathname].classList.add('selectedNav');
    }

    const backgroundImages = {
      '/': './assets/mainBG.png',
      '/universe': './assets/universeBG.png',
      '/exploration': './assets/explorationBG.png'
    };

    document.body.style.backgroundImage = `url(${backgroundImages[pathname] || backgroundImages['/']})`;

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector("#app").innerHTML = html
      })
  }
}

