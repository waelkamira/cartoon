'use client';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const HtmlPage = () => {
  // استخدم useState لتخزين قيمة htmlString الديناميكية
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const htmlString =
      '<script async="async" data-cfasync="false" src="//thubanoa.com/1?z=8130767"></script>';

    setHtmlContent(htmlString);
  }, []);

  return <div>{parse(htmlContent)}</div>;
};

export default HtmlPage;
