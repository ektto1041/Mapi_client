/**
 *  화면 상단의 헤더
 */
import Box from "@mui/material/Box";
import Ic_user from "../../resource/ic_user.svg";
import Button from "@mui/material/Button";
import {Icon, IconButton, SvgIcon, Typography} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import dim from "../../resource/Dimentions";
import { useNavigate } from "react-router-dom";
import {useCallback} from "react";

const Header = () => {
    const navigate = useNavigate();

    const onClickMapListBtn = useCallback((e) => {
        navigate("/mapList");
    }, []);

    const onClickUserBtn = useCallback((e) => {
        navigate("/login");
    }, []);

    return (
        <Box
            sx={{
                width: `100%`,
                backgroundColor: `white`,
                height: dim.HEADER_HEIGHT,
                position: `absolute`,
                left: `0`,
                top: `0`,
                zIndex : `100`,
                boxShadow: `0px 7px 10px 0px #B5B5B5`,
                display: `flex`,
                flexDirection: 'row',
            }}
        >
            <Box
                sx={{
                    width: `50%`,
                    cursor: `default`,
                    userSelect: `none`,
                }}
            >
                <Typography
                    lineHeight={dim.HEADER_HEIGHT}
                    marginLeft={`20px`}
                    fontSize={`25px`}
                    fontWeight={`bold`}

                >
                    나만의 지도
                </Typography>
            </Box>

            <Box
                sx={{
                    display: `flex`,
                    flexDirection: `row`,
                    alignItems: `center`,
                    justifyContent: `end`,
                    width: `50%`,
                }}
            >
                <IconButton
                    onClick={onClickMapListBtn}
                    sx={{
                        width: dim.HEADER_HEIGHT,
                        height: dim.HEADER_HEIGHT,
                    }}
                >
                    <MapIcon />
                </IconButton>

                <IconButton
                    onClick={onClickUserBtn}
                    sx={{
                        width: dim.HEADER_HEIGHT,
                        height: dim.HEADER_HEIGHT,
                    }}
                >
                    <PersonOutlineIcon />
                </IconButton>
            </Box>

        </Box>
    );
};

export default Header;