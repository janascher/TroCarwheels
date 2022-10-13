export default function historic() {
    return `
        <section id="historic">
            <div id="historic_header">
                <h1 id="header_title">Histórico de Transações</h1>
                <div id="select_container">
                    <select id="select">
                        <option value="month">Último Mês</option>
                        <option value="year">Último Ano</option>
                    </select>
                </div>
            </div>
            <section id="main"></section>
        </section>
    `
}