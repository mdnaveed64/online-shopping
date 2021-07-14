import React from 'react';

interface IProps{}

let Footer:React.FC<IProps> = () => {
    return (
        <React.Fragment>
           <footer className="bg-dark text-white text-center p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3">Online Shopping React &copy; 2021</p>
                            <h6>All Rights Reserved</h6>
                            <h6>Developed & Maintained by
                                <a href="http://www.uibrains.com" target="_blank" className="text-brown"> UiBrains Team</a>
                            </h6>
                        </div>
                    </div>
                </div>
           </footer>
        </React.Fragment>
    );
};
export default Footer;