// const apiUrlVariable = `https://entregafinalpptapi.herokuapp.com`

const apiUrlVariable = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` 

export default apiUrlVariable