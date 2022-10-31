import React from 'react';
import './Home.css'
const Newsleter = () => {
    return (
        <div>
            <div className='newsletter mt-3'>
                <h4>Stay in the Loop</h4>
                <p>Subscribe to my newsletter for all the latest updates</p>
                <div class="input-group">
         <input type="email" class="form-control" placeholder="Enter your email"/>
         <span class="input-group-btn">
         <button class="btn" type="submit">Subscribe Now</button>
         </span>
          </div>
            </div>
        </div>
    );
};

export default Newsleter;