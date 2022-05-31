import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../resource/Dimentions";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Spin from "../component/common/Spin";
import {dev, dummy} from "../resource/dev";
import {serverApis} from "../api/Api";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import AttractionsIcon from '@mui/icons-material/Attractions';
import ParkIcon from '@mui/icons-material/Park';

/**
 *  기록을 보여주는 페이지
 */
const Container = styled(Box)(p => ({
    width: `100%`,
    height: `calc(100% - ${dim.headerHeight})`,
    marginTop: dim.headerHeight,
    display: `flex`,
    flexDirection: `column`,
    backgroundColor: `#f0f0f0`,
}));

const Post = () => {
    const {postId} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [record, setRecord] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        if(dev) {
            setRecord(dummy.records.filter(item => item.recordId == postId)[0]);

            setIsLoading(false);
        } else {
            serverApis.getRecord(postId)
                .then(r => {
                    setRecord(r.data);

                    setIsLoading(false);
                })
                .catch(e => console.log(e));
        }
    }, []);

    useEffect(() => {
        console.log(record?.content);
    }, [record]);

    const getIcon = (category) => {
        switch (category) {
            case 'food':
                return (<FastfoodIcon sx={{...IconStyle, color: `red`}} />)
            case 'cafe':
                return (<EmojiFoodBeverageIcon sx={{...IconStyle, color: `brown`}} />)
            case 'travel':
                return (<AttractionsIcon sx={{...IconStyle, color: `yellow`}} />)
            case 'park':
                return (<ParkIcon sx={{...IconStyle, color: `green`}} />)
            default:
                return (<></>);
        }
    }

    return (
        <Container>
            {isLoading ? (
                <Spin />
            ) : (
                <>
                    <Box
                        dangerouslySetInnerHTML={{__html: record?.content}}
                        sx={{
                            width: `90%`,
                            height: `70%`,
                            m: `10px auto`,
                            p: `10px`,
                            border: `1px solid #f0f0f0`,
                            boxShadow: dim.shadow,
                            backgroundColor: `white`,
                        }}
                    ></Box>

                    {getIcon(record?.category)}
                </>
            )}

        </Container>
    )
}

const IconStyle = {
    width: `50px`,
    height: `50px`,
}

export default Post;