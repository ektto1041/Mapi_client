/**
 *  Editor
 */
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomEditor = ({
    value,
    onValueChange: onValueChange,
}) => {

    return (
        <>
            <ReactQuill
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline']}
                value={value}
                onChange={onValueChange}
            />
        </>
    )
}

export default CustomEditor;