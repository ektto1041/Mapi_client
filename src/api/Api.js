import axios from 'axios';

const addr = 'http://localhost:8080/';

const serverApis = {
    login: (userLoginDto) => new Promise((resolve, reject) => {
        axios.post(`${addr}/user/login`, userLoginDto)
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    // 모든 맵 정보를 가져오는 API
    getAllMap: () => new Promise((resolve, reject) => {
        axios.get(`${addr}/maps`)
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
}

export {
    serverApis,
};