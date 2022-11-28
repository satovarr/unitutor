import axios from 'axios'
const baseUrl = 'https://unitutor-production.up.railway.app/categories'

const getCategories = async () => {
    let response = await axios.get(baseUrl)
    return response.data
}

const getSubcategories = async (id) => {
    let response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getCategorybyId = async (id) => {
    let response = await axios.get(`https://unitutor-production.up.railway.app/category/name/${id}`)
    return response.data
}

const getSubcategorybyId = async (id) => {
    let response = await axios.get(`https://unitutor-production.up.railway.app/subcategory/name/${id}`)
    return response.data
}

export { getCategories, getSubcategories, getCategorybyId, getSubcategorybyId }