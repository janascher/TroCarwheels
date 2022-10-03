import  Users  from './Users.mjs';
import  Miniatures  from './Miniatures.mjs';
import  Cart  from './Cart.mjs';
import  Exchanges  from './Exchanges.mjs';

export default class Repositories{
	#users
	#cart
	#miniatures
	#exchanges
	#db
	
	constructor (db){
		this.#db = db;
		this.#users = new Users(this.#db);
		this.#miniatures = new Miniatures(this.#db);
		this.#cart = new Cart(this.#db);
		this.#exchanges = new Exchanges(this.#db);
	}

	get users(){
		return this.#users;
	} 

	get miniatures(){
		return this.#miniatures;
	} 

	get cart(){
		return this.#cart;
	} 

	get exchanges(){
		return this.#exchanges;
	} 

}
