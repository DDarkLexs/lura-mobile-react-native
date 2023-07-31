import {UserRepository} from '../database/repository/usuario';
import {LocalAccount} from './storage';
import {
    insertUser,
    loginInUser,
    getUser,
    updateAuthorization,
} from '../api/usuario';
import moment from 'moment';
import {SetorController} from './setor';
import {ArtigoController} from './artigo';
import {ValidadeController} from './validade';
const localStore = new LocalAccount();
const userRepo = new UserRepository();
export class UserController extends UserRepository {
    constructor() {
        super();
        this.localAccount = new LocalAccount();
    }
    loginUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                // await loginInUser(user.telefone,user.senha)
                // await this.localAccount.storeAccount(token)
                const response = await this.getUserByIdUsuario(user.id_usuario);

                if (response) {
                    await this.localAccount.storeAccount(response);
                } else {
                    await this.insertNewUser(user);
                    await this.localAccount.storeAccount(user);
                }
                // const response = (await this.authUser({ telefone, senha }))
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }

    loginOffline(telefone, senha) {
        return new Promise(async (resolve, reject) => {
            try {
                // await loginInUser(user.telefone,user.senha)
                // await this.localAccount.storeAccount(token)
                const response = await this.authUser(telefone, senha);

                await this.localAccount.storeAccount(response);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    async signInOffline(form) {
        return new Promise(async (resolve, reject) => {
            try {
                form.datacad = moment().format();
                const account = await this.insertNewUser(form);
                resolve(account);
            } catch (error) {
                reject(error.message);
            }
        });
    }

    async signInOnline(form) {
        return new Promise(async (resolve, reject) => {
            try {
                const account = await insertUser(form);
                await this.insertNewUser(account);
                // await this.localAccount.storeAccount(account)
                resolve(account);
            } catch (error) {
                // reject(error)
                reject(error.message);
            }
        });
    }

    async logInOnline(telefone, senha) {
        return new Promise(async (resolve, reject) => {
            try {
                const {token} = await loginInUser(telefone, senha);
                await this.localAccount.storeToken(token);
                updateAuthorization(token);
                const user = await getUser(telefone, senha);

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }
    getUsuario() {
        return new Promise(async (resolve, reject) => {
            try {
                const {id_usuario} = await localStore.getAccount();
                const user = await userRepo.getUserByIdUsuario(id_usuario);
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }
    getUsuarioOnline() {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await getUser();
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateUsuario(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const item = await localStore.getAccount();
                await userRepo.updateUser(user, item.id_usuario);

                resolve('Sucesso');
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    proceedBackup() {
        return new Promise(async (resolve, reject) => {
            try {
                /* usuario ======================================*/
                let user = await this.getUsuarioOnline();
                console.log( user )
                
                if(!user){
                    user = await this.getUsuario()
                    user = await insertUser({
                        nome:user.nome,
                        telefone:user.telefone,
                        senha:user.senha,
                    })

                    resolve('terminando a sessão!')
                    console.log('does not exists')
                }

                /* seccao =======================================*/
                const setorCtrl = new SetorController();
                const setores = await setorCtrl.getAll(user.id_usuario);

                /* artigo ==================================*/
                const artigoCtrl = new ArtigoController();
                const artigos = await artigoCtrl.getAllartigoByIdUsuario(
                    user.id_usuario,
                );

                /* notaDeArtigo ==========================*/
                const notaDeArtigos =
                    await artigoCtrl.getAllNotaDeArtigoByIdUsuario(
                        user.id_usuario,
                    );
                /* validade ============================ */
                const valCtrl = new ValidadeController();
                const validades = await valCtrl.getAllByOneUser(
                    user.id_usuario,
                );

                // console.log(validades);

                resolve('Seus dados foram salvo na nuvem!');
            } catch (error) {
                reject(error);
            }
        });
    }
}
