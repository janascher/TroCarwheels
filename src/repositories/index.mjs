import  Users  from './Users.mjs';

export default class Repositories{
	#users
	#db
	constructor (db){
		this.#db = db;
		this.#users = new Users(this.#db);
	}


	get users(){
		return this.#users;
	} 
}
