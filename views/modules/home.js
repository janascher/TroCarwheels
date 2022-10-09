export default function home() { 
    return `
        <section id="home" class="containerHome">
            <div id="home_img_container">
                <img src="./assets/img/home/image-home.jpg" alt="Figura de um carro!" id="car_img"/>
            </div>
            <h1 id="home_title"> Seja Bem-vindo ao</h1>
            <h2 id="home_title2"> Tro<span>Car</span>Wheels</h2>
            <p id="home_p1"> Colecionadores, amadores e amantes de carro miniatura são todos bem-vindos.</p>
            <p id="home_p2"> Troque seus carros exclusivos e raros.</p>
            <div id="home_black_lines">
                <div id="home_red_line"></div>
            </div>

            <section id="home_cars_container">
                <div class="card" id="car_container1">
                    <img class="card_images" id="card_one" />  
                    <div class="card_cars">
                        <h1>Carro miniature</h1>
                        <p>@alfredo</p>
                        <button id="publish">Trocar</button>
                    </div>
                </div>
            </section>

            <section class="containerGallery">
                <a class="galleryItens" href="./assets/img/home/card-image-car1.png">
                    <img src="./assets/img/home/card-image-car1.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car2.png">
                    <img src="./assets/img/home/card-image-car2.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car3.png">
                    <img src="./assets/img/home/card-image-car3.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car4.png">
                    <img src="./assets/img/home/card-image-car4.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car5.png">
                    <img src="./assets/img/home/card-image-car5.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car6.png">
                    <img src="./assets/img/home/card-image-car6.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car7.png">
                    <img src="./assets/img/home/card-image-car7.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car8.png">
                    <img src="./assets/img/home/card-image-car8.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car9.png">
                    <img src="./assets/img/home/card-image-car9.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car10.png">
                    <img src="./assets/img/home/card-image-car10.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car11.png">
                    <img src="./assets/img/home/card-image-car11.png" alt="Animal1">
                </a>
                <a class="galleryItens" href="./assets/img/home/card-image-car12.png">
                    <img src="./assets/img/home/card-image-car12.png" alt="Animal1">
                </a>        
            </section>
            
            <section id="info">
                <div id="info_container">
                    <div>
                        <p><span class="icons" id="phone_icon"></span> <span class="align_center fontContact">NOSSO TELEFONE</span></p>
                        <p>(11) 3333.3333 | (11) 3333.3333</p>
                    </div>
                    <div class="border_white"></div>
                    <div>
                        <p><span class="icons" id="mail_icon"></span> <span class="align_center fontContact">NOSSO EMAIL</span></p>
                        <p>contato@meusite.com.br</p>
                    </div>
                    <div class="border_white"></div>
                    <div>
                        <p><span class="icons" id="clock_icon"></span> <span class="align_center fontContact">NOSSOS HORÁRIOS</span></p>
                        <p>Segunda a Sexta, das 08:30h as 18:00h</p>
                    </div>
                </div>
            </section>
        </section>
    `
}