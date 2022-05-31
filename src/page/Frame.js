import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import Header from "../component/common/Header";
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Map from '../page/Map';
import MapList from '../page/MapList';
import path from "../resource/Path";
import Post from "./Post";
import {useEffect} from "react";
import {Cookies} from 'react-cookie';
import AddRecord from "./AddRecord";

const Background = styled(Box)(p => ({
    height: `100vh`,
    overflow: `hidden`,
    display: `flex`,
    flexDirection: `column`,
    position: `relative`,
}));

const Body = styled(Box)(p => ({
    width: `100%`,
    height: `100%`,
}));

/** Header 를 포함하는 큰 틀 */
const Frame = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(pathname === '/') {
            // 쿠키에서 userId 값을 가져옴
            const userId = new Cookies().get('userId')

            // userId 이 존재하지 않으면 로그인 페이지로
            if(!userId) navigate(path.full.login);
            // 로그인 된 상태라면 지도 페이지로
            else navigate(path.full.map);
        }


    }, []);

    return (
        <Background>
            <Header />

            <Body>
                <Routes>
                    <Route path={path.routing.map} element={<Map />} />
                    <Route path={path.routing.mapList} element={<MapList />} />
                    <Route path={path.routing.post} element={<Post />} />
                    <Route path={path.routing.addRecord} element={<AddRecord />} />
                </Routes>
            </Body>
        </Background>
    )
}

export default Frame;