import { FC, ChangeEvent, ReactNode } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@mui/icons-material';

const InvisibleInput = styled('input')({
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  opacity: 0
});

interface IParserSidebar {
  isUploadBtnDisabled: boolean;
  children: ReactNode;
  handleUploadInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ParserSidebar: FC<IParserSidebar> = ({
  isUploadBtnDisabled,
  children,
  handleUploadInput
}) => {
  return (
    <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          top: 24,
          height: '100%',
          maxHeight: '100vh',
          position: 'sticky',
          overflow: 'hidden',
          boxShadow: '4px 0 16px 0 rgba(0,0,0,.045)',
          bgcolor: 'background.default',
        }}
      >
        <Button
          sx={{ mb: 2, width: '100%' }}
          component="label"
          variant="contained"
          disabled={isUploadBtnDisabled}
          startIcon={<CloudUpload />}
        >
          Загрузить файл
          <InvisibleInput type="file" accept=".xlsx, .xls" onChange={handleUploadInput} />
        </Button>
        {children}
      </Box>
    </Grid>
  )
};

export default ParserSidebar;
