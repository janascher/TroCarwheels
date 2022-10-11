export default function Confirmation() {
    return `
        <section class="containerConfirme"> 
            <h1>Confirmação das propostas</h1>  

            <div class="gridSelect">        
                <div class="leftSelect">
                    <img id="imageCar" src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                    <h3 id="nomeCar">Nome do carro</h3>
                    <div class="infos padding">
                        <p>Disponibilizado para troca por:</p>
                        <p class="nameUser">Nome do usuário</p>
                    </div>
                    <div class="infos borderTop paddingBorder">
                        <h4>Cor:</h4>
                        <p id="colorCar">Verde</p>
                    </div>
                    <div class="description borderTop paddingBorder">
                        <h4>Detalhes do produto:</h4>
                        <p id="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam architecto atque expedita cupiditate ad aliquid recusandae mollitia accusantium.</p>
                    </div>
                </div>

                <div class="rightSelect">  
                    <p class="text">Selecione um carro para realizar a troca:</p>
                    <div class="carSelection">

                        <article class="infosCar">
                            <a target="_blank" href="./assets/img/photos/pexels-pixabay-35967.jpg">
                                <img class="basis-1" src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">Nome do carro</p>
                            <button class="basis-1" type="button">Selecionar</button>
                        </article>

                        <div class="buttonSubmit">
                            <button type="submit">Confirmar Troca</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
}