import URL from "./url.js";
const api = new URL().apiUrl
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Hitoric{
    constructor(){
        this.arrayCarsHistoric = [
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
        this.listCarsHistoric()
    }
    listCarsHistoric() {
        console.log(this.arrayCarsHistoric.length)
        for(let i = 0; i < this.arrayCarsHistoric.length; i++) {
            console.log(i)
            document.getElementById('main').innerHTML += `
    <div class="cars_container">
        <header class="header_car">
            <p class="status">Troca Efetuada</p>
            <p class="date">${this.arrayCarsHistoric[i]['date']}</p>
            <p class="code_id">Cod: ${this.arrayCarsHistoric[i]['codeId']}</p>
        </header>
        <main class="main_car">
            <div class="car_1_exchange">
                <img class="car1_img" src="${this.arrayCarsHistoric[i]['car1Img']}"/>
                <p class="p1">${this.arrayCarsHistoric[i]['car1Description']}</p>
                <p class="p2">${this.arrayCarsHistoric[i]['user1']}</p>
                <p class="p3">Marca: ${this.arrayCarsHistoric[i]['car1Brand']}</p>
                <p class="p4">Cor: ${this.arrayCarsHistoric[i]['car1Color']}</p>
            </div>
            <div class="arrows"></div>
            <div class="car_2_exchange">
                <img class="car2_img" src="${this.arrayCarsHistoric[i]['car2Img']}" />
                <p class="p1">${this.arrayCarsHistoric[i]['car2Description']}</p>
                <p class="p2">${this.arrayCarsHistoric[i]['user2']}</p>
                <p class="p3">Marca: ${this.arrayCarsHistoric[i]['car2Brand']}</p>
                <p class="p4">Cor: ${this.arrayCarsHistoric[i]['car2Color']}</p>
            </div>
        </main>
    </div>`
        }
    }
}