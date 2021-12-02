import styled from '@emotion/styled';
import {
  AccordionDetails,
  AccordionDetailsProps,
  Typography,
  TypographyProps,
  Card,
  CardProps,
} from '@mui/material';

const DayTypography = styled(Typography)<TypographyProps>({
  textTransform: 'capitalize',
  width: '100%',
});

const DayDetails = styled(Card)<CardProps>({
  '& .time, & .temperature, & .wind': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '.5rem',
    borderBottom: '1px solid grey',
  },
  '& .wind': {
    border: '0',
  },
});

const ForecastContainer = styled('div')({
  padding: '1rem',
  width: '100%',
});

const StyledAccordionDetails = styled(AccordionDetails)<AccordionDetailsProps>({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat( auto-fill, minmax(100px, 1fr) )',
});

export { DayTypography, DayDetails, ForecastContainer, StyledAccordionDetails };
