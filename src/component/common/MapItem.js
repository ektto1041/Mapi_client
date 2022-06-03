/**
 *  Map Item
 */
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import path from "../../resource/Path";

const Container = styled(Box)(p => ({
    width: `calc(100% - 10px)`,
    height: `18%`,
    minHeight: `18%`,
    margin: `5px`,
    borderStyle: `solid`,
    borderWidth: `1px`,
    borderColor: `black`,
    display: `flex`,
    flexDirection: `row`,
}));

const MapItem = ({
    type,
    mapId,
    userName,
    mapName,
    onDialogOpen,
}) => {
    const navigate = useNavigate();

    const onClickMapItem = useCallback(() => {
        if(type === 'add') onDialogOpen();
        else navigate(path.full.map(mapId));
    }, [])

    return (
        <Container>
            { type === 'add' ? (
                <Box sx={{ width: `100%`, display: `flex`, alignItems: `center`, justifyContent: `center`, fontSize: `70px` }}
                    onClick={onClickMapItem}
                >
                    +
                </Box>
            ) : (
                <>
                    <Box
                        onClick={onClickMapItem}
                        sx={{
                            width: `90%`,
                            display: `flex`,
                            flexDirection: `column`,
                            justifyContent: `center`,
                            ml: `10px`,
                        }}>
                        <Typography>
                            {userName}의
                        </Typography>
                        <Typography sx={{
                            fontSize: `30px`,
                            fontWeight: `bold`
                        }}>
                            {mapName}
                        </Typography>
                        <Box
                            sx={{
                                width: `100%`,
                                display: `flex`,
                                flexDirection: `row`,
                            }}
                        >
                            {/*<Typography*/}
                            {/*    sx={{*/}
                            {/*        width: `50%`*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    최종 수정: 2022-04-09*/}
                            {/*</Typography>*/}
                            {/*<Typography*/}
                            {/*    sx={{*/}
                            {/*        width: `50%`*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    개의 기록*/}
                            {/*</Typography>*/}
                        </Box>


                    </Box>
                    <Box sx={{
                        width: `10%`,
                        display: `flex`,
                        flexDirection: 'row',
                        alignItems: `center`,
                        mr: `10px`,
                    }}>
                        <FavoriteBorderIcon color='primary' sx={{ width: `100%`, height: `100%`, maxHeight: `30px` }} />
                    </Box>
                </>
            )}
        </Container>
    )
}

export default MapItem;