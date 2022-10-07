export default function historic() {
    return `
    <section id="historic">
        <header id="historic_header">
            <h1 id="header_title">Histórico de Transações</h1>
            <div id="select_container">
                <select id="select">
                    <option value="last_month">Último Mês</option>
                    <option value="last_year">Último Ano</option>
                </select>
            </div>
        </header>
        <div id="white_space"></div>
        <main id="main">
            
        </main>
    </section>
    <script type="module" src="historic.js" defer></script>
    `
}