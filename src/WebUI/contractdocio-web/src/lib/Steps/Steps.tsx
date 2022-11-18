import Box from '@mui/material/Box';
import MuiStepper, { StepperProps } from '@mui/material/Stepper';
import { useMemo } from 'react';
import Step, { IStep } from './Step';

interface IStepper extends StepperProps {
  steps: IStep[];
  currentStep: string;
}

export default ({
  steps = [],
  currentStep,
  ...rest
}: IStepper): JSX.Element => {
  const activeStep = useMemo(
    () => steps.findIndex((item) => currentStep === item.key),
    [currentStep, steps]
  );

  return (
    <Box mb={3}>
      <MuiStepper activeStep={activeStep} {...rest}>
        {steps.map((step) => (
          <Step {...step} />
        ))}
      </MuiStepper>
    </Box>
  );
};
