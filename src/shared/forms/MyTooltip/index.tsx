import { Info } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

interface IMyTooltip {
  text: string;
}
const MyTooltip = ({ text }: IMyTooltip) => {
  return (
    <Tooltip title={text} arrow>
      <IconButton
        sx={{
          marginLeft: 2,
          padding: 0,
        }}
        size="small"
      >
        <Info sx={{ width: 17, height: 17 }} />
      </IconButton>
    </Tooltip>
  );
};

export { MyTooltip };
