// import crypto from 'crypto'

// export class Criptografia {

//     gerarSalt(): String {
//         return crypto.randomBytes(Math.ceil(32 / 2))
//             .toString('hex')
//             .slice(0, 16);
//     }

//     sha512(senha, salt) {
//         var hash = crypto.createHmac('sha512', salt); // Algoritmo de cripto sha512
//         hash.update(senha);
//         var hash2 = hash.digest('hex');
//         return {
//             salt,
//             hash2,
//         };
//     };

//     login(senhaDoLogin, saltNoBanco, hashNoBanco) {
//         var senhaESalt = this.sha512(senhaDoLogin, saltNoBanco)
//         return hashNoBanco === senhaESalt.hash;
//     }


// }