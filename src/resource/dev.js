const dev = true;

const dummy = {
    maps: [
        {mapId: 1, userName: '박상연', mapName: '제주도 여행', count: 6},
        {mapId: 2, userName: '박상연', mapName: '부산 여행', count: 4},
        {mapId: 3, userName: '오상민', mapName: '전국 맛집', count: 7},
    ],
    records: [
        {recordId: 1, latitude: 37.277, longitude: 127.044, category: 'food', title: '푸드테라피', content: '<p>밥 먹자</p>'},
        {recordId: 2, latitude: 37.2775, longitude: 127.0445, category: `cafe`, title: '코인노래방', content: '<p>노래 부르자</p>'},
        {recordId: 3, latitude: 37.2765, longitude: 127.0435, category: `park`, title: '스터디카페', content: '<p>공부하자</p>'},
    ],
}

// 37.277591
//127.0445599

export {dev, dummy};