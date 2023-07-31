import axiosIns from '../config/axios'

export const insertUser = (item) => {
    return new Promise(async (resolve,reject) => {
        try {
            const response = (await axiosIns.post('/usuario',{ ...item })).data
            resolve(response)
        } catch (error) {
            reject(error)
        }

    })
}


export const loginInUser = (telefone, senha) => {
    return new Promise(async (resolve,reject) => {
        try {
            const response = (await axiosIns.post('/auth/login',
            { telefone, senha })).data
            resolve(response)
        } catch (error) {
            reject(error.message)
        }

    })
}

export const getUser = () => {
    return new Promise(async (resolve,reject) => {
        try {
            const response = (await axiosIns.get('/usuario/id_usuario')).data
            resolve(response)
        } catch (error) {
            reject(error.message)
        }

    })
}


export const updateAuthorization = (token) => {
    return axiosIns.defaults.headers.common['Authorization'] = `Bearer ${token}`
}