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
                var oFReader = new FileReader();
                console.log(evt);
                oFReader.readAsDataURL(evt.target.files[0]);

                oFReader.onload = function (oFREvent) {
                    document.getElementById("pictureImage").src =
                        oFREvent.target.result;
                };
            });
    }
    submit() {
        this.btn.addEventListener("click", async () => {
            try {
                let _data = {
                    brand_id: this.brand.value,
                    model: this.model_name.value,
                    color: this.color.value,
                    description: this.description.value,
                };
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

            } catch (error) {
                console.log(error);
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
