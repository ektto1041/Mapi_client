import Box from "@mui/material/Box";
import LoginFormItem from "./LoginFormItem";
import {Link} from "@mui/material";
import MainButton from "./MainButton";
import path from "../../resource/Path";
import str from "../../resource/String";
import {useCallback} from "react";
import {dev} from "../../resource/dev";
import {Cookies} from "react-cookie";
import {serverApis} from "../../api/Api";
import {useNavigate} from "react-router-dom";

/**
 *  로그인 정보를 입력하는 상자
 */

const LoginBox = ({
    email,
    password,

    onChangeEmail,
    onChangePassword,
}) => {
    const navigate = useNavigate();

    const onClickLogin = useCallback((e) => {
        const userLoginDto = {
            email,
            password,
        };

        if(dev) {
            // 개발 버전의 경우 임의로 userId 를 넣음
            loginSuccess(1);
        } else {
            serverApis.login(userLoginDto)
                .then(r => {
                    loginSuccess(r.data);
                })
                .catch(e => console.log(e));
        }
    }, [email, password]);

    /**
     * 로그인 성공 시, 쿠키에 userId 추가하고 지도 페이지로 이동
     * @param userId
     */
    const loginSuccess = (userId) => {
        new Cookies().set('userId', userId);

        navigate(path.full.map);
    };

    return (
        <>
            <Box sx={{ height: `20px` }}></Box>

            <LoginFormItem
                value={email}
                onChange={onChangeEmail}
                marginBottom={`25px`}
            >
                {str.email}
            </LoginFormItem>

            <LoginFormItem
                value={password}
                onChange={onChangePassword}
                type={`password`}
                marginBottom={`25px`}
            >
                {str.password}
            </LoginFormItem>

            <Link href={path.full.signUp}
                  sx={{
                      width: `80%`,
                      mx: `auto`,
                      mb: `20px`,
                      textAlign: `start` }}
            >
                {str.signUp}
            </Link>

            <MainButton
                onClick={onClickLogin}
            >
                {str.login}
            </MainButton>
        </>
    )
}



export default LoginBox;