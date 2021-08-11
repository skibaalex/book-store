import { useHistory } from 'react-router';
import jumboImage from '../../assets/images/jumbo.png';

const Jumbotron = () => {
  const history = useHistory();
  return (
    <div className="jumbotron">
      <div className="row">
        <div className="col-2">
          <h1>
            Lorem ipsum
            <br />
            amet adipisicing elit
          </h1>
          <p>
            Beatae doloribus aut numquam quo itaque quas.
            {' '}
            <br />
            Repudiandae maxime necessitatibus iure voluptatibus,
            perferendis voluptatem.
          </p>
          <button onClick={() => history.push('/books')} type="button" className="btn">Explore &#10141;</button>
        </div>
        <div className="col-2">
          <img src={jumboImage} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Jumbotron;
