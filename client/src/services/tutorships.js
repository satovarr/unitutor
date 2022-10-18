import axios from 'axios'
const baseUrl = '/tutorships'

const createTutorship = async (payload) => {
    //Creates a tutorship, returns true if creation succeded,
    //or false otherwise
    try {
        await axios.post('/create-tutorship', payload)
        return true
    }
    catch (error) {
        return false
    }
}

const searchTutorships = async (params) => {
    //Searches tutorships with given parameters (must be in string format)
    try {
        let response = await axios.get(baseUrl+'/search'+params)
        return response.data
    }
    catch {
        return null
    }
}

const getTutorshipbyId = async (tutorship_id) => {
    try {
        let response = await axios.get(baseUrl + '/view/' + tutorship_id)
        return response.data
    }
    catch {
        return null
    }
}

export { createTutorship, searchTutorships, getTutorshipbyId }