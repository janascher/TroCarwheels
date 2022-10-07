export default function Details() {
    return `
        <section class="containerDetails"> 
            <h1>Detalhes do carro miniatura</h1>  

            <div class="gridSelect">        
                <div class="leftSelect">
                    <img src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                    <h3>Nome do carro</h3>
                    <div class="infos padding">
                        <p>Enviado e trocado por:</p>
                        <p class="nameUser">Nome do usuário</p>
                    </div>
                    <div class="infos borderTop paddingBorder">
                        <h4>Cor:</h4>
                        <p>Verde</p>
                    </div>
                    <div class="description borderTop paddingBorder">
                        <h4>Detalhes do produto:</h4>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam architecto atque expedita cupiditate ad aliquid recusandae mollitia accusantium.</p>
                    </div>
                </div>

                <div class="rightSelect">  
                    <p class="text">Selecione um carro seu para propor uma troca:</p>
                    <div class="carSelection">

                        <article class="infosCar">
                            <a target="_blank" href="./assets/img/photos/pexels-pixabay-35967.jpg">
                                <img class="basis-1" src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">Nome do carro</p>
                            <button class="basis-1" type="button">Selecionar</button>
                        </article>

                        <div class="buttonSubmit">
                            <button type="submit">Enviar Proposta</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
}