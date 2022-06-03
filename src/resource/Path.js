const path = {
    routing: {
        auth: '/auth/*',
        login: `/login`,
        signUp: '/signUp',
        frame: `/*`,
        map: `/map/:mapId`,
        mapList: `/mapList/*`,
        post: `/post/:postId`,
        addRecord: `/addRecord`,
    },
    full: {
        auth: '/auth',
        login: '/auth/login',
        signUp: '/auth/signup',
        frame: `/`,
        map: (mapId) => `/map/${mapId}`,
        mapList: `/mapList`,
        post: (postId) => `/post/${postId}`,
        addRecord: (mapId, lat, lng) => `/addRecord?mapId=${mapId}&lat=${lat}&lng=${lng}`,
    }
}

export default path;