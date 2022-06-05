import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../resource/Dimentions";
import CustomEditor from "../component/common/Editor";
import {useCallback, useEffect, useState} from "react";
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
 *  기록을 작성하는/수정하는 페이지
 */
const AddRecord = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [recordId, setRecordId] = useState('-1'); // recordId 가 있으면 수정 중
    const [mapId, setMapId] = useState('-1')        // 수정 작업시에만 필요
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('food');

    useEffect(() => {
        const paramRecordId = searchParams.get('recordId');

        const isUpdate = paramRecordId;
        if(isUpdate) {
            setRecordId(paramRecordId);

            serverApis.getRecord(paramRecordId)
                .then(r => {
                    const record = r.data;

                    setMapId(record.id_map);
                    setTitle(record.title);
                    setContent(record.content);
                    setCategory(record.category);
                })
                .catch(e => console.log(e));
        }
    }, []);

    const onTitleChange = (e) => { setTitle(e.target.value); };

    const onContentChange = useCallback((event, editor) => {
        setContent(editor.getData());

        console.log(editor.getData());
    }, []);

    const onCategoryChange = (e) => { setCategory(e.target.value); };

    const onSubmitClick = useCallback(() => {
        const isUpdate = recordId !== '-1';

        if(isUpdate) {
            const recordUpdateDto = {
                recordId,
                title,
                content,
                category,
            }

            if(dev) {
                console.log(recordUpdateDto);
            } else {
                serverApis.updateRecord(recordUpdateDto)
                    .then(r => {
                        navigate(path.full.map(mapId));
                    })
                    .catch(e => console.log(e));
            }
        } else {
            const recordDto = {
                mapId: searchParams.get('mapId'),
                title: title,
                content: content,
                category: category,
                latitude: searchParams.get('lat'),
                longitude: searchParams.get('lng'),
            };

            if(dev) {
                dummy.records.push({recordId: 4, latitude: recordDto.latitude, longitude: recordDto.longitude, category: category, title: title, content: content});

                navigate(path.full.map);
            } else {
                serverApis.addRecord(recordDto)
                    .then(r => {
                        navigate(path.full.map(searchParams.get('mapId')));
                    })
                    .catch(e => console.log(e));
            }
        }
    }, [title, content, category, recordId, mapId]);

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
    margin: `100px auto`,
    display: `flex`,
    justifyContent: `space-between`,
}));

export default AddRecord;