import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from './Stack';

interface ISuccessResult {
  title: string;
  description: string;
  actions?: ReactNode[];
}

export default ({
  title,
  description,
  actions
}: ISuccessResult): JSX.Element => {
  return (
    <Box py={5}>
      <CheckCircleIcon
        color="success"
        style={{
          fontSize: '72px',
          display: 'block',
          margin: 'auto'
        }}
      />

      <Typography align="center" variant="h5">
        <strong>{title}</strong>
      </Typography>

      <Typography
        align="center"
        variant="body2"
        fontWeight="light"
        gutterBottom
      >
        {description}
      </Typography>
      <Stack justifyContent="center">{actions?.map((action) => action)}</Stack>
    </Box>
  );
};
