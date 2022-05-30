const path = {
    routing: {
        auth: '/auth/*',
        login: `/login`,
        signUp: '/signUp',
        frame: `/*`,
        map: `/map/*`,
        mapList: `/mapList/*`,
        post: `/post/*`,
        addRecord: `/addRecord`,
    },
    full: {
        auth: '/auth',
        login: '/auth/login',
        signUp: '/auth/signup',
        frame: `/`,
        map: `/map`,
        mapList: `/mapList`,
        post: `/post`,
        addRecord: (lat, lng) => `/addRecord?lat=${lat}&lng=${lng}`,
    }
}

export default path;