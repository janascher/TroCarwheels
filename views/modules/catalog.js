export default function catalog() {
    return `
        <section id="exchange">
            <div id="title_container">
                <h1 id="title">Anúncios</h1>
                <div id="search_container">
                    <input id="searchInput" type="text" placeholder="Buscar produto...">
                    <img src="../assets/img/catalog/MagnifyingGlass.svg" id="search_img" alt="Buscar"/>    
                </div>
            </div>
            <section id="cars_container">
                <div id="cars"></div>
            </section>
        </section>
    `
}