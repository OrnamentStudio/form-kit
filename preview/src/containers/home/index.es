import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
  <article>
    <h1>Ornament Form Kit</h1>
    <Link to="/form">Forms</Link> <Link to="/inputs">Inputs</Link>
  </article>
);

export default Home;
