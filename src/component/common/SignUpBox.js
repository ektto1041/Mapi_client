import Box from "@mui/material/Box";
import LoginFormItem from "./LoginFormItem";
import {Link} from "@mui/material";
import MainButton from "./MainButton";
import path from "../../resource/Path";
import str from "../../resource/String";
import dim from '../../resource/Dimentions';
import {useCallback} from "react";
import {dev} from "../../resource/dev";
import {useNavigate} from "react-router-dom";
import {serverApis} from "../../api/Api";

/**
 *  로그인 정보를 입력하는 상자
 */

const LoginBox = ({
    email,
    password,
    name,

    onChangeEmail,
    onChangePassword,
    onChangeName,
}) => {
    const navigate = useNavigate();

    const onClickSignUp = useCallback(() => {
        const userSignUpDto = {
            email,
            password,
            name
        };

        console.log(JSON.stringify(userSignUpDto));

        if(dev) {
            // Dev: 바로 로그인 페이지로 이동
            navigate(path.full.login);
        } else {
            serverApis.signUp(userSignUpDto)
                .then(r => {
                    // 회원가입 성공 시 로그인 페이지로 이동
                    navigate(path.full.login);
                })
                .catch(e => console.log(e));
        }
    })

    return (
        <Box sx={{
            width: `100%`,
            height: `auto`,
            backgroundColor: `white`,
            display: `flex`,
            flexDirection: `column`,
            position: `relative`,
            boxShadow: dim.shadow,
        }}>
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

            <LoginFormItem
                value={name}
                onChange={onChangeName}
                marginBottom={`25px`}
            >
                {str.name}
            </LoginFormItem>

            <Link href={path.full.login}
                  sx={{
                      width: `80%`,
                      mx: `auto`,
                      mb: `20px`,
                      textAlign: `start` }}
            >
                {str.login}
            </Link>

            <MainButton
                onClick={onClickSignUp}
            >
                {str.signUp}
            </MainButton>
        </Box>
    )
}

export default LoginBox;