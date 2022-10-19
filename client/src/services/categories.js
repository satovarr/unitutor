import axios from 'axios'
const baseUrl = '/categories'

const getCategories = async () => {
    let response = await axios.get(baseUrl)
    return response.data
}

const getSubcategories = async (id) => {
    let response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getCategorybyId = async (id) => {
    let response = await axios.get(`/category/name/${id}`)
    return response.data
}

const getSubcategorybyId = async (id) => {
    let response = await axios.get(`/subcategory/name/${id}`)
    return response.data
}

export { getCategories, getSubcategories, getCategorybyId, getSubcategorybyId }