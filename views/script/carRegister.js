import URL from "./url.js";
const api = new URL().apiUrl
import { router } from "../router.js";
import { logic } from "../logic.js";
class CarRegister {
    constructor() {
        this.model_name = document.querySelector("input#model_name");
        this.brand = document.querySelector("select#brand");
        this.color = document.querySelector("input#color");
        this.description = document.querySelector("textarea#description");
        this.file = document.querySelector('input[type="file"]#picture-input');
        this.btn = document.getElementById("submit");
        this.submit();
        this.listBrands();
        this.PreviewImage();
        this.upload();
    }

    async listBrands() {
        try{
            let res = await fetch(`${api}/api/brands`);
            let {data} = await res.json();
            for (let i = 0; i < data.length; i++) {
                this.brand.innerHTML += `<option value="${data[i].id}">${data[i].brand}<option/>`;
            }
            document.querySelectorAll('select#brand option').forEach(_el=>{
                if (!_el.value) {
                    _el.remove()
                }
            })
        }catch(err){
            console.log(err)
        }
    }
    PreviewImage() {
        document
            .getElementById("picture-input")
            .addEventListener("change", (evt) => {
                try{
                    var oFReader = new FileReader();
                    if(evt.target.files[0].size>307200){
                        throw 'Este Arquivo excedeu 300KB'
                    }
                    if(evt.target.files[0].type!="image/png" || evt.target.files[0].type!="image/jpeg"){
                        throw 'Este Arquivo precisa Ser um JPEG ou PNG'
                    }
                }catch(err){
                    let message = document.getElementById("message");
                    message.innerHTML = err;
                    document.getElementById("alert").style.display = "flex";
                    this.ClickError()
                }
                if(evt.target.files[0].size<=307200){
                    oFReader.readAsDataURL(evt.target.files[0]);
    
                    oFReader.onload = function (oFREvent) {
                        document.getElementById("pictureImage").src =
                            oFREvent.target.result;
                    };
                }
            });
    }
    ClickError() {
        document.getElementById("alert").addEventListener("click", () => {
            document.getElementById("alert").style.display = "none";
        });
    }
    submit() {
        this.btn.addEventListener("click", async () => {
            try {
                let erros = []
                if(this.model_name.value==0){
                    erros.push('model_name')
                }
                if(this.color.value==0){
                    erros.push('color')
                }
                if(this.description.value==0){
                    erros.push('description')
                }
                if(erros.length){
                    throw erros
                }
                let _data = {
                    brand_id: this.brand.value,
                    model: this.model_name.value,
                    color: this.color.value,
                    description: this.description.value,
                };
                if (this.file.files[0]) {
                    let res_text = await fetch(
                        `${api}/api/miniatures`,
                        {
                            method: "POST",
                            body: JSON.stringify(_data),
                            headers: { "Content-type": "application/json" },
                        }
                    );
                    let {data} = await res_text.json();
                    const formData = new FormData();
                    formData.append("file", this.file.files[0]);
                    let res_img = await fetch(
                        `${api}/api/miniatures/upload/${data}`,
                        {
                            method: "POST",
                            body: formData,
                        }
                    )
                    document.querySelector("#content").innerHTML = router("/");
                    logic("/");
                }else{
                    let message = document.getElementById("message");
                    message.innerHTML = 'Adicione uma Imagem';
                    document.getElementById("alert").style.display = "flex";
                    this.ClickError()
                }

            } catch (error) {
                console.log(error);
                if(Object.prototype.toString.call(error) === '[object Array]'){
                    document.querySelectorAll('.leftSide label').forEach((_el)=>{
                        _el.classList.remove("erro");
                    })
                    for(let i=0; i<error.length;i++){
                        document.querySelector(`label[for=${error[i]}]`).classList.add("erro");
                    }
                }
            }
        });
    }
    upload() {
        document.getElementById("upload").addEventListener("click", () => {
            const formData = new FormData();
            const fileField = document.querySelector(
                'input[type="file"]#picture-input'
            );
            formData.append("file", fileField.files[0]);
            fetch(
                `${api}/api/miniatures/upload/${sessionStorage.id_miniature}`,
                {
                    method: "POST",
                    body: formData,
                }
            )
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => console.log(err));
        });
    }
}
export default CarRegister;
