import {useCallback, useEffect, useState} from "react";
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import Spin from '../component/common/Spin';
import CategoryBox from "../component/common/CategoryBox";
import {dev, dummy} from "../resource/dev";
import {useNavigate, useParams} from "react-router-dom";
import path from "../resource/Path";
import {serverApis} from "../api/Api";
import {Cookies} from "react-cookie";
import String from "../resource/String";
import str from "../resource/String";

/**
 *  지도가 보여지는 화면
 */

const { kakao } = window;

const Background = styled(Box)(p => ({
    width: `100%`,
    height: `100%`,
    position: `relative`,
}));

const Map = () => {
    const {mapId} = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [map, setMap] = useState(null);
    const [filter, setFilter] = useState('-');
    const [markers, setMarkers] = useState([]);

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

                    console.log(lat)
                    console.log(lng)

                    const options = { //지도를 생성할 때 필요한 기본 옵션
                        center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
                        level: 3 //지도의 레벨(확대, 축소 정도)
                    };

                    setMap(new kakao.maps.Map(container, options)); //지도 생성 및 객체 리턴

                    getPins('-');
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

            setMap(new kakao.maps.Map(container, options)); //지도 생성 및 객체 리턴

            getPins('-');

            setIsLoading(false);
        }
    }, []);

    // Markers 가 갱신된 이후에 호출
    // Marker 들을 화면에 뿌려주고 클릭 이벤트 등록
    useEffect(() => {
        console.log(markers);

        if(!map) return;
        console.log(map)

        markers.forEach(m => {
            console.log(m)

            // 클릭 이벤트
            kakao.maps.event.addListener(m, 'click', (e) => {
                navigate(path.full.post(m.Gb));
            });

            m.setMap(map);
        })
    }, [map, markers]);

    // 지도에 클릭 이벤트 지정
    useEffect(() => {
        if(!map) return;

        kakao.maps.event.addListener(map, 'click', onMapClick);
    }, [map]);

    const getPins = useCallback((category) => {
        if(dev) {
            const pins = category === '-' ? dummy.records : dummy.records.filter(item => item.category === category);

            let markerList = [];

            pins.forEach(pin => {
                const pos = new kakao.maps.LatLng(pin.latitude, pin.longitude);

                console.log(pos);

                const marker = new kakao.maps.Marker({
                    position: pos,
                    clickable: true,
                    title: pin.recordId,
                });

                markerList.push(marker);
            });

            setMarkers(markerList);

            setIsLoading(false);
        } else {
            serverApis.getAllRecordByMapAndCategory(mapId, category)
                .then(r => {
                    console.log(r.data);

                    let tmpMarkers = [];

                    r.data.forEach(pin => {
                        const pos = new kakao.maps.LatLng(pin.latitude, pin.longitude);

                        console.log(pos);

                        const marker = new kakao.maps.Marker({
                            position: pos,
                            clickable: true,
                            title: pin.idrecord,
                        });

                        tmpMarkers.push(marker);
                    });

                    setMarkers(tmpMarkers);

                    setIsLoading(false);
                })
                .catch(e => console.log(e));
        }
    }, []);

    const onMapClick = (e) => {
        serverApis.getAllMapByUser(new Cookies().get("userId"))
            .then(r => {
                if(r.data.filter(m => `${m.idmap}` === mapId).length === 1) {
                    navigate(path.full.addRecord(mapId, latLng.Ma, latLng.La));
                }
            })
            .catch(e => console.log(e));

        const latLng = e.latLng;
    };

    const onFilterItemClick = useCallback((item) => {
        let newFilter;

        if(filter === item) newFilter = '-';
        else newFilter = item;

        setFilter(newFilter);

        // 기존 마커 삭제
        markers.forEach(m => {
            m.setMap(null);
        });

        getPins(newFilter);
    }, [markers, filter]);

    return (
        <Background
            id='map'
        >
            {isLoading ? (<Spin />) : (
                <>
                    <Box
                        id={`map`}
                        sx={{ width: `100%`, height: `100%` }}
                    >
                        <CircularProgress sx={{ width: `100%`, height: `100%` }} />
                    </Box>

                    <CategoryBox value={filter} onItemClick={onFilterItemClick} />
                </>
            )}
        </Background>
    )
};

export default Map;