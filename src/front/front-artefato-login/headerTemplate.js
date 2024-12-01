class GreenmindHeader extends HTMLElement {
    connectedCallback() {
        let logoURL = "../../assets/img/cropped_logo.png";
        // if(this.innerText == "home") {
        //     logoURL = "./assets/img/cropped_logo.png";
        // }
        this.innerHTML = `
        <header>
            <img src="${logoURL}" alt="">
            <nav>
                <ul id="itens-nav">
                    <input id="menu-toggle" type="checkbox" name="menu-toggle">
                    <label id="label-menu-toggle" for="menu-toggle">&#9776;</label>
                    <li class="dropdown">
                        <a href="#">Conheça o<br> Greenmind</a>
                        <div class="dropdown-div">
                            <ul>
                                <li><a href="#nossaequipe">Nossa equipe</a></li>
                                <li><a href="#assuntos">Assuntos abordados</a></li>
                                <li><a href="#greenmind">O Greenmind</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#">Artigos e<br> Dicas</a>
                        <div class="dropdown-div">
                            <ul>
                                <li><a href="#tema1">Tema 1</a></li>
                                <li><a href="#tema2">Tema 2</a></li>
                                <li><a href="#tema3">Tema 3</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#">Quiz<br> Ambiental</a>
                        <div class="dropdown-div">
                            <ul>
                                <li><a href="#tema1">Tema 1</a></li>
                                <li><a href="#tema2">Tema 2</a></li>
                                <li><a href="#tema3">Tema 3</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#">Consumo<br> Inteligente</a>
                        <div class="dropdown-div">
                            <ul>
                                <li><a href="#tema1">Tema 1</a></li>
                                <li><a href="#tema2">Tema 2</a></li>
                                <li><a href="#tema3">Tema 3</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#redegreenmind">Rede<br> Greenmind</a></li>
                    <li><a href="./views/auth/login.html">Login</a></li>
                </ul>
            </nav>
        </header>
        `;
    }
}

customElements.define('greenmind-header', GreenmindHeader);