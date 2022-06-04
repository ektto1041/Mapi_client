/**
 *  Editor
 */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

const CustomEditor = ({
    value,
    onValueChange,
}) => {
    return (
        <Container>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={onValueChange}
            />
        </Container>
    )
}

const Container = styled.div`
.ck-editor__editable {
  min-height: 420px;
}
`

export default CustomEditor;