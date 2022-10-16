import axios from 'axios'
const baseUrl = '/categories'

const getCategories = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getSubcategories = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export { getCategories, getSubcategories }