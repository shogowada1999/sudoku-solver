import './Footer.min.css';
import './Card.min.css';

import {Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithubSquare, faLine, faTwitterSquare} from '@fortawesome/free-brands-svg-icons';
import {faRobot, faLightbulb, faCheck} from '@fortawesome/free-solid-svg-icons';

const iconLine = <FontAwesomeIcon icon={faLine} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitterSquare} />;
const iconRobot = <FontAwesomeIcon icon={faRobot} />;
const iconLightbulb = <FontAwesomeIcon icon={faLightbulb} />;
const iconGithubSquare = <FontAwesomeIcon icon={faGithubSquare} />;
const iconCheck = <FontAwesomeIcon icon={faCheck} />;

const leftTitles = [
    {
        en: "How to use Solver Mode",
        ja: "Solver Mode の使い方",
    },{
        en: "How to use Challenger Mode",
        ja: "Challenger Mode の使い方",
    }
];

const rightTitles = [
    {
        en: "About each button",
        ja: "各ボタンの使い方",
    },{
        en: "About each button",
        ja: "各ボタンの使い方",
    }
];

const leftSolver = [
    {
        id: 1,
        en: "Enter the Sudoku you want to solve.",
        ja: "解決したい数独問題を入力して下さい。",
    },{
        id: 2,
        en: "Double-click the cell you want to enter and enter an integer from 1 to 9.",
        ja: "入力したいマスをダブルクリックして1~9の整数を入力して下さい。",
    },{
        id: 3,
        en: "Press [Run] when you're done.",
        ja: "入力が完了したら [Run] を押して下さい。" ,
    },{
        id: 4,
        en: "If it is a solveable Sudoku, the solution will be displayed.",
        ja: "解決可能な数独であれば解が表示されます。",
    },{
        id: 5,
        en: "When you press the [Test] button, Sudoku will be randomly entered.",
        ja: "[Test] ボタンを押すと数独の問題がランダムに入力されます。",
    }
];

const leftChallenger = [
    {
        id: 1,
        en: "Please select the difficulty level first.",
        ja: "最初に難易度を選択して下さい。",
    },{
        id: 2,
        en: "The difficulty level of Sudoku can be selected from three types: [Easy], [Normal], and [Hard].",
        ja: "数独の難易度は [Easy], [Normal], [Hard] の三種類から選択可能です。",
    },{
        id: 3,
        en: "Tips for solving Sudoku are displayed in the comment area.",
        ja: "コメントエリアには数独を解くためのヒントが表示されます。",
    },{
        id: 4,
        en: "Double-click the cell you want to enter and enter an integer from 1 to 9.",
        ja: "入力したいマスをダブルクリックして1~9の整数を入力して下さい。",
    },{
        id: 5,
        en: "If there is only one number that can be entered, it will be displayed as 'SECRET'.",
        ja: "入力可能な数字が一つしかない場合は 'SECRET' と表示されます。"
    },
];

const rightSolver = [
    {
        id: 1,
        en: "Press the [Challenger] button to switch to Challenger mode.",
        ja: "[Challenger] ボタンを押すとChallengerモードに移行します。",
    },{
        id: 2,
        en: "You can switch to Japanese from the [English] button.",
        ja: "[Japanese] ボタンから英語との切り替えが可能です。",
    },{
        id: 3,
        en: "You can clear the data by pressing the [Clear] button.",
        ja: "[Clear] ボタンを押すとデータの消去ができます。",
    },{
        id: 4,
        en: "When you press the [Test] button, Sudoku will be randomly entered.",
        ja: "[Test] ボタンを押すと数独の問題がランダムに入力されます。",
    },{
        id: 5,
        en: "Press the [Run] button to solve the Sudoku.",
        ja: "[Run] ボタンを押すと数独問題を解きます。",
    },
];

const rightChallenger = [
    {
        id: 1,
        en: "Press the [Solver] button to switch to Solver mode.",
        ja: "[Solver] ボタンを押すとSolverモードに移行します。",
    },{
        id: 2,
        en: "You can switch to Japanese from the [English] button.",
        ja: "[Japanese] ボタンから英語との切り替えが可能です",
    },{
        id: 3,
        en: "Pressing the [Easy] button will bring up a easy level Sudoku.",
        ja: "[Easy] ボタンを押すと簡単な数独問題が表示されます。",
    },{
        id: 4,
        en: "Pressing the [Normal] button will bring up a middle level Sudoku.",
        ja: "[Normal] ボタンを押すと中程度の数独問題が表示されます。",
    },{
        id: 5,
        en: "Pressing the [Hard] button will bring up a difficult level Sudoku.",
        ja: "[Hard] ボタンを押すと難しい数独問題が表示されます。",
    },{
        id: 6,
        en: "You can clear the data by pressing the [Clear] button.",
        ja: "[Clear] ボタンを押すとデータの消去ができます。",
    },{
        id: 7,
        en: "You can go back next step by pressing the [Redo] button.",
        ja: "[Redo] ボタンを押すと一つ先に戻ることができます。",
    },{
        id: 8,
        en: "You can go back previous step by pressing the [Undo] button.",
        ja: "[Undo] ボタンを押すと一つ前に戻ることができます。",
    },
];

var year = new Date().getFullYear();

function Title(props){
    const titles = props.titles;
    const isSolver = props.isSolver;
    const isEnglish = props.isEnglish;
    let title ;
    if(isSolver && isEnglish){
        title = titles[0].en;
    }else if(isSolver && !isEnglish){
        title = titles[0].ja;
    }else if(!isSolver && isEnglish){
        title = titles[1].en;
    }else if(!isSolver && !isEnglish){
        title = titles[1].ja;
    }else{
        return null;
    }
    return(
        <span>{title}</span>
    );
}

function TextList(props){
    const texts = props.texts;
    const isEnglish = props.isEnglish;
    const listItems = texts.map((text) =>
        <li key={text.id.toString()}>
            {isEnglish ? text.en : text.ja}
        </li>
    );
    return(
        <ol>{listItems}</ol>
    );
}

function Footer(props){
    const isSolver = props.isSolver;
    const isEnglish = props.isEnglish;

    return(
        <footer>
            <Container fluid>
                <Row>
                    <Col xs={12} className="share-text"><h3>=== SHARE ===</h3></Col>
                </Row>
                <Row>
                    <Col className="share-btns" xs={12}>
                        <div className="share-btn">
                            <a href="https://twitter.com/share?
                                url=https://shogowada1999.github.io/sudoku-solver/&
                                text=Sudoku Solver created by Shogo Wada"
                                rel="nofollow noreferrer"
                                target="_blank"
                                className="btn-twitter"
                            >
                                {iconTwitter}
                            </a>
                        </div>
                        <div className="share-btn">
                            <a href="https://social-plugins.line.me/lineit/share?url=https://shogowada1999.github.io/sudoku-solver/" className="btn-line">{iconLine}</a>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col className="wrap" xs={12} md={6}>
                        <div className="Card">
                            <h2>
                                {isSolver ? iconRobot : iconLightbulb}
                                <Title titles={leftTitles} isSolver={isSolver} isEnglish={isEnglish} />
                            </h2>
                            <TextList
                                texts={isSolver ? leftSolver : leftChallenger}
                                isEnglish={isEnglish}
                            />
                        </div>
                    </Col>
                    <Col className="wrap" xs={12} md={6}>
                        <div className="Card">
                            <h2>
                                {iconCheck}
                                <Title titles={rightTitles} isSolver={isSolver} isEnglish={isEnglish} />
                            </h2>
                            <TextList
                                texts={isSolver ? rightSolver : rightChallenger}
                                isEnglish={isEnglish}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col className="credit" xs={{span: 6, offset: 3}}>
                        <small>Copyright © {year} <a href="https://wadablog.net/" className="credit-link">Shogo Wada</a></small>
                    </Col>
                    <Col className="icon-box" xs={3}>
                        <a href="https://github.com/shogowada1999">{iconGithubSquare}</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
