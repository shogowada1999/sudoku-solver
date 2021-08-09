import React from 'react';

import './App.min.css';
import './Header.min.css';
import './Navigation.min.css';
import './Button.min.css';

import Main from './Main';
import Footer from './Footer';

import {Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRobot, faLightbulb, faLanguage} from '@fortawesome/free-solid-svg-icons';

const iconRobot = <FontAwesomeIcon icon={faRobot} />;
const iconLightbulb = <FontAwesomeIcon icon={faLightbulb} />;
const iconLanguage = <FontAwesomeIcon icon={faLanguage} />;

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSolver: true,
            isEnglish: true,
        };
        this.MainRef = React.createRef();
    }

    changeMode(e){
        let isSolver = this.state.isSolver;
        if(e !== isSolver){
            isSolver = !isSolver;
        }

        this.MainRef.current.clearState();

        this.setState({
            isSolver: isSolver,
        });
    }

    changeLanguage(){
        const isEnglish = !this.state.isEnglish;
        this.setState({
            isEnglish: isEnglish,
        });
    }

    render(){
        const props = {
            isSolver: this.state.isSolver,
            isEnglish: this.state.isEnglish,
        };

        return(
            <div>
                <header>
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <h1>Sudoku Solver</h1>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid>
                        <nav className="Navigation">
                            <button
                                onClick={() => this.changeMode(true)}
                                className={props.isSolver ? "active" : "inactive"}
                            >
                                {iconRobot} Solver
                            </button>
                            <button
                                onClick={() => this.changeMode(false)}
                                className={props.isSolver ? "inactive" : "active"}
                            >
                                {iconLightbulb} Challenger
                            </button>
                            <button
                                onClick={() => this.changeLanguage()}
                                className="normal"
                            >
                                {iconLanguage} {props.isEnglish ? "English" : "Japanese"}
                            </button>
                        </nav>
                    </Container>
                </header>
                <Main ref={this.MainRef} {...props} />
                <Footer {...props} />
            </div>
        );
    }
}

export default App;
