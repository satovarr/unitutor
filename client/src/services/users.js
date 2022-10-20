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

export { getUserbyPublicId }