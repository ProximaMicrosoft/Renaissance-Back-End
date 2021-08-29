import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs';
import path from 'path'

export class ServidorImage {

    async enviarArquivoServidorImagem(arquivo: string): Promise<String> {
        const form = new FormData()
        try {
            form.append('image', fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'uploads', arquivo)));
        } catch (err) {
            console.log(err)
        }
        console.log(form)
        try {
            var response = await axios.post("http://localhost:3000/enviararquivo", form, {
                headers: {
                    "Content-Type": `multipart/form-data;boundary=MyBoundary`,
                }
            })
            return response.data
        } catch (err) {
            console.log(err)
        }

    }
}