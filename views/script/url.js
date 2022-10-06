
export default class Url{
    #apiUrl

    constructor (_url){
        this.#apiUrl = _url;
    }

    get apiUrl()  {
        return this.#apiUrl;
    }
}