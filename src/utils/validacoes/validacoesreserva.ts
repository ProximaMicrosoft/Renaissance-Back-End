


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

    verificaFachaTempo(horarioinicial: number, horariofinal: number, horarioenviado: number): [string, Error] {
        for (var i = horarioinicial; i <= horariofinal; i++) {
            if (horarioenviado == i) {
                return ["horário permitido", null]
            }
        }
        return ["horario nao permitido", new Error("horario nao permitido")]
    }

}