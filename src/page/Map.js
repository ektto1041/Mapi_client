import {useEffect, useState} from "react";
import {letterSpacing, styled} from "@mui/system";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import Spin from '../component/common/Spin';

/**
 *  지도가 보여지는 화면
 */

const { kakao } = window;

const Background = styled(Box)(p => ({
    width: `100%`,
    height: `100%`,
}));

const Map = () => {
    let [isLoading, setIsLoading] = useState(true);
    let [currentMap, setCurrentMap] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        console.log(isLoading);

        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

        let lat, lng;

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    lat = pos.coords.latitude;
                    lng = pos.coords.longitude;

                    const options = { //지도를 생성할 때 필요한 기본 옵션
                        center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
                        level: 3 //지도의 레벨(확대, 축소 정도)
                    };

                    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
                    setCurrentMap(map);
                    setIsLoading(false);
                },
                e => {
                    console.log(e);
                }, {
                    enableHighAccuracy: false,
                    maximumAge: 0,
                    timeout: Infinity
                });
        } else {
            const options = { //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };

            const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
            setCurrentMap(map);
            setIsLoading(false);
        }
        
        kakao.maps.event.addListener(currentMap, 'click', function(mouseEvent){
            console.log(1);
        });
        
    }, []);
    
    return (
        <Background
            id='map'
        >
            {isLoading ? (<Spin />) : (
                <Box
                    id={`map`}
                    sx={{ width: `100%`, height: `100%` }}
                >
                    <CircularProgress sx={{ width: `100%`, height: `100%` }} />
                </Box>
            )}
        </Background>
    )
};

export default Map;