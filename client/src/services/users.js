import axios from 'axios'

const getUserbyPublicId = async (public_id) => {
    try {
        let response = await axios.get('/profile_user/info/'+public_id)
        return response.data
    }
    catch {
        return null
    }
}

//returns true if creation succeeded and false otherwise
const createUser = async (payload) => {
    try {
        await axios.post('/create-user', payload)
        return true
    }
    catch {
        return false
    }
}

const getUserPublicId = async (tokenObject) => {
    try {
        let response = await axios.post('/public-user', tokenObject)
        return response.data
    }
    catch {
        return null
    }
}

export { getUserbyPublicId, createUser, getUserPublicId }