import React from 'react';

const Repeat = ({
  times,
  children,
}: {
  times: number;
  children: React.ReactNode;
}) => {
  return <>{Array(times).fill(children)}</>;
};

export default Repeat;
