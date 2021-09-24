import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../pages/notfound/NotFound';

const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  let pageName = '';

  if (localStorage.getItem('access_token')) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }

  return generatePage(pageName);
};

export default PageRender;
