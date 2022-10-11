
export default class Url{
    #apiUrl

    constructor (){
        this.#apiUrl = 'https://trocarwheels.zapto.org';
    }

    get apiUrl()  {
        return this.#apiUrl;
    }
}