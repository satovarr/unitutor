import axios from 'axios'

const createTutorship = async (payload) => {
    //Creates a tutorship, returns true if creation succeded,
    //or false otherwise
    try {
        await axios.post('/create-tutorship', payload)
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

export { createTutorship }