import React, {useRef} from "react";
import Posts_json from "../posts.json";

function App(){
    <></>
    function Post(props){
        const carrousel = useRef(null);

        // const ir_esquerda = (e) => {
        //     e.preventDefault();
        //     carrousel.current.scrollLeft -= carrousel.current.offsetWidth;
        // }

        // const ir_direita = (e) => {
        //     e.preventDefault();
        //     carrousel.current.scrollLeft += carrousel.current.offsetWidth;
        // }

        return (
            <>
                <section className="divPost">
                <h3>{props.titulo}</h3>
                  <div className="scrollPost" ref={carrousel}>
                    {Posts_json.map((post_atual) => (
                        <>
                        { props.titulo === post_atual.secao &&(
                        <>
                        <div className="post">
                          <img src={post_atual.link_imagem} />
                            <a href={post_atual.link_post}>{post_atual.nome_do_post}</a>
                          <p>{post_atual.data}</p>
                        </div>
                        </>
                        )}
                    </>
                    ))}
                  </div>
                    {/* <div className="scrollPost-botoes">
                        <button className="bt-esquerda" onClick={ir_esquerda}>esquerda</button>
                        <button className="bt-direita" onClick={ir_direita}>direita</button>
                    </div> */}
                </section>
            </>
        )
    }

    return (
        <>
            <header>
                <h1>Quem Somos?</h1>
                <p>Atualmente (2023), somos alunos do ensino médio com curso técnico em informática. Nosso papel é propagar conscientização por meio do nosso projeto.</p>
            </header>
            <section id="desenvolvedores">
                <div class="card">
                    <img/>
                    <h5>Daniel Bernardes</h5>
                    <code>Líder do Projeto</code>
                </div>
                <div class="card">
                    <img/>
                    <h5>Giovanni Almeida</h5>
                    <code>Full-Stack</code>
                </div>
                <div class="card">
                    <img/>
                    <h5>Ramon Pereira</h5>
                    <code>Front-End e Designer</code>
                </div>
                <div class="card">
                    <img/>
                    <h5>Vitor Viana</h5>
                    <code>QA Tester e Social Media</code>
                </div>
                <div class="card">
                    <img/>
                    <h5>Bernardo Receputi</h5>
                    <code>QA Tester e Social Media</code>
                </div>
            </section>
            <section id="colaboradores">
                <hr></hr>
                <h3>Colaboradores</h3>
                <p>São aqueles que amparam o crescimento do projeto. Nos ajudando com os equipamentos necessários e competências técnicas.</p>
                <section id="pea">
                    <h4>PROGRAMA DE EDUCAÇÃO AMBIENTAL (PEA)</h4>
                    <p>Nos introduziram o conceito de Pegada Ecológica e solicitaram um projeto relacionado. Pavimentando, assim, o nascimento do site.</p>
                    <img/>
                </section>
                <section id="etpc">
                    <h4>ESCOLA TÉCNICA PANDIÁ CALÓGERAS (ETPC)</h4>
                    <p>Detém o acesso aos professores e computadores que tanto nos ajudaram no projeto.</p>
                    <img/>
                </section>
                {/* <section id="csn">
                    <h4>COMPANHIA SIDERÚRGICA NACIONAL (CSN)</h4>
                    <p>xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd </p>
                    <img/>
                </section> */}
            </section>
            <section id="redes-sociais">
                <hr></hr>
                <h1>
                    Conheça nossas <br/>
                    <span>
                        <i>
                            REDES SOCIAIS 🌎
                        </i>
                    </span>
                </h1>
            </section>
            <section id="explicacao">
                <p>Para divulgarmos nosso projeto, criamos um <a href=""><i>Instagram</i></a> e <a href=""><i>Linkedin</i></a>.
                Veja os tópicos dos nossos posts abaixo 👀
                </p>
            </section>
            <section id="posts">
                <section id="posts-ecologia">
                    <Post titulo="ECOLOGIA 🍀"/>
                </section>
                <section id="posts-projeto">
                    <Post titulo="PROJETO 📁"/>
                </section>
                <section id="posts-programacao">
                    <Post titulo="PROGRAMAÇÃO DO SITE  🖥️ " />
                </section>
                <section id="posts-especial">
                    <Post titulo="ESPECIAIS ✨"/>
                </section>
            </section>
            <footer>
                <h2><i>Siga Nossas Redes ✨</i></h2>
                <div>
                    <a href="https://www.instagram.com/greenlight.dev/"><i class="bi bi-instagram"></i></a>
                    <a href="https://github.com/XaropinhoS20/PegadaEcologica"><i class="bi bi-github"></i></a>
                    <a href="https://www.linkedin.com/in/greenlight-pegada-ecol%C3%B3gica-925bb2273/"><i class="bi bi-linkedin"></i></a>
                </div>
                <a href="#"><i>Página Inicial</i></a>
                <a href="#"><i>Média Global</i></a>
            </footer>
        </>
    )

}

export default App;