class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="index.html">Exclusivity</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
                        </button>

                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active"><a href="#section-home" className="nav-link">Home</a></li>
                                <li className="nav-item"><a href="#section-features" className="nav-link">Features</a></li>
                                <li className="nav-item"><a href="#section-services" className="nav-link">Services</a></li>
                                <li className="nav-item"><a href="#section-pricing" className="nav-link">Pricing</a></li>
                                <li className="nav-item"><a href="#section-about" className="nav-link">About</a></li>
                                <li className="nav-item"><a href="#section-contact" className="nav-link">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}