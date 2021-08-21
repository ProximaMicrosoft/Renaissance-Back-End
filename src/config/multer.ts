import multer from 'multer';
import path from 'path';
import crypto from 'crypto';


export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');
            const filename = `${hash}-${ajeitaEspaco(file.originalname)}`;
            callback(null, filename);
        }
    }),
};

function ajeitaEspaco(originalname: string): string {
    var array = originalname.split(" ")
    var nomenovo = ""
    for (var i = 0; i < array.length; i++) {
        nomenovo = nomenovo + "_" + array[i]
    }
    return nomenovo
}