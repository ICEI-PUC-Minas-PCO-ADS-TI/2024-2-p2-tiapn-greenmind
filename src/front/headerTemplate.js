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
                                <li><a href="../../views/nossa-equipe/nossaequipe.html">Nossa equipe</a></li>
                                <li><a href="../../views/assuntos-abordados/assuntos-abordados.html">Assuntos abordados</a></li>
                                <li><a href="../../views/o-greenmind/o-greenmind.html">O Greenmind</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#">Artigos e<br> Dicas</a>
                        <div class="dropdown-div">
                            <ul>
                                <li><a href="../../views/temas/tema1.html">Tema 1</a></li>
                                <li><a href="../../views/temas/tema2.html">Tema 2</a></li>
                                <li><a href="../../views/temas/tema3.html">Tema 3</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#">Quiz<br> Ambiental</a>
                        <div class="dropdown-div">
                            <ul>
                                <li><a href="../../views/formulario/formulario.html">Teste seu Conhecimento</a></li>
                                <li><a href="../../views/desafio/index.html">Tema 2</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#">Consumo<br> Inteligente</a>
                        <div class="dropdown-div">
                            <ul>
                                <li><a href="../../views/desperdicio-agua-energia/desperdicio-agua.html">Consumo de Água</a></li>
                                <li><a href="../../views/desperdicio-agua-energia/desperdicio-energia.html">Consumo de Luz</a></li>
                                <li><a href="../../views/desperdicio-alimentos/desperdicio-alimentos.html">Desperdício de alimentos</a></li>
                                <li><a href="../../views/quiz-pegada/index.html">Pegada Ecológica</a></li>
                            </ul>
                        </div>
                    </li>
                    <!--<li class="dropdown">
                        <a href="#">Rede GreenMind</a>
                        <div class="dropdown-div">
                            <ul>
                                <li><a href="#redegreenmind">Rede<br> Greenmind</a></li>
                            </ul>
                        </div>
                    </li>-->
                    ${this.innerText == "perfil" ? "<li><a href='../../views/perfil/perfil.html'>Perfil</a></li>" : "<li><a href='../../views/auth/login.html'>Login</a></li>"}
                </ul>
            </nav>
        </header>
        `;
    }
}

customElements.define('greenmind-header', GreenmindHeader);