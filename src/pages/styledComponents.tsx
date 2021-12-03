import styled from '@emotion/styled';
import { Autocomplete } from '@mui/material';

const StyledContainer = styled('div')({
  flexDirection: 'column',
  padding: '1rem',
  flex: 1,
  display: 'flex',
});

const StyledAutocomplete = styled(Autocomplete)({
  width: '100%',
});

const StyledOption = styled('li')({
  '&&': {
    flexDirection: 'column',
    textTransform: 'capitalize',
    width: '100%',
    alignItems: 'flex-start',
  },
});

export { StyledContainer, StyledAutocomplete, StyledOption };
