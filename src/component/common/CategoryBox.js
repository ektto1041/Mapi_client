/**
 *  지도 페이지에서 카테고리 필터링 할 때 사용하는 카테고리 박스
 */
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../../resource/Dimentions";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import AttractionsIcon from '@mui/icons-material/Attractions';
import ParkIcon from '@mui/icons-material/Park';

const CategoryBox = ({
    value,
    onItemClick,
}) => {
    return (
        <Container>
            <FastfoodIcon
                sx={{...IconStyle, color: value === 'food' ? `red` : 'gray'}}
                onClick={() => onItemClick('food')}
            />
            <EmojiFoodBeverageIcon
                sx={{...IconStyle, color: value === 'cafe' ? `brown` : `gray`}}
                onClick={() => onItemClick('cafe')}
            />
            <AttractionsIcon
                sx={{...IconStyle, color: value === 'travel' ? `yellow` : `gray`}}
                onClick={() => onItemClick('travel')}
            />
            <ParkIcon
                sx={{...IconStyle, color: value === 'park' ? `green` : `gray`}}
                onClick={() => onItemClick('park')}
            />
        </Container>
    );
};

const Container = styled(Box)(p => ({
    width: `50px`,
    height: `200px`,
    position: `fixed`,
    left: `25px`,
    top: `75px`,
    display: `flex`,
    flexDirection: `column`,
    backgroundColor: `white`,
    boxShadow: dim.shadow,
    zIndex: `100`,
}));

const IconStyle = {
    width: `30px`,
    height: `30px`,
    margin: `10px`,
}

export default CategoryBox;