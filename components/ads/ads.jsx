import React from 'react';
import parse from 'html-react-parser';

const HtmlPage = () => {
  const htmlString =
    "<script>(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://zovidree.com/tag.min.js',8131859,document.body||document.documentElement)</script>";

  // return <div>{parse(htmlString)}</div>;
};

export default HtmlPage;
