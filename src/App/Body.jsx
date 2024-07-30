import Home from './BodyComponents/Home.jsx'

const Body = ({page}) => {
  
  return (
    <div>
      {page === 1 ? <Home/> : ''}
      {page === 2 ? 'Search' : ''}
      {page === 3 ? 'Profile' : ''}
      {page === 4 ? 'Upload' : ''}
    </div>
  );
};

export default Body;
