export class DataRetorna {
    retornaDataHoje(): [String, String] {
        let data = new Date();
        const datapadrao = data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + ((data.getDate()))
        const datainicial = datapadrao + " 00:00:00+00"
        const datafinal = datapadrao + " 23:59:00+00"
        return [datainicial, datafinal]
    }
}