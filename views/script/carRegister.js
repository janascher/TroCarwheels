class CarRegister {
    constructor() {
        this.model_name = document.querySelector("input#model_name");
        this.brand = document.querySelector("select#brand");
        this.color = document.querySelector("input#color");
        this.description = document.querySelector("textarea#description");
        this.btn = document.getElementById("submit");
        this.submit();
        this.listBrands();
        this.PreviewImage();
        this.upload();
    }

    listBrands(){
        fetch('http://localhost:8000/api/brands')
        .then((res)=>{
            return res.json()
        })
        .then(({data})=>{
            data.forEach((_el)=>{
                this.brand.innerHTML+=`<option value="${_el.id}">${_el.brand}<option/>`
            })
        })
        .catch(err=>console.log(err))
    }
    PreviewImage() {
        document.getElementById("picture-input").addEventListener("change",(evt)=>{
            var oFReader = new FileReader();
            console.log(evt)
            oFReader.readAsDataURL(evt.target.files[0]);
    
            oFReader.onload = function (oFREvent) {
                document.getElementById("pictureImage").src = oFREvent.target.result;
            };
        })
    };
    submit() {
        this.btn.addEventListener("click", async () => {
            try {
                let _data = {
                    brand_id: this.brand.value,
                    model: this.model_name.value,
                    color: this.color.value,
                    description: this.description.value,
                };
                await fetch("http://localhost:8000/api/miniatures", {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: { "Content-type": "application/json" },
                })
                    .then((response) => response.json())
                    .then(({data}) => {
                        sessionStorage.id_miniature=data
                    })
                    .catch((err) => console.log(err));
            } catch (error) {
                console.log(error);
                error.forEach((err) => {
                    this[err].classList.add("erro");
                    setInterval(() => {
                        this[err].classList.remove("erro");
                    }, 5000);
                });
            }
        });
    }
    upload(){
        document.getElementById("upload").addEventListener("click",()=>{
            const formData = new FormData();
            const fileField = document.querySelector('input[type="file"]#picture-input');
            formData.append("file", fileField.files[0]);
            fetch(`http://localhost:8000/api/miniatures/upload/${sessionStorage.id_miniature}`,{
                method: 'POST',body: formData
            }).then (response => {
                console.log(response)
            }).catch(err=>console.log(err))
        })
    }
}
export default CarRegister;
