import { OptionInputDto } from '@/api/web-api-client';
import { FormControlLabel, FormGroup, Typography } from '@mui/material';
import { Box, Checkbox } from '@/lib';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import signature from '@/asset/signature.png';

interface ISignedContractPreview {
  content?: string;
  type?: string;
  title?: string;
  options?: OptionInputDto[];
}

export default ({
  title,
  content,
  options
}: ISignedContractPreview): JSX.Element => {
  return (
    <>
      <Box
        border="1px solid"
        p={2}
        maxWidth={1200}
        marginLeft="auto"
        marginRight="auto"
      >
        <Typography variant="h5" align="center">
          <strong>
            <u>{title}</u>
          </strong>
        </Typography>
        <ReactQuill theme="bubble" readOnly value={content} />
        {options?.length ? (
          <FormGroup>
            {options?.map((option, index) => (
              <FormControlLabel
                key={`options${index}`}
                control={<Checkbox disabled />}
                label={`${option.content ?? ''}${option.isRequired ? '*' : ''}`}
              />
            ))}
          </FormGroup>
        ) : null}
      </Box>
      <Box
        border="0.5px solid gray"
        width={450}
        height={150}
        marginLeft="auto"
        marginRight="auto"
        marginTop={3}
        p={2}
      >
        <img
          alt="signature"
          src={signature}
          style={{ margin: 'auto', display: 'block', width: '400px' }}
        />
      </Box>
    </>
  );
};
