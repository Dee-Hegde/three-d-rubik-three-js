import Three from './js/Three';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='cube'>
        <Three />
      </div>

      <div className='note'>
        <p className='deskotop-note'>click on cube and move cursor... </p>
        <p>
          © 2024 All rights reserved.
        </p>
        <p>Design and developed by Deepak Hegde</p>
      </div>
    </div>
  );
}

export default App;
