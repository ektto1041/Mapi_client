/**
 *  Map Item
 */
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Accessibility} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

const Container = styled(Box)(p => ({
    width: `calc(100% - 10px)`,
    height: `15vh`,
    margin: `5px`,
    borderStyle: `solid`,
    borderWidth: `1px`,
    borderColor: `black`,
    display: `flex`,
    flexDirection: `row`,
}));

const MapItem = () => {
    const navigate = useNavigate();

    const onClickMapItem = useCallback(() => {
        navigate("/");
    }, [])

    return (
        <Container>
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
                    박상연의
                </Typography>
                <Typography sx={{
                    fontSize: `30px`,
                    fontWeight: `bold`
                }}>
                    제주 여행 코스
                </Typography>
                <Box
                    sx={{
                        width: `100%`,
                        display: `flex`,
                        flexDirection: `row`,
                    }}
                >
                    <Typography
                        sx={{
                            width: `50%`
                        }}
                    >
                        최종 수정: 2022-04-09
                    </Typography>
                    <Typography
                        sx={{
                            width: `50%`
                        }}
                    >
                        6개의 기록
                    </Typography>
                </Box>


            </Box>
            <Box sx={{
                width: `10%`,
                display: `flex`,
                flexDirection: 'row',
                alignItems: `center`,
                mr: `10px`,
            }}>
                <FavoriteBorderIcon color='primary' sx={{ width: `100%`, height: `100%` }} />
            </Box>
        </Container>
    )
}

export default MapItem;