import jumboImage from '../../assets/images/jumbo.png';

const Jumbotron = () => (
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
        <button type="button" className="btn">Explore &#10141;</button>
      </div>
      <div className="col-2">
        <img src={jumboImage} alt="" />
      </div>
    </div>
  </div>
);
export default Jumbotron;
