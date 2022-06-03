import axios from 'axios';

const addr = 'http://localhost:5000';
// const addr = '';

const serverApis = {
    login: (userLoginDto) => new Promise((resolve, reject) => {
        axios.post(`${addr}/login`, userLoginDto, { withCredentials: true })
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
        axios.get(`${addr}/maps/-1`, { withCredentials: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    getAllMapByUser: (userId) => new Promise((resolve, reject) => {
        axios.get(`${addr}/maps/${userId}`, { withCredentials: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    addMap: (mapDto) => new Promise((resolve, reject) => {
        axios.post(`${addr}/map`, mapDto, { withCredentials: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    addRecord: (recordDto) => new Promise((resolve, reject) => {
        axios.post(`${addr}/record`, recordDto, { withCredentials: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    getAllRecordByMapAndCategory: (mapId, category) => new Promise((resolve, reject) => {
        axios.get(`${addr}/record/${mapId}/${category}`, { withCredentials: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
    getRecord: (recordId) => new Promise((resolve, reject) => {
        axios.get(`${addr}/record/${recordId}`, { withCredentials: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
    }),
}

export {
    serverApis,
};