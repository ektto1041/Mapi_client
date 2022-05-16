import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import background from "../resource/background.png";
import {serverApis} from "../api/Api";
import logoImage from "../resource/logo.png";
import LoginFormItem from "../component/common/LoginFormItem";
import MainButton from "../component/common/MainButton";
import {useCallback, useState} from "react";
import {Link, Typography} from "@mui/material";

/**
 *  로그인/회원가입 페이지
 */

const Background = styled(Box)(p => ({
    height: `100vh`,
    backgroundImage: `url(${background})`,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`
}));

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onClickLogin = useCallback((e) => {
        const userLoginDto = {
            email,
            password,
        }

        serverApis.login(userLoginDto)
            .then(r => {
                console.log(r.data);
            })
    }, [email, password]);

    return (
        <Background>
            <Box sx={{
                width: `300px`,
                height: `100%`,
                mx: `auto`,
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: `center`,
            }}>
                <img
                    src={logoImage}
                    width={`200px`}
                    height={`100px`}
                />

                <Box sx={{
                    width: `100%`,
                    height: `auto`,
                    backgroundColor: `white`,
                    display: `flex`,
                    flexDirection: `column`,
                    position: `relative`,
                    boxShadow: `0px 7px 10px 0px #B5B5B5`,
                }}>
                    <Box sx={{ height: `20px` }}></Box>

                    <LoginFormItem
                        value={email}
                        onChange={onChangeEmail}
                        marginBottom={`25px`}
                    >
                        이메일
                    </LoginFormItem>

                    <LoginFormItem
                        value={password}
                        onChange={onChangePassword}
                        type={`password`}
                        marginBottom={`25px`}
                    >
                        비밀번호
                    </LoginFormItem>

                    <Box
                        sx={{
                            width: `80%`,
                            mx: `auto`,
                            display: `flex`,
                            flexDirection: 'row',
                            mb: `20px`,
                        }}
                    >
                        <Link href={"/"}
                              sx={{ width: `50%`, textAlign: `start` }}
                        >
                            회원가입
                        </Link>

                        <Link href={"/"}
                              sx={{ width: `50%`, textAlign: `end` }}
                        >
                            로그인
                        </Link>
                    </Box>



                    <MainButton
                        onClick={onClickLogin}
                    >
                        로그인
                    </MainButton>
                </Box>
            </Box>
        </Background>
    );
}

export default Login;