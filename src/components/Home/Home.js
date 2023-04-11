export const Home = () => {

    return (
        <section id="welcome-world">
            <video id="background-video" autoPlay repeat="true" preload="true" muted src='../../images/mechanic2.mp4' type="video/mp4">
            </video>
            <div className="welcome-message">
                <h2>GermanMechanics.de</h2>
                <h3>The place where you can offer your skills!</h3>
            </div>
            <div className="image-home"></div>
        </section>
    );
}