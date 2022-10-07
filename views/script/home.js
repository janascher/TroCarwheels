import { router } from "../router.js";
import { logic } from "../logic.js";
class Home{
    constructor(){
        this.ctn = document.getElementById("home_cars_container");
        this.pub = document.querySelectorAll("button#publish");
        this.cookies = document.cookie.split("; ").reduce((prev, current) => {
            const [name, ...value] = current.split("=");
            prev[name] = value.join("=");
            return prev;
        }, {});
        this.listMiniatures()
    }
    publish(){
        document.querySelectorAll("button#publish").forEach(el=>{
            el.addEventListener('click', function(_evt){
                console.dir(_evt.target.dataset.id)
                let _data = {
                    user_id: localStorage.user_id, 
                    miniature_id: _evt.target.dataset.id
                }
                fetch("http://localhost:8000/api/miniatures/makeavailable/", {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: { "Content-type": "application/json" },
                })
            })
        })
    }
    async listMiniatures(){
        try{
            if(this.cookies.auth){
                let res = await fetch("http://localhost:8000/api/miniatures/own/user")
                let {data} = await res.json()
                    document.getElementById("home_cars_container").innerHTML = ""
                    data.forEach(function({id,link,model,nick}){
                        document.getElementById("home_cars_container").innerHTML += `<div class="cars" id="car_container1">
                        <img class="car_images" id="car_one" style="background:url(./uploads/${link});background-repeat:no-repeat;
                        background-size:contain;
                            background-position:center;">
                            <div class="card_cars">
                                <h1>${model}</h1>
                                <p>@${nick}</p>
                                <button id="publish" data-id="${id}">TROCAR</button>
                            </div>
                        </div>`
                    })
            }
            this.publish()
        }
        catch(err){console.log(err)}
    }
}
export default Home;