import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const addToPhonebook = (phoneData) => {
    return axios.post(baseUrl, phoneData).then(response => response.data)
}

const modifyPhonebook = (id, newPhoneData) => {
    return axios.put(`${baseUrl}/${id}`, newPhoneData).then(response => response.data)
}

const deleteFromPhonebook = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default { getAll, addToPhonebook, modifyPhonebook, deleteFromPhonebook }