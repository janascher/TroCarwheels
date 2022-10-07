let mainCars = document.querySelector('#main');

let arrayCarsHistoric = [
{
    codeId: 55,
    date: '10/10/2022',
    car1Img: './assets/img/home/car_1.jpg',
    car1Description: 'Carro azul do gelo',
    car1Brand: 'Ford',
    car1Color: 'Azul',
    user1: '@CarlosSilva',
    car2Img: './assets/img/home/car_3.jpg',
    car2Description: 'Carro 2',
    car2Brand: 'Volkswagem',
    car2Color: 'Vermelho',
    user2: '@PedroAlves',
},
{
    codeId: 22,
    date: '09/10/2022',
    car1Img: './assets/img/home/car_2.jpg',
    car1Description: 'Descrição generica',
    car1Brand: 'Toyota',
    car1Color: 'Branco',
    user1: '@UserOne',
    car2Img: './assets/img/home/car_4.jpg',
    car2Description: 'Carro 6 Descrição',
    car2Brand: 'Fiat',
    car2Color: 'Amarelo',
    user2: '@UserGeneric',
}
]

function listCarsHistoric() {
    for (let i = 0; i < arrayCarsHistoric.length; i++) {
        mainCars.innerHTML += `
<div class="cars_container">
    <header class="header_car">
        <p class="status">Troca Efetuada</p>
        <p class="date">${arrayCarsHistoric[i]['date']}</p>
        <p class="code_id">Cod: ${arrayCarsHistoric[i]['codeId']}</p>
    </header>
    <main class="main_car">
        <div class="car_1_exchange">
            <img class="car1_img" src="${arrayCarsHistoric[i]['car1Img']}"/>
            <p class="p1">${arrayCarsHistoric[i]['car1Description']}</p>
            <p class="p2">${arrayCarsHistoric[i]['user1']}</p>
            <p class="p3">Marca: ${arrayCarsHistoric[i]['car1Brand']}</p>
            <p class="p4">Cor: ${arrayCarsHistoric[i]['car1Color']}</p>
        </div>
        <div class="arrows"></div>
        <div class="car_2_exchange">
            <img class="car2_img" src="${arrayCarsHistoric[i]['car2Img']}" />
            <p class="p1">${arrayCarsHistoric[i]['car2Description']}</p>
            <p class="p2">${arrayCarsHistoric[i]['user2']}</p>
            <p class="p3">Marca: ${arrayCarsHistoric[i]['car2Brand']}</p>
            <p class="p4">Cor: ${arrayCarsHistoric[i]['car2Color']}</p>
        </div>
    </main>
</div>`
    }
}
listCarsHistoric()
