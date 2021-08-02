import { Reservas, ReservaJoin, ReservaJoinResponse, DiasHorariosIndiponiveis } from '../../models/reservas';
import { ACADEMIA, BRINQUEDOTECA, CAMPINHO, DECK, PISCINA, QUADRA, SALAODEJOGOS, SALOESDEFESTAS } from '../../constants/constantes';

//adicionar metodo de validacao para nao permitir dias anteriores
//melhorar a validacao para espacos onde tem um dia para permitir cadastrar so por dia
export class ValidacoesReserva {
    verificaHorario(espaco: String, horario: number): [string, Error] {
        if (espaco == "ACADEMIA") {
            return this.verificaFachaTempo(5, 23, horario)
        }
        else if (espaco == "PISCINA") {
            return this.verificaFachaTempo(6, 22, horario)
        }
        else if (espaco == "BRINQUEDOTECA") {
            return this.verificaFachaTempo(7, 22, horario)
        }
        else if (espaco == "CAMPINHO") {
            return this.verificaFachaTempo(7, 22, horario)
        }
        else if (espaco == "QUADRA") {
            return this.verificaFachaTempo(7, 22, horario)
        }
        else if (espaco == "SALÃO DE JOGOS") {
            return this.verificaFachaTempo(7, 22, horario)
        }
        else if (espaco == "DECK") {
            return this.verificaFachaTempo(8, 22, horario)
        }
        else if (espaco == "SALÕES DE FESTAS A/B/C") {
            return this.verificaFachaTempo(8, 23, horario)
        }


    }
    //recebe data estilo 12/10/2021 e hora estilo 1,2,3,5
    montarData(data: String, hora: number): string {
        var datacompleta
        var dataagora = data.split("/")[2] + "-" + data.split("/")[1] + "-" + data.split("/")[0]
        var horaagora
        if (hora == 1 || hora == 2 || hora == 3 || hora == 4 || hora == 5 ||
            hora == 6 || hora == 7 || hora == 8 || hora == 9
        ) {
            horaagora = "0" + String(hora)
        } else {
            horaagora = String(hora)
        }
        console.log("horagora" + horaagora)
        datacompleta = dataagora + "T" + horaagora + ":" + "00" + ":00"
        return datacompleta
    }
    //recebe 2021-07-22T23:00:00.000Z
    desmontaData(horario: Date): [string, string] {
        var horariostring = horario.toISOString().split("T")
        var data = (horariostring[0]).split("-")[2] + "/" + (horariostring[0]).split("-")[1] + "/"
            + (horariostring[0]).split("-")[0]
        var horarioseparado = horariostring[1].split(":")[0]
        return [horarioseparado, data]
    }

    passandoReservaJoinParaReservaJson(reservaslista: ReservaJoin[]): ReservaJoinResponse[] {
        var listajoinresponse = [] as ReservaJoinResponse[]
        for (var i = 0; i < reservaslista.length; i++) {
            var lista = <ReservaJoinResponse>{}
            var [horario, data] = this.desmontaData(new Date(reservaslista[i].horario))
            lista.id = reservaslista[i].id
            lista.data = data
            lista.horario = Number(horario)
            lista.name = reservaslista[i].name
            listajoinresponse.push(lista)
        }
        return listajoinresponse
    }

    verificaFachaTempo(horarioinicial: number, horariofinal: number, horarioenviado: number): [string, Error] {
        for (var i = horarioinicial; i <= horariofinal; i++) {
            if (horarioenviado == i) {
                return ["horário permitido", null]
            }
        }
        return ["horario nao permitido", new Error("horario nao permitido")]
    }

    //verifica se a quantidade de reservas por espaco é grande ou menor
    async verificaSeQuantidadeDeRegistroUltrapassaUnidadeTempo(espaco: string, data: string, horario: number, espaco_id: number): Promise<boolean> {

        const reservas = new Reservas()
        var numerolimite: number
        var listas: [String, number][]
        listas = [["ACADEMIA", ACADEMIA], ["PISCINA", PISCINA], ["BRINQUEDOTECA", BRINQUEDOTECA], ["CAMPINHO", CAMPINHO],
        ["QUADRA", QUADRA], ["SALÃO DE JOGOS", SALAODEJOGOS], ["DECK", DECK], ["SALAO DE FESTA", SALOESDEFESTAS]]
        listas.forEach(async function (lista) {
            if (lista[0] == espaco) {
                numerolimite = lista[1]
            }
        })
        var dataformatada = this.montarData(data, horario)
        console.log(dataformatada)
        var [numero, errorqtd] = await reservas.VerificaQuantidadeReservaPorData(dataformatada, espaco, espaco_id)
        if (numero < numerolimite) {
            return false
        } else {
            return true

        }
    }

    montaObjetoDiasHorariosIndiponiveis(reservas: Reservas[]): DiasHorariosIndiponiveis[] {

        var lista = <DiasHorariosIndiponiveis[]>{}
        lista = []
        var horariodisponivel = <DiasHorariosIndiponiveis>{}
        horariodisponivel.horariosindiponiveis = []

        reservas.forEach((reserva, index) => {
            var [horarioseparado, data] = this.desmontaData(new Date(reserva.horario))

            if (index == 0) {
                horariodisponivel.horario = data

                if (horariodisponivel.horariosindiponiveis.includes(Number(horarioseparado)) == false) {
                    horariodisponivel.horariosindiponiveis.push(Number(horarioseparado))
                }
                lista.push(horariodisponivel)
                horariodisponivel = <DiasHorariosIndiponiveis>{}
            } else {
                if (lista[(lista.length) - 1].horario == data) {
                    lista[(lista.length) - 1].horario = data
                    //verificando se horario ja existe no array
                    if (lista[(lista.length) - 1].horariosindiponiveis.includes(Number(horarioseparado)) == false) {
                        lista[(lista.length) - 1].horariosindiponiveis.push(Number(horarioseparado))
                    }
                    console.log(lista)
                } else {
                    horariodisponivel = <DiasHorariosIndiponiveis>{}
                    console.log(lista)
                    horariodisponivel.horario = data
                    console.log(lista)
                    horariodisponivel.horariosindiponiveis = []
                    if (horariodisponivel.horariosindiponiveis.includes(Number(horarioseparado)) == false) {
                        horariodisponivel.horariosindiponiveis.push(Number(horarioseparado))
                    }
                    lista.push(horariodisponivel)
                }

            }

        })
        return lista
    }

    async verificandoRealmenteSeHorarioEstaIndiponivel(listas: DiasHorariosIndiponiveis[], nomespaco: string, idespaco: number) {
        var listadepois = <DiasHorariosIndiponiveis[]>{}

        listadepois = []
        var object = <DiasHorariosIndiponiveis>{}
        object.horariosindiponiveis = []

        for (var i = 0; i < listas.length; i++) {
            for (var t = 0; t < listas[i].horariosindiponiveis.length; t++) {
                var booleano = await this.verificaSeQuantidadeDeRegistroUltrapassaUnidadeTempo(nomespaco, listas[i].horario,
                    listas[i].horariosindiponiveis[t], idespaco)
                if (booleano) {
                    object.horario = listas[i].horario
                    if (object.horariosindiponiveis.includes(listas[i].horariosindiponiveis[t]) == false) {
                        object.horariosindiponiveis.push(listas[i].horariosindiponiveis[t])
                    }
                }

            }

            if (object.horariosindiponiveis.length > 0) {
                listadepois.push(object)
                console.log(listadepois)
                object = <DiasHorariosIndiponiveis>{}
                object.horariosindiponiveis = []
            }

        }
        return listadepois
    }



    // verificaDentroArrayRegraDeUnidade(array: DiasHorariosIndiponiveis[], espaco: string): DiasHorariosIndiponiveis[] {


    // }

}