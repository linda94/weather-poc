import {
  Accordion,
  AccordionSummary,
  Skeleton,
  Typography,
} from '@mui/material';
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
import Repeat from '../../components/Repeat';
import { useSearchContext } from '../../hooks/useSearchContext';

const ForecastSkeleton = () => (
  <Repeat times={3}>
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <DayTypography>
          <Skeleton animation="wave" width="50%" />
        </DayTypography>
      </AccordionSummary>

      <StyledAccordionDetails>
        <Repeat times={6}>
          <DayDetails>
            <div className="time">
              <Skeleton animation="wave" width="100%" />
            </div>
            <div className="temperature">
              <Skeleton animation="wave" width="100%" />
            </div>
            <div className="wind">
              <Skeleton animation="wave" width="100%" />
            </div>
          </DayDetails>
        </Repeat>
      </StyledAccordionDetails>
    </Accordion>
  </Repeat>
);

const Forecast = () => {
  const { lat, lon } = useParams();
  const { displayName } = useSearchContext();
  const { data, isValidating } = useSWR(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lon=${lon}&lat=${lat}`,
  );

  const { data: reverseData } = useSWR(
    `https://nominatim.openstreetmap.org/reverse?lon=${lon}&lat=${lat}&format=json`,
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
      {!data && isValidating && <ForecastSkeleton />}

      {sortedDays && Object.keys(sortedDays).length > 0 && (
        <>
          <Typography variant="overline" display="block" gutterBottom>
            Showing forecast for: {displayName || reverseData?.address.town}
          </Typography>

          {Object.entries(sortedDays).map(([day, value]) => (
            <Accordion defaultExpanded key={day}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <DayTypography>{day}</DayTypography>
              </AccordionSummary>

              <StyledAccordionDetails>
                {value.map((timeEntry: any) => (
                  <DayDetails key={timeEntry.time}>
                    <div className="time">
                      <AccessTimeOutlinedIcon />
                      {new Date(timeEntry.time).toLocaleString(undefined, {
                        hour: '2-digit',
                      })}
                    </div>
                    <div className="temperature">
                      {Math.round(
                        timeEntry.data.instant.details.air_temperature,
                      )}
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
        </>
      )}
    </ForecastContainer>
  );
};

export default Forecast;
