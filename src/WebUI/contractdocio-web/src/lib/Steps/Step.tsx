import MuiStepLabel from '@mui/material/StepLabel';
import MuiStep, { StepProps } from '@mui/material/Step';

export interface IStep extends StepProps {
  title: string;
  key: string;
}

export default ({ title, ...rest }: IStep): JSX.Element => {
  return (
    <MuiStep {...rest}>
      <MuiStepLabel>{title}</MuiStepLabel>
    </MuiStep>
  );
};
