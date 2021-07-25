export class DataRetorna {
    retornaDataHoje(): [String, String] {
        let data = new Date();
        const datapadrao = data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + ((data.getDate()))
        const datainicial = datapadrao + " 00:00:00+00"
        const datafinal = datapadrao + " 23:59:00+00"
        return [datainicial, datafinal]
    }
    //12/10/2012 recebe datadestejeito
    recebeDataRetornaDataInicialEFinal(data: string): [String, String] {
        var dataaocontrario = data.split("/")[2] + "-" + data.split("/")[1] + "-" + data.split("/")[0]
        const datainicial = dataaocontrario + " 00:00:00+00"
        const datafinal = dataaocontrario + " 23:59:00+00"
        return [datainicial, datafinal]
    }
}