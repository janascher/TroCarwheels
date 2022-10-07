export default function carRegistration() {
    return `
        <section class="container">
            <h1>Cadastre seu carro miniatura</h1>
            
            <div class="grid">
                <div class="leftSide">
                    <div class="form">  
                        <div class="input">
                            <input type="text" name="model_name" id="model_name" placeholder="" />
                            <label for="model_name">Modelo:</label>
                        </div>
                        <div class="select">
                            <label for="brand">Marca:</label>
                            <select name="brand" id="brand"></select>
                        </div>
                        <div class="input">
                            <input type="text" name="color" id="color" placeholder="" />
                            <label for="color">Cor:</label>
                        </div>
                        <div class="inputTextarea">
                            <label for="description">Descrição:</label>
                            <textarea name="description" id="description" cols="50" rows="1" placeholder=""></textarea>   
                        </div>                    
                        <button id="submit">Enviar</button>
                    </form>
                </div>

                <div class="rightSide">
                    <div class="form">
                        <label class="picture" for="picture-input" tabindex="0">
                            <img id="pictureImage"></img>
                        </label>
                        <input type="file" name="picture-input" accept="image/*" id="picture-input">
                    </div>
                </div>
            </div>
        </section>
    `
}