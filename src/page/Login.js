import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import background from "../resource/background.png";
import logoImage from "../resource/logo.png";
import {useCallback, useState} from "react";
import {Route, Routes} from "react-router-dom";
import LoginBox from "../component/common/LoginBox";
import path from '../resource/Path'
import SignUpBox from "../component/common/SignUpBox";

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
    const [name, setName] = useState("");

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    }, []);

    const onClickLogin = useCallback((e) => {
        const userLoginDto = {
            email,
            password,
        };

        // TODO: API
    }, [email, password]);

    const onClickSignUp = useCallback(() => {
        const userSignUpDto = {
            email,
            password,
            name
        };

        // TODO: API
    })

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
                    <Routes>
                        <Route path={path.routing.login} element={<LoginBox
                            email={email}
                            password={password}

                            onChangeEmail={onChangeEmail}
                            onChangePassword={onChangePassword}
                            onClickLogin={onClickLogin}
                        />} />
                        <Route path={path.routing.signUp} element={<SignUpBox
                            email={email}
                            password={password}
                            name={name}

                            onChangeEmail={onChangeEmail}
                            onChangePassword={onChangePassword}
                            onChangeName={onChangeName}
                            onClickSignUp={onClickSignUp}
                        />} />
                    </Routes>
                </Box>
            </Box>
        </Background>
    );
}

export default Login;