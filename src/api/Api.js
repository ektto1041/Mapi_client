import axios from 'axios';

const addr = 'http://localhost:5000/';

const serverApis = {
    login: (userLoginDto) => new Promise((resolve, reject) => {
        axios.post(`${addr}/login`, userLoginDto)
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    signUp: (userDto) => new Promise((resolve, reject) => {
        axios.post(`${addr}/user`, userDto)
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    // 모든 맵 정보를 가져오는 API
    getAllMap: () => new Promise((resolve, reject) => {
        axios.get(`${addr}/maps/-1`)
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    getAllMapByUser: (userId) => new Promise((resolve, reject) => {
        axios.get(`${addr}/maps/${userId}`)
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    addMap: (mapDto) => new Promise((resolve, reject) => {
        axios.post(`${addr}/map`, mapDto)
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
}

export {
    serverApis,
};