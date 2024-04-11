import React from "react";
import './safariuser.css'

function SafariUser() {
    return(<div className="safari-user">
        <img src="/AppImages/floatingHead2.webp"/>
        <div className="main-page-p">
            Dear Safari User,<br/><br/>
            This site is in beta! While Safari is an excellent browser it lacks features & this website is currently optimizing its compatibility with it.<br/><br/> For the best experience, we recommend using Chrome or Firefox, which have been finely tuned for seamless browsing

            <a className="main-page-button-secondary">My Instagram</a>
            <a className="main-page-button-secondary">Download Chrome</a>
        </div>
        
    
       
    </div>)
}

export default SafariUser;