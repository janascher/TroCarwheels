export default function infoCar() {
    return `
        <section class="container"> 
            <h1>Detalhes do carro miniatura</h1>

            <div class="gridInfoCar">
                <div class="leftImage">
                <img src="./assets/img/photos/pexels-pixabay-35967.jpg" alt="Fotografia" />
                </div>

                <div class="rightInfo">
                    <h3>Nome do carro</h3>
                    <span>@usuário</span>
                    <div class="infoColor">
                        <h4>Cor:</h4>
                        <p>Verde</p>
                    </div>
                    <div class="description">
                        <h4>Descrição:</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dignissimos cum explicabo blanditiis exercitationem? Suscipit, nulla. Ut eaque amet iste, quasi provident, explicabo fuga dolorem magnam, cupiditate autem incidunt vel!</p>
                    </div>
                    <div>
                        <button>Trocar Agora</button>
                    </div>
                </div>
            </div>
        </section>    
    `
}