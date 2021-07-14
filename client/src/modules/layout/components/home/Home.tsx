import React from 'react';

interface IProps{}

let Home:React.FC<IProps> = () => {
    return (
        <React.Fragment>
            <div className="landing-page">
                <div className="wrapper">
                    <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                        <h5 className="display-3">Online Shopping React</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid amet atque consectetur, consequatur consequuntur, corporis cupiditate deserunt distinctio ducimus eaque eius explicabo facere hic laboriosam magnam magni necessitatibus nobis non obcaecati odit optio quam quibusdam quod repudiandae sapiente temporibus totam ullam vitae voluptas? Ad dolorum quia rem vitae voluptatum.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Home;