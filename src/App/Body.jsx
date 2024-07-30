import Explore from './BodyComponents/Explore.jsx'
import All from './BodyComponents/All.jsx'


const Body = (props) => {
  
  return (
    <div>
      {props.page === 1 ? <Explore/> : ''}
      {props.page === 2 ? <Explore/> : ''}
      {props.page === 3 ? <Explore/> : ''}
      {props.page === 4 ? <Explore/> : ''}
    </div>
  );
};

export default Body;
