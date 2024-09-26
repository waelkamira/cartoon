'use client';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const HtmlPage = ({ linkChanged }) => {
  // استخدم useState لتخزين قيمة htmlString الديناميكية
  const [htmlContent, setHtmlContent] = useState('');

  console.log('linkChanged', linkChanged);
  useEffect(() => {
    // تحديث قيمة htmlContent عند تغير linkChanged
    const htmlString =
      '<script async="async" data-cfasync="false" src="//thubanoa.com/1?z=8130767"></script>';

    setHtmlContent(htmlString); // قم بتحديث محتوى الـ html عند تغير linkChanged
  }, [linkChanged]);

  return <div>{parse(htmlContent)}</div>;
};

export default HtmlPage;
