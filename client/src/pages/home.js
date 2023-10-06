import '../components_resources/home.css';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div className='imagebg'>


        <div className='pageTitle'>
            Tic Tac Toe
        </div>
        <div className='subTitle'>
            <span> Choose your mode </span>
        </div>
        
        <div className="subBtn">
            {/* button to redirect to single player mode */}
         <Link to="/offline"> <button> {<span> Offline </span>} </button> </Link>
            </div>
          <div className='csvbtn'>
            {/* button to redirect to multi player mode */}
        <Link to="/online"> <button> {<span> Online </span>} </button> /</Link>
        </div>


        </div>
    );
}

export default Home;