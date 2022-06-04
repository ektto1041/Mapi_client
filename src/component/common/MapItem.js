/**
 *  Map Item
 */
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCallback, useState} from "react";
import path from "../../resource/Path";
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
    share,
    onDialogOpen,
    onUpdateClick,
    onDeleteClick,
}) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const onMoreClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const onMoreClose = () => {
        setAnchorEl(null);
    };

    const onClickMapItem = useCallback(() => {
        if(type === 'add') onDialogOpen();
        else navigate(path.full.map(mapId));
    }, [])

    const handleUpdateClick = () => {
        onUpdateClick({
            mapId,
            mapName,
            share,
        });
    }

    const handleDeleteClick = () => {
        onDeleteClick(mapId);
    }

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
                            width: `80%`,
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
                    }}>
                        <FavoriteBorderIcon color='primary' sx={{ width: `100%`, height: `100%`, maxHeight: `30px` }} />
                    </Box>
                    <Box sx={{
                        width: `10%`,
                        display: `flex`,
                        flexDirection: 'row',
                        alignItems: `center`,
                        mr: `10px`,
                    }}>
                        <IconButton
                            sx={{
                                width: `100%`,
                                height: `100%`,
                                maxHeight: `30px`,
                            }}
                            onClick={onMoreClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            open={open}
                            anchorEl={anchorEl}
                            onClose={onMoreClose} >
                            <MenuItem onClick={handleUpdateClick}>수정</MenuItem>
                            <MenuItem onClick={handleDeleteClick}>삭제</MenuItem>
                        </Menu>

                    </Box>


                </>
            )}
        </Container>
    )
}

export default MapItem;