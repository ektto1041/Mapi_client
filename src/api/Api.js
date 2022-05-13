import axios from 'axios';

const addr = (true) ? 'http://52.78.220.84:8080' : 'http://localhost:8080/api'

const serverApis = {
    login: (userLoginDto) => new Promise((resolve, reject) => {
        axios.post(`${addr}/user/login`, userLoginDto)
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
}

export {
    serverApis,
};