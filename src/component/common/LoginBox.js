import Box from "@mui/material/Box";
import LoginFormItem from "./LoginFormItem";
import {Link} from "@mui/material";
import MainButton from "./MainButton";
import path from "../../resource/Path";
import str from "../../resource/String";

/**
 *  로그인 정보를 입력하는 상자
 */

const LoginBox = ({
    email,
    password,

    onChangeEmail,
    onChangePassword,
    onClickLogin,
}) => {
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