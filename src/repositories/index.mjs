import  Users  from './Users.mjs';
import  Miniatures  from './Miniatures.mjs';

export default class Repositories{
	#users
	#miniatures
	#db
	
	constructor (db){
		this.#db = db;
		this.#users = new Users(this.#db);
		this.#miniatures = new Miniatures(this.#db);
	}

	get users(){
		return this.#users;
	} 

	get miniatures(){
		return this.#miniatures;
	} 
}
