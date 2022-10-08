
export default class Url{
    #apiUrl

    constructor (){
        this.#apiUrl = 'http://localhost:8000';
    }

    get apiUrl()  {
        return this.#apiUrl;
    }
}