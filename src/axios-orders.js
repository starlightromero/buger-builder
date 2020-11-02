import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-builder-c275c.firebaseio.com/'

})

export default instance
