import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../resource/Dimentions";
import CustomEditor from "../component/common/Editor";
import {useCallback, useState} from "react";
import {MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {dev, dummy} from "../resource/dev";
import {Cookies} from "react-cookie";
import {useNavigate, useSearchParams} from "react-router-dom";
import {serverApis} from "../api/Api";
import path from "../resource/Path";

const Container = styled(Box)(p => ({
    width: `100%`,
    height: `100%`,
    display: `flex`,
    flexDirection: `column`,
}));

/**
 *  기록을 보여주는 페이지
 */
const AddRecord = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('food');

    const onTitleChange = (e) => { setTitle(e.target.value); };

    const onContentChange = useCallback((value) => {
        setContent(value);
    }, []);

    const onCategoryChange = (e) => { setCategory(e.target.value); };

    const onSubmitClick = useCallback(() => {
        const recordDto = {
            userId: new Cookies().get('userId'),
            title: title,
            content: content,
            category: category,
            latitude: searchParams.get('lat'),
            longitude: searchParams.get('lng'),
        };

        if(dev) {
            dummy.pins.push({recordId: 4, latitude: recordDto.latitude, longitude: recordDto.longitude, category: category});

            navigate(path.full.map);
        } else {
            serverApis.addRecord(recordDto)
                .then(r => {
                    navigate(path.full.map);
                })
                .catch(e => console.log(e));
        }
    }, [title, content, category]);

    return (
        <Container>
            <Box sx={{ height: dim.headerHeight }} />

            <TextField size='small' placeholder='제목을 입력하세요' sx={TitleStyle}
                       value={title} onChange={onTitleChange}
            />

            <EditorBox>
                <CustomEditor value={content} onValueChange={onContentChange} />
            </EditorBox>


            <ItemBox>
                <Select sx={{width: `30%`}} value={category} onChange={onCategoryChange}>
                    <MenuItem value='food' >음식점</MenuItem>
                    <MenuItem value='cafe' >카페</MenuItem>
                    <MenuItem value='travel' >관광지</MenuItem>
                    <MenuItem value='park' >공원</MenuItem>
                </Select>

                <Button
                    onClick={onSubmitClick}
                    variant='contained'
                    sx={{width: `30%`}}
                >등록</Button>
            </ItemBox>
        </Container>
    );
};

const TitleStyle = {
    width: `90%`,
    mx: `auto`,
    my: `10px`,
}

const EditorBox = styled(Box)(p => ({
    width: `100%`,
    height: `50%`,
}));

const ItemBox = styled(Box)(p => ({
    width: `90%`,
    margin: `50px auto`,
    display: `flex`,
    justifyContent: `space-between`,
}));

export default AddRecord;