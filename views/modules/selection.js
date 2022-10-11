export default function Selection() {
    return `
        <section class="container"> 
            <h1>Proposta de troca</h1>  

            <div class="gridSelect">        
                <div class="leftSelect">
                    <img src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                    <p>Nome do carro</p>
                </div>

                <div class="rightSelect">  
                    <p class="text">Selecione um carro seu para propor uma troca:</p>
                    
                    <div class="carSelection">
                        <article class="infosCar">
                            <a target="_blank" href="./assets/img/photos/pexels-pixabay-35967.jpg">
                                <img class="basis-1" src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">Nome do carro um</p>
                            <button class="basis-1" type="button">Selecionar</button>
                        </article>

                        <article class="infosCar">
                            <a target="_blank" href="./assets/img/photos/pexels-pixabay-35967.jpg">
                                <img class="basis-1" src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">Nome do carro dois</p>
                            <button class="basis-1" type="button">Selecionar</button>
                        </article>

                        <article class="infosCar">
                            <a target="_blank" href="./assets/img/photos/pexels-pixabay-35967.jpg">
                                <img class="basis-1" src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">Nome do carro três</p>
                            <button class="basis-1" type="button">Selecionar</button>
                        </article>

                        <article class="infosCar">
                            <a target="_blank" href="./assets/img/photos/pexels-pixabay-35967.jpg">
                                <img class="basis-1" src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">Nome do carro três</p>
                            <button class="basis-1" type="button">Selecionar</button>
                        </article>

                        <article class="infosCar">
                            <a target="_blank" href="./assets/img/photos/pexels-pixabay-35967.jpg">
                                <img class="basis-1" src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">Nome do carro três</p>
                            <button class="basis-1" type="button">Selecionar</button>
                        </article>
                    </div>
                    <div class="buttonSubmit">
                        <button type="submit">Enviar Proposta</button>
                    </div>
                </div>
            </div>
        </section>
    `
}