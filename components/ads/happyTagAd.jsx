import React from 'react';
import parse from 'html-react-parser';

const HtmlPage = () => {
  const htmlString =
    '<script async="async" data-cfasync="false" src="//thubanoa.com/1?z=8130767"></script>';

  return <div>{parse(htmlString)}</div>;
};

export default HtmlPage;
