import { Accordion, AccordionSummary } from '@mui/material';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';

import {
  DayTypography,
  DayDetails,
  ForecastContainer,
  StyledAccordionDetails,
} from './styledComponents';

const Forecast = () => {
  const { lat, lon } = useParams();
  const { data } = useSWR(
    `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`,
  );

  const sortedDays = useMemo(() => {
    if (!data) return;
    const grouped: { [key: string]: any } = {};

    data.properties.timeseries.forEach((time: any) => {
      const localeString = new Date(time.time).toLocaleString(undefined, {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
      });
      if (!grouped[localeString]) grouped[localeString] = []; // if day does not exist in object, create one
      grouped[localeString].push(time); // push time to array of which day it belongs to
    });

    return grouped;
  }, [data]);

  return (
    <ForecastContainer>
      {sortedDays &&
        Object.keys(sortedDays).length > 0 &&
        Object.entries(sortedDays).map(([day, value]) => (
          <Accordion defaultExpanded key={day}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <DayTypography>{day}</DayTypography>
            </AccordionSummary>

            <StyledAccordionDetails>
              {value.map((timeEntry: any) => (
                <DayDetails>
                  <div className="time">
                    <AccessTimeOutlinedIcon />
                    {new Date(timeEntry.time).toLocaleString(undefined, {
                      hour: '2-digit',
                    })}
                  </div>
                  <div className="temperature">
                    {Math.round(timeEntry.data.instant.details.air_temperature)}
                    &#8451;
                  </div>
                  <div className="wind">
                    <AirOutlinedIcon />
                    {Math.round(timeEntry.data.instant.details.wind_speed)}
                  </div>
                </DayDetails>
              ))}
            </StyledAccordionDetails>
          </Accordion>
        ))}
    </ForecastContainer>
  );
};

export default Forecast;
