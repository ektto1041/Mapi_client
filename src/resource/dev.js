const dev = true;

const dummy = {
    maps: [
        {mapId: 1, userName: '박상연', mapName: '제주도 여행', count: 6},
        {mapId: 2, userName: '박상연', mapName: '부산 여행', count: 4},
        {mapId: 3, userName: '오상민', mapName: '전국 맛집', count: 7},
    ],
    pins: [
        {recordId: 1, latitude: 37.277, longitude: 127.044, category: 'food'},
        {recordId: 2, latitude: 37.2775, longitude: 127.0445, category: `cafe`},
        {recordId: 3, latitude: 37.2765, longitude: 127.0435, category: `park`},
    ]
}

// 37.277591
//127.0445599

export {dev, dummy};