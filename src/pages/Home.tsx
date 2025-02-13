import { TextField, Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

import useDebounce from '../hooks/useDebounce';
import { useSearchContext } from '../hooks/useSearchContext';
import {
  StyledContainer,
  StyledAutocomplete,
  StyledOption,
} from './styledComponents';

const Homepage = () => {
  let navigate = useNavigate();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { setDisplayName } = useSearchContext();

  const { data, isValidating } = useSWR(() =>
    debouncedSearch
      ? `https://nominatim.openstreetmap.org/search?city=${debouncedSearch}&country=norway&addressdetails=1&format=json`
      : null,
  );

  const options = useMemo(() => {
    if (!data) return [];

    return data.map((item: any) => ({
      label: item.display_name,
      value: item,
    }));
  }, [data]);

  return (
    <StyledContainer>
      <Typography variant="overline" display="block" gutterBottom>
        Search for any city in Norway
      </Typography>

      <StyledAutocomplete
        options={options}
        filterOptions={(x) => x}
        loading={isValidating}
        onChange={(_, option: any) => {
          const longitude = parseFloat(option.value.lon).toFixed(4);
          const latitude = parseFloat(option.value.lat).toFixed(4);
          setDisplayName(option.label);
          navigate(`/forecast/${longitude}/${latitude}`);
        }}
        renderOption={(props, option: any) => (
          <StyledOption {...props} key={option.osm_id}>
            {option.label}
            <Typography variant="caption" display="block" gutterBottom>
              {option.value.type}
            </Typography>
          </StyledOption>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => setSearch(e.target.value)}
            label="Search"
          />
        )}
      />
    </StyledContainer>
  );
};

export default Homepage;
