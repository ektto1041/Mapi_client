import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../resource/Dimentions";
import CustomEditor from "../component/common/Editor";
import {useCallback, useState} from "react";

/**
 *  기록을 보여주는 페이지
 */
const AddRecord = () => {
    const [content, setContent] = useState('');

    const onContentChange = useCallback((value) => {
        setContent(value);
    }, []);

    return (
        <Container>
            <Box sx={{ height: dim.headerHeight }} />

            <CustomEditor value={content} onValueChange={onContentChange} />
        </Container>
    );
};

const Container = styled(Box)(p => ({
    width: `100%`,
    height: `100%`,
    display: `flex`,
    flexDirection: `column`,
}));

export default AddRecord;