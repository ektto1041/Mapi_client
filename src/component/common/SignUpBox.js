import Box from "@mui/material/Box";
import LoginFormItem from "./LoginFormItem";
import {Link} from "@mui/material";
import MainButton from "./MainButton";
import path from "../../resource/Path";
import str from "../../resource/String";
import dim from '../../resource/Dimentions';

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
    onClickSignUp,
}) => {
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