import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../resource/Dimentions";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Spin from "../component/common/Spin";
import {dev, dummy} from "../resource/dev";
import {serverApis} from "../api/Api";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import AttractionsIcon from '@mui/icons-material/Attractions';
import ParkIcon from '@mui/icons-material/Park';
import Button from "@mui/material/Button";
import path from "../resource/Path";

/**
 *  기록을 보여주는 페이지
 */
const Post = () => {
    const {postId} = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [record, setRecord] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        if(dev) {
            setRecord(dummy.records.filter(item => `${item.recordId}` === postId)[0]);

            setIsLoading(false);
        } else {
            serverApis.getRecord(postId)
                .then(r => {
                    console.log(r.data);

                    setRecord(r.data);

                    setIsLoading(false);
                })
                .catch(e => console.log(e));
        }
    }, []);

    const onUpdateClick = () => {
        navigate(path.full.updateRecord(record.idrecord));
    };

    const onDeleteClick = () => {
        serverApis.deleteRecord(record.idrecord)
            .then(r => {
                navigate(path.full.map(record.id_map))
            })
            .catch(c => console.log(c));
    }

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
                    <Title>
                        {record.title}
                    </Title>

                    <Box
                        dangerouslySetInnerHTML={{__html: record?.content}}
                        sx={{
                            width: `90%`,
                            height: `70%`,
                            m: `10px auto`,
                            p: `10px`,
                            border: `1px solid #f0f0f0`,
                            // boxShadow: dim.shadow,
                            backgroundColor: `white`,
                        }}
                    ></Box>

                    <Footer>
                        <IconBackground>
                            {getIcon(record?.category)}
                        </IconBackground>


                        <ButtonBox>
                            <Button
                                variant={"contained"}
                                sx={{
                                    width: `100%`,
                                    height: `45px`,
                                    mb: `10px`
                                }}
                                onClick={onUpdateClick}
                            >
                                수정
                            </Button>

                            <Button
                                variant={"contained"}
                                sx={{
                                    width: `100%`,
                                    height: `45px`,
                                }}
                                onClick={onDeleteClick}
                            >
                                삭제
                            </Button>
                        </ButtonBox>
                    </Footer>

                </>
            )}

        </Container>
    )
}

const Container = styled(Box)(p => ({
    width: `100%`,
    height: `calc(100% - ${dim.headerHeight})`,
    marginTop: dim.headerHeight,
    display: `flex`,
    flexDirection: `column`,
    // backgroundColor: `#f0f0f0`,
}));

const Title = styled(Box)(p => ({
    width: `90%`,
    height: `80px`,
    margin: `0 auto`,
    display: `flex`,
    alignItems: `center`,
    fontSize: `35px`,
    fontWeight: `bold`,
}));

const Footer = styled(Box)(p => ({
    width: `90%`,
    height: `100px`,
    margin: `0 auto`,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-between`,
}));

const ButtonBox = styled(Box)(p => ({
    width: `100px`,
    height: `100%`,
    display: `flex`,
    flexDirection: `column`,
}));

const IconBackground = styled(Box)(p => ({
    width: `60px`,
    height: `60px`,
    border: `1px solid #e0e0e0`,
    borderRadius: `30px`,
    backgroundColor: `#f0f0f0`,
}));

const IconStyle = {
    width: `50px`,
    height: `50px`,
    margin: `5px`,
}

export default Post;