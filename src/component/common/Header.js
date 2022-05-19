/**
 *  화면 상단의 헤더
 */
import Box from "@mui/material/Box";
import {Icon, IconButton, SvgIcon, Typography} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import dim from "../../resource/Dimentions";
import { useNavigate } from "react-router-dom";
import {useCallback} from "react";
import path from "../../resource/Path";

const Header = () => {
    const navigate = useNavigate();

    const onClickMapListBtn = useCallback((e) => {
        navigate(path.full.mapList);
    }, []);

    const onClickUserBtn = useCallback((e) => {
        navigate(path.full.login);
    }, []);

    return (
        <Box
            sx={{
                width: `100%`,
                backgroundColor: `white`,
                height: dim.headerHeight,
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
                    lineHeight={dim.headerHeight}
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
                        width: dim.headerHeight,
                        height: dim.headerHeight,
                    }}
                >
                    <MapIcon />
                </IconButton>

                <IconButton
                    onClick={onClickUserBtn}
                    sx={{
                        width: dim.headerHeight,
                        height: dim.headerHeight,
                    }}
                >
                    <PersonOutlineIcon />
                </IconButton>
            </Box>

        </Box>
    );
};

export default Header;