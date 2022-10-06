class Home{
    constructor(){
        this.ctn = document.getElementById("home_cars_container");
        this.test()
        this.listMiniatures()
    }
    async test(){
        fetch("http://localhost:8000/api/miniatures")
        .then(res=>res.json())
        .then(({data})=>console.log(data))
        .catch(err=>console.log(err))
    }
    listMiniatures(){
        fetch("http://localhost:8000/api/miniatures")
        .then(res=>res.json())
        .then(({data})=>{
            this.ctn.innerHTML = ""
            data.forEach(({link,model,nick})=>{
                console.log(this.ctn)
                this.ctn.innerHTML += `<div class="cars" id="car_container1">
                    <img class="car_images" id="car_one" style="background:url(./uploads/${link});background-repeat:no-repeat;
                    background-size:contain;
                    background-position:center;">
                    <div class="card_cars">
                        <h1>${model}</h1>
                        <p>@${nick}</p>
                    </div>
                </div>`

            })
        })
        .catch(err=>console.log(err))
        this.ctn
    }
}
export default Home;