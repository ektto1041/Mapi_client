import {Switch, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {styled} from "@mui/system";

/**
 *  새 지도를 생성하는 다이얼로그의 내부
 */
const NewMapDialog = ({
    newMapName,
    isShare,
    onNewMapNameChange,
    onShareChange,
    onNewMapClick,
}) => {

    return (
        <Container>
            <TextField
                value={newMapName}
                onChange={onNewMapNameChange}
                sx={{width: `100%`}}
                placeholder={'새 지도 이름'}
            />
            <ItemBox>
                <Box
                    sx={{
                        display: `flex`,
                        flexDirection: `row`
                    }}
                >
                    <Switch value={isShare} onChange={onShareChange} />
                    <Typography lineHeight='40px'>
                        공개
                    </Typography>
                </Box>

                <Button
                    variant={`contained`}
                    sx={{
                        width: `20%`,
                    }}
                    onClick={onNewMapClick}
                >
                    추가
                </Button>
            </ItemBox>

        </Container>
    );
};

const Container = styled(Box)(p => ({
    width: `300px`,
    height: `auto`,
    padding: `10px`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `end`,
}));

const ItemBox = styled(Box)(p => ({
    width: `100%`,
    marginTop: `10px`,
    display: `flex`,
    justifyContent: `space-between`,
}));

export default NewMapDialog;