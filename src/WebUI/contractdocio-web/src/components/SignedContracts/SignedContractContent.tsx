import { FormControlLabel, FormGroup, Typography } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { CheckOptionDto } from '@/api/web-api-client';
import { Box, Checkbox, EmailChip } from '@/lib';

interface ISignedContractPreview {
  content?: string;
  title?: string;
  showSignature: boolean;
  checkOptions?: CheckOptionDto[];
  signature?: string;
  toEmail: string;
  fromEmail: string;
  signed?: string;
}

export default ({
  title,
  toEmail,
  fromEmail,
  content,
  checkOptions,
  showSignature,
  signature,
  signed
}: ISignedContractPreview): JSX.Element => {
  return (
    <>
      <Typography variant="body1" mb={1}>
        <strong>To:&nbsp;</strong> <EmailChip email={toEmail} />
      </Typography>
      <Typography variant="body1">
        <strong>From:&nbsp;</strong>
        <EmailChip email={fromEmail} />
      </Typography>
      <Typography variant="h5" align="center">
        <strong>
          <u>{title}</u>
        </strong>
      </Typography>
      <ReactQuill theme="bubble" readOnly value={content} />
      {checkOptions?.length && showSignature && (
        <FormGroup>
          {checkOptions
            ?.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
            .map((option, index) => (
              <FormControlLabel
                key={`options${index}`}
                control={<Checkbox disabled checked={option.isChecked} />}
                label={`${option.content ?? ''}${option.isRequired ? '*' : ''}`}
              />
            ))}
        </FormGroup>
      )}
      <Box width={450} height={200} marginLeft="auto" marginRight="auto">
        <Box
          border="0.5px solid gray"
          width={450}
          height={150}
          marginLeft="auto"
          marginRight="auto"
          marginTop={3}
          p={2}
        >
          {showSignature && signature && (
            <img
              alt="signature"
              src={signature}
              style={{ margin: 'auto', display: 'block', width: '400px' }}
            />
          )}
        </Box>
        <Typography variant="overline">Date: {signed ?? ''}</Typography>
      </Box>
    </>
  );
};
