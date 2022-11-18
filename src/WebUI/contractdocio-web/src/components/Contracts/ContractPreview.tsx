import { OptionInputDto } from '@/api/web-api-client';
import { Typography } from '@mui/material';
import { Box } from '@/lib';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

interface IContractPreview {
  content?: string;
  type?: string;
  title?: string;
  options?: OptionInputDto[];
}

export default ({ title, content }: IContractPreview): JSX.Element => {
  return (
    <Box border="1px solid" p={2}>
      <Typography variant="h5" align="center">
        <strong>
          <u>{title}</u>
        </strong>
      </Typography>
      <ReactQuill theme="bubble" readOnly value={content} />
    </Box>
  );
};
