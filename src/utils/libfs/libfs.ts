import { unlink } from 'fs/promises';
import path from 'path';

export class LibFs {

    async apagaArquivo(name: string): Promise<Boolean> {
        try {
            await unlink(path.resolve(__dirname, '..', '..', '..', 'uploads', name))
            console.log('excluido do diretório')
            return true
        } catch (error) {
            console.error('there was an error:', error.message)
            return false
        }
    }
}