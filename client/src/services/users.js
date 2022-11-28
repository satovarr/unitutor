import axios from 'axios'

const getUserbyPublicId = async (public_id) => {
    try {
        let response = await axios.get('https://unitutor-production.up.railway.app/profile_user/info/'+public_id)
        return response.data
    }
    catch {
        return null
    }
}

//returns true if creation succeeded and false otherwise
const createUser = async (payload) => {
    try {
        await axios.post('https://unitutor-production.up.railway.app/create-user', payload)
        return true
    }
    catch {
        return false
    }
}

const getUserPublicId = async (tokenObject) => {
    try {
        let response = await axios.post('https://unitutor-production.up.railway.app/public-user', tokenObject)
        return response.data
    }
    catch {
        return null
    }
}

export { getUserbyPublicId, createUser, getUserPublicId }