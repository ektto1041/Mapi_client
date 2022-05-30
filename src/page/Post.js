/**
 *  기록을 보여주는 페이지
 */
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../resource/Dimentions";
import CustomEditor from "../component/common/Editor";


const Container = styled(Box)(p => ({
    width: `100%`,
    height: `100%`,
    display: `flex`,
    flexDirection: `column`,
}));

const Page = () => {
    return (
        <Container>
            <Box sx={{ height: dim.headerHeight }} />

            <CustomEditor />
        </Container>
    )
}

export default Page;