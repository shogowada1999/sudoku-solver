import React from 'react';

import './Left.min.css';
import './Right.min.css';
import './Sudoku.min.css';
import './Comment.min.css';
//
import {Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faUndo, faRedo, faPlay, faCalculator, faSmile, faMeh, faDizzy} from '@fortawesome/free-solid-svg-icons';

import * as R from 'ramda';

const iconTrash = <FontAwesomeIcon icon={faTrashAlt} />;
const iconUndo = <FontAwesomeIcon icon={faUndo} />;
const iconRedo = <FontAwesomeIcon icon={faRedo} />;
const iconPlay = <FontAwesomeIcon icon={faPlay} />;
const iconSmile = <FontAwesomeIcon icon={faSmile} />;
const iconMeh = <FontAwesomeIcon icon={faMeh} />;
const iconDizzy = <FontAwesomeIcon icon={faDizzy} />;
const iconCalculator = <FontAwesomeIcon icon={faCalculator} />;

// ==============================================

const unit1 = R.splitEvery(9, R.range(0, 81));
const unit2 = Object.values(R.groupBy(R.flip(R.modulo)(9))(R.range(0, 81)));
const baseBox = n => [n, n+1, n+2, n+9, n+10, n+11, n+18, n+19, n+20];
const unit3 = [0, 3, 6, 27, 30, 33, 54, 57, 60].map(baseBox);
const units = [...unit1, ...unit2, ...unit3];
const peers = R.range(0, 81).map((i) => {
    const myUnits = units.filter(u => u.includes(i));
    return R.uniq(R.flatten(myUnits)).filter(n => n !== i);
});

// assign() can fail when contradiction occurs
const assign = (pos, val, values) => {
    if(!values) return false;
    return R.reduce(
        (acc, x) => (acc ? eliminate(pos, x, acc) : R.reduced(false)),
        values,
        values[pos].replace(val, ''),
    );
};

// eliminate() can fail when contradiction occurs
const eliminate = (pos, val, values) => {
    if(!values) return false;
    if(!values[pos].includes(val)) return values; // do nothing
    let work = R.clone(values);
    work[pos] = work[pos].replace(val, ''); // do eliminate
    if(work[pos].length === 0) return false; // check contradictions
    // check if something will be triggered
    if(work[pos].length === 1){ // pattern 1
        const fixed = work[pos];
        for (const peer of peers[pos]){
            work = eliminate(peer, fixed, work);
            if(!work) return false;
        }
    }
    return work;
};

const load = (str) => {
    let values = R.range(0, 81).map(() => '123456789');
    const parsed = [...str].filter(x => [...'.0123456789'].includes(x));
    if(parsed.length !== 81){
        return null;
    }
    for(const [i, val] of parsed.entries()){
        if(val === '0' || val === '.') continue;
        values = assign(i, val, values);
        if(!values) return false;
    }
    return values;
};

const findMinValuesPosition = (values) => {
    const arr = values.map((val, i) => [i, val.length]).filter(x => x[1] > 1);
    arr.sort((a, b) => a[1] - b[1]);
    return arr[0][0];
};

const search = (values) => {
    if(!values) return false; // faild last setTimeout(function () {
    if(R.all(v => v.length === 1)(values)) return values; // solved
    const pos = findMinValuesPosition(values);
    for(const val of values[pos]){
        const ret = search(assign(pos, val, values));
        if(ret) return ret;
    }
    return false;
};

// =============================================

const dataEasy = [
    [3,null,null,null,null,null,null,4,null,9,2,4,6,null,5,1,null,3,1,null,null,7,null,4,5,2,null,null,null,2,null,4,9,null,1,6,null,4,9,8,1,null,2,null,null,null,6,null,null,null,null,null,9,null,2,null,5,9,7,null,null,6,4,null,9,null,1,null,3,null,5,2,null,7,null,4,5,null,9,8,1,],
    [null,null,null,3,9,null,1,6,null,6,2,null,null,1,null,5,null,3,3,5,null,8,6,2,4,null,7,1,8,null,5,3,4,null,7,null,7,null,null,6,2,9,null,null,null,5,null,2,null,8,null,6,3,null,9,1,null,null,null,null,7,null,6,4,null,3,1,null,null,null,null,null,2,6,null,9,null,8,null,null,1,],
    [1,null,9,4,null,7,null,null,null,null,null,null,9,3,null,null,4,1,null,null,3,8,null,null,9,null,null,4,null,7,null,null,9,null,3,2,null,8,null,null,null,1,null,null,4,null,null,1,null,5,null,null,6,null,8,null,null,5,2,null,null,null,null,2,7,null,null,null,6,null,5,3,null,null,5,null,null,null,null,null,null,],
];

const dataNormal = [
    [null,null,null,null,null,null,null,null,7,7,null,8,2,null,null,3,null,null,1,3,5,6,4,null,null,8,9,8,null,null,null,null,5,7,9,null,null,null,null,null,3,null,null,2,5,null,1,2,null,null,8,null,null,null,6,null,null,null,null,null,1,null,8,null,8,null,9,6,null,null,null,2,null,null,7,null,5,null,null,6,3,],
    [null,null,null,null,6,null,1,null,9,6,null,null,7,9,null,null,2,null,null,5,null,null,null,1,null,null,null,null,7,1,null,null,6,null,null,2,4,null,null,null,null,null,6,5,1,null,null,null,null,null,null,null,null,null,null,6,null,null,null,7,null,null,5,null,null,null,null,null,null,4,null,null,null,null,4,null,2,8,null,null,3,],
    [9,null,null,6,null,null,null,null,8,null,null,null,null,null,null,null,3,null,null,null,null,null,8,2,1,null,7,5,4,null,null,null,null,null,null,1,null,null,null,null,2,null,5,null,null,7,1,null,null,null,null,null,null,4,null,null,null,5,null,null,null,2,null,null,null,7,null,null,9,null,null,null,null,9,null,1,null,6,null,null,null,],
];

const dataHard = [
    [null,1,null,9,null,8,null,null,2,null,null,null,null,null,null,4,null,3,null,null,null,null,null,3,null,null,null,null,null,1,null,null,4,8,null,null,8,3,null,null,null,null,7,5,null,null,null,null,null,6,null,null,null,null,4,null,7,null,null,null,null,null,null,2,null,null,null,null,7,5,null,null,null,null,null,2,null,null,null,6,null,],
    [null,6,null,5,9,null,null,null,2,8,3,null,null,1,null,null,null,null,null,null,2,null,null,null,null,7,null,null,null,4,null,null,null,7,2,null,9,null,3,null,null,null,6,null,null,null,null,null,null,null,1,null,null,null,null,2,9,8,null,null,null,null,6,null,7,null,null,null,null,4,null,null,null,null,8,1,null,null,null,null,null,],
    [null,null,null,9,null,null,null,3,5,8,5,2,null,null,6,1,null,null,null,null,null,null,null,null,null,6,null,null,8,6,null,9,null,null,null,null,3,2,null,null,null,null,null,4,null,null,null,null,3,2,null,null,null,9,null,null,null,1,6,null,null,null,null,null,null,null,null,8,4,null,null,null,null,3,4,null,null,null,null,null,null,],
    [8,5,null,null,null,2,4,null,null,7,2,null,null,null,null,null,null,9,null,null,4,null,null,null,null,null,null,null,null,null,1,null,7,null,null,2,3,null,5,null,null,null,9,null,null,null,4,null,null,null,null,null,null,null,null,null,null,null,8,null,null,7,null,null,1,7,null,null,null,null,null,null,null,null,null,null,3,6,null,4,null,],
    [null,null,5,3,null,null,null,null,null,8,null,null,null,null,null,null,2,null,null,7,null,null,1,null,5,null,null,4,null,null,null,null,5,3,null,null,null,1,null,null,7,null,null,null,6,null,null,3,2,null,null,null,8,null,null,6,null,5,null,null,null,null,9,null,null,4,null,null,null,null,3,null,null,null,null,null,null,9,7,null,null,],
];

const magicSquare = [
    [null,null,null,null,null,null,null,null,null,null,2,null,null,7,null,null,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,9,null,null,5,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,null,null,3,null,null,8,null,null,null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,null,null,2,null,null,9,null,null,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,7,null,null,5,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,1,null,null,8,null,null,null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,null,null,4,null,null,3,null,null,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,9,null,null,5,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,2,null,null,7,null,null,6,null,null,null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,null,null,4,null,null,9,null,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,3,null,null,5,null,null,7,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,8,null,null,1,null,null,6,null,null,null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,null,null,6,null,null,1,null,null,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,7,null,null,5,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,2,null,null,9,null,null,4,null,null,null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,null,null,6,null,null,7,null,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1,null,null,5,null,null,9,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,8,null,null,3,null,null,4,null,null,null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,null,null,8,null,null,1,null,null,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,3,null,null,5,null,null,7,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,null,null,9,null,null,2,null,null,null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,null,null,8,null,null,3,null,null,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1,null,null,5,null,null,9,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,null,null,7,null,null,2,null,null,null,null,null,null,null,null,null,null,],
];

const messages = [
    [
        {
            en: 'Do you want to erase the data?',
            ja: 'データを消去しますか？',
        },
    ],[
        {
            en: 'Do you want to overwrite the data?',
            ja: 'データを上書きしますか？',
        },
    ]
];

const comments = [
    [
        {
            en: 'Welcome to Solver Mode !',
            ja: 'Solver Mode へようこそ！',
        },{
            en: 'Press the "Run" when you have finished enterring the values.',
            ja: '入力が完了したら "Run" を押してください。',
        },{
            en: 'Complete !! Press the "Clear" to solve the new Sudoku.',
            ja: '完了しました。新しい数独を解くには "Clear" を押してください。',
        },{
            en: 'This Sudoku connnot be solved. Please enter the correct value.',
            ja: 'この数独は解けません。正しい値を入力してください。',
        },
    ],[
        {
            en: 'Welcome to Challenger Mode ! Select a Sudoku level.',
            ja: 'Challenger Mode へようこそ！ 数独のレベルを選択してください。',
        },{
            en: '=== MAGIC SQUARE ===',
            ja: '=== 魔法陣 ===',
        },{
            en: 'Game clear!! Press the "Clear" to solve the new Sudoku.',
            ja: 'ゲームクリア！新しい数独を解くには "Clear" を押してください。',
        },{
            en: 'There is something wrong. Please solve it again.',
            ja: 'どこか間違いがあります。解き直して下さい。',
        },{
            en: 'LEVEL : : ',
            ja: 'LEVEL : : ',
        },{
            en: 'Selectable numbers : : ',
            ja: '選択可能な数字 : : ',
        },
    ]
];

function selectRandomData(dataSudoku){
    let random = Math.floor(Math.random() * dataSudoku.length);
    return dataSudoku[random];
}

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(81).fill(null),
                lock: [],
            }],
            step: 0,
            edit: null,
            possible: true,
            finish: false,
            level: null,
        };
    }

    addDetailChallenger(comment){
        const edit = this.state.edit;
        const level = this.state.level;
        let newComment = '';

        if(typeof(edit) === 'number'){
            newComment = comment + this.getHintNumbers();
            return newComment;
        }else if(edit === null && comment === 'LEVEL : : '){
            if(level === 'easy'){
                newComment = comment + 'EASY';
            }else if(level === 'normal'){
                newComment = comment + 'NORMAL';
            }else if(level === 'hard'){
                newComment = comment + 'HARD';
            }else{
                newComment = comment + '???';
            }
            return newComment;
        }else{
            return comment;
        }
    }

    changeData(numberData){
        let stringData = '';

        for(let i = 0; i < numberData.length; i++){
            if(numberData[i] == null){
                stringData = stringData + '.';
            }else{
                stringData = stringData + String(numberData[i]);
            }
        }
        return stringData;
    }

    clearState(){
        this.setState({
            history: [{
                squares: Array(81).fill(null),
                lock: [],
            }],
            step: 0,
            edit: null,
            possible: true,
            finish: false,
            level: null,
        });
    }

    commentSolverMode(){
        const exist = this.judgeExistData();
        const possible = this.state.possible;
        const finish = this.state.finish;
        let comment;

        if(!exist){
            comment = comments[0][0];
        }else if(exist && possible && !finish){
            comment = comments[0][1];
        }else if(finish && possible){
            comment = comments[0][2];
        }else if(!possible){
            comment = comments[0][3];
        }

        return comment;
    }

    commentChallengerMode(){
        const exist = this.judgeExistData();
        const edit = this.state.edit;
        const isSolved = this.solveSudoku();
        const dataNull = this.searchNullData();
        const isMagic = this.judgeMagicSquare();
        let comment;

        if(!exist && edit === null){
            comment = comments[1][0];
        }else if(isMagic){
            comment = comments[1][1];
        }else if(dataNull === 0 && isSolved){
            comment = comments[1][2];
        }else if(dataNull <= 20 && isSolved === false){
            comment = comments[1][3];
        }else if(exist && edit === null){
            comment = comments[1][4];
        }else if(typeof(edit) === 'number'){
            comment = comments[1][5];
        }else{
            comment = '';
        }

        return comment;
    }

    createAssistInfo(selectedNumbers){
        let hintNumbers = '';

        if(selectedNumbers == null){
            hintNumbers = 'SECRET';
            return hintNumbers;
        }else{
            for(let i = 0; i < selectedNumbers.length; i++){
                hintNumbers = hintNumbers + selectedNumbers.charAt(i);
                hintNumbers = hintNumbers + ', ';
            }
            hintNumbers = hintNumbers.slice(0, -2);

            if(hintNumbers.length === 1){
                hintNumbers = 'SECRET';
            }
            return hintNumbers;
        }
    }

    createMessageClearButton(){
        let message = messages[0][0];
        message = this.selectTextLang(message);

        return message;
    }

    getCurrentDataSet(){
        const history = this.getHistoryData();
        const current = history[history.length - 1];

        return current;
    }

    getCurrentLock(){
        const lock = this.getCurrentDataSet().lock.slice();

        return lock;
    }

    getCurrentSquares(){
        const history = this.state.history;
        const current = history[this.state.step];
        const squares = current.squares.slice();

        return squares;
    }

    getHintNumbers(){
        const squares = this.getCurrentSquares();
        const edit = this.state.edit;
        const selectedNumbers = load(this.changeData(squares));
        let hintNumbers = this.createAssistInfo(selectedNumbers[edit]);

        return hintNumbers;
    }

    getHistoryData(){
        const history = this.state.history.slice(0, this.state.step + 1);

        return history;
    }

    insertData(dataSudoku, level){
        const history = this.getHistoryData();
        const lock = this.searchFilledCellIndex(dataSudoku);

        this.setState({
            history: history.concat([{
                squares: dataSudoku,
                lock: lock,
            }]),
            step: history.length,
            finish: false,
            level: level,
        });
    }

    judgeExistData(){
        const squares = this.getCurrentSquares();

        let judge = squares.some((value) => {
            return value >= 1;
        });

        return judge;
    }

    judgeMagicSquare(){
        const squares = this.getCurrentSquares();

        let judge = magicSquare.some((value) => {
            return squares.toString() === value.toString();
        });

        return judge;
    }

    lockEditor(numberInCell){
        const history = this.state.history;
        const current = history[this.state.step];
        const filledCell = current.lock.slice();

        let lock = filledCell.some(function(value){
            return value === numberInCell;
        });

        return lock;
    }

    insertLevelInfo(type){
        let message = messages[1][0];
        message = this.selectTextLang(message);

        if(type === 'easy'){
            message = message + ' (Easy Mode)';
        }else if(type === 'normal'){
            message = message + ' (Normal Mode)';
        }else if(type === 'hard'){
            message = message + ' (Hard Mode)';
        }

        return message;
    }

    searchFilledCellIndex(data){
        let cellIndex = [];

        data.map(function(value, index){
            if(value >= 1){
                cellIndex.push(index);
            }
            return null;
        });

        return cellIndex;
    }

    searchNullData(){
        const squares = this.getCurrentSquares();
        let cnt = 0;

        for(let i = 0; i < squares.length; i++){
            if(squares[i] === null){
                cnt++;
            }
        }

        return cnt;
    }

    selectData(buttonType){
        let data;
        if(buttonType === 'test'){
            data = selectRandomData(dataHard);
        }else if(buttonType === 'easy'){
            data = selectRandomData(dataEasy);
        }else if(buttonType === 'normal'){
            data = selectRandomData(dataNormal);
        }else if(buttonType === 'hard'){
            data = selectRandomData(dataHard);
        }else{
            data = selectRandomData(magicSquare);
        }

        return data;
    }

    selectTextLang(texts){
        const isEnglish = this.props.isEnglish;
        let text;

        if(isEnglish){
            text = texts.en;
        }else if(!isEnglish){
            text = texts.ja;
        }

        return text;
    }

    showWindowMessage(buttonAction, buttonType){
        let message;

        if(buttonAction === 'clear'){
            message = this.createMessageClearButton();
        }else if(buttonAction === 'insert'){
            message = this.insertLevelInfo(buttonType);
        }

        return message;
    }

    solveSudoku(){
        const squares = this.getCurrentSquares();
        const stringData = this.changeData(squares);
        const isSolved = search(load(stringData));

        return isSolved;
    }


    // EVENT -------------------------------------------------------------------

    handleClearData = () => {
        if(this.judgeExistData()){
            if(window.confirm(this.showWindowMessage('clear'))){
                this.clearState();
            }
        }
    }

    handleInsertData = (e) => {
        const buttonType = e.target.id;
        const exist = this.judgeExistData();
        let dataSudoku;
        if(exist){
            if(window.confirm(this.showWindowMessage('insert', buttonType))){
                dataSudoku = this.selectData(buttonType);
                this.insertData(dataSudoku, buttonType);
            }
        }else if(!exist){
            dataSudoku = this.selectData(buttonType);
            this.insertData(dataSudoku, buttonType);
        }
    }

    handleRedo = () => {
        const step = this.state.step;
        const length = this.state.history.length;
        if(step === length - 1){
            return null;
        }else{
            const nextStep = step + 1;
            this.setState({
                step: nextStep,
            });
        }
    }

    handleSaveData = (e) => {
        e.preventDefault();
        const history = this.getHistoryData();
        const squares = this.getCurrentDataSet().squares.slice();
        const lock = this.getCurrentLock();
        const input = e.target.firstChild;
        const id = e.target.id;
        let newData = squares.concat();
        newData[id] = input.value;

        this.setState({
            history: history.concat([{
                squares: newData,
                lock: lock,
            }]),
            step: history.length,
            edit: null,
        });
    }

    handleShowEditor = (e) => {
        this.setState({
            edit: parseInt(e.target.id, 10),
        });
    }

    handleSolveSudoku = () => {
        const history = this.getHistoryData();
        const lock = this.getCurrentLock();
        const isSolved = this.solveSudoku();

        if(isSolved === false){
            this.setState({
                possible: false,
            });
        }else{
            this.setState({
                history: history.concat([{
                    squares: isSolved,
                    lock: lock,
                }]),
                step: history.length,
                possible: true,
                finish: true,
            });
        }
    }

    handleUndo = () => {
        const step = this.state.step;

        if(step === 0){
            return null;
        }else{
            const prevStep = step - 1;
            this.setState({
                step: prevStep,
            });
        }
    }



    // RENDER -------------------------------------------------------------------

    renderComment(){
        const isSolver = this.props.isSolver;
        let comment;

        if(isSolver){
            comment = this.commentSolverMode();
        }else if(!isSolver){
            comment = this.commentChallengerMode();
        }

        comment = this.selectTextLang(comment);

        if(!isSolver){
            comment = this.addDetailChallenger(comment);
        }

        return (
            <p className="comment">{comment}</p>
        );
    }

    renderEditor(cell){
        const squares = this.getCurrentSquares();
        let lock = this.lockEditor(cell);
        const edit = this.state.edit;
        const finish = this.state.finish;

        if(!lock && cell === edit && !finish){
            return(
                <form id={cell} onSubmit={this.handleSaveData} >
                    <input type="number" min="1" max="9" />
                </form>
            );
        }else if(lock || edit !== cell || finish){
            return squares[cell];
        }
    }

    renderSidebarLeft(){
        const isSolver = this.props.isSolver;

        if(isSolver){
            return(
                <Col
                    xs={{span: 0, order:2}}
                    lg={{span: 3, order: 1, offset: 0}}
                    xl={{span: 2, order: 1, offset: 1}}
                >
                </Col>
            );
        }else if(!isSolver){
            return(
                <Col
                    xs={{span: 6, order: 2}}
                    md={{span: 5, offset: 1}}
                    lg={{span: 3, order: 1, offset: 0}}
                    xl={{span: 2, order: 1, offset: 1}}
                >
                    <div className="Right">
                        <button id="easy" className="normal" onClick={this.handleInsertData}>{iconSmile} Easy</button>
                        <button id="normal" className="normal" onClick={this.handleInsertData}>{iconMeh} Normal</button>
                        <button id="hard" className="normal" onClick={this.handleInsertData}>{iconDizzy} Hard</button>
                    </div>
                </Col>
            );
        }else{
            return null;
        }
    }

    renderSidebarRight(){
        const isSolver = this.props.isSolver;

        if(isSolver){
            return(
                <Col
                    xs={{span: 12, order: 3}}
                    md={{span: 10, offset: 1}}
                    lg={{span: 3, offset: 0}}
                    xl={2}
                >
                    <div className="Left">
                        <button className="normal" onClick={this.handleClearData}>{iconTrash} Clear</button>
                        <button id="test" className="normal" onClick={this.handleInsertData}>{iconCalculator} Test</button>
                        <button className="normal" onClick={this.handleSolveSudoku}>{iconPlay} Run</button>
                    </div>
                </Col>
            );
        }else if(!isSolver){
            return(
                <Col
                    xs={{span: 6, order: 3}}
                    md={5}
                    lg={3}
                    xl={2}
                >
                    <div className="Right">
                        <button className="normal" onClick={this.handleClearData}>{iconTrash} Clear</button>
                        <button className="normal" onClick={this.handleRedo}>{iconRedo} Redo</button>
                        <button className="normal" onClick={this.handleUndo}>{iconUndo} Undo</button>
                    </div>
                </Col>
            );
        }else{
            return null;
        }
    }

    renderSquare(i){
        let endId = i * 9;

        return(
            <div className="sudoku-row">
                <div id={endId+0} className={this.lockEditor(endId+0) ? "block inserted" : "block" }>{this.renderEditor(endId+0)}</div>
                <div id={endId+1} className={this.lockEditor(endId+1) ? "block inserted" : "block" }>{this.renderEditor(endId+1)}</div>
                <div id={endId+2} className={this.lockEditor(endId+2) ? "block inserted" : "block" }>{this.renderEditor(endId+2)}</div>
                <div id={endId+3} className={this.lockEditor(endId+3) ? "block inserted" : "block" }>{this.renderEditor(endId+3)}</div>
                <div id={endId+4} className={this.lockEditor(endId+4) ? "block inserted" : "block" }>{this.renderEditor(endId+4)}</div>
                <div id={endId+5} className={this.lockEditor(endId+5) ? "block inserted" : "block" }>{this.renderEditor(endId+5)}</div>
                <div id={endId+6} className={this.lockEditor(endId+6) ? "block inserted" : "block" }>{this.renderEditor(endId+6)}</div>
                <div id={endId+7} className={this.lockEditor(endId+7) ? "block inserted" : "block" }>{this.renderEditor(endId+7)}</div>
                <div id={endId+8} className={this.lockEditor(endId+8) ? "block inserted" : "block" }>{this.renderEditor(endId+8)}</div>
            </div>
        );
    }

    renderSudoku(){
        return(
            <div id="sudoku" className="Sudoku" onDoubleClick={this.handleShowEditor}>
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        );
    }

    render(){
        return(
            <main>
                <Container fluid>
                    <Row>
                        <Col
                            xs={12}
                            md={{span: 10, offset: 1}}
                            lg={{span: 6, offset: 3}}
                        >
                            <div className="Comment">
                                <div className="inner">
                                    {this.renderComment()}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {this.renderSidebarLeft()}
                        <Col
                            xs={{span: 12, order: 1}}
                            md={{span: 10, offset: 1}}
                            lg={{span: 6, order: 1, offset: 0}}
                        >
                            {this.renderSudoku()}
                        </Col>
                        {this.renderSidebarRight()}
                    </Row>
                </Container>
            </main>
        );
    }
}

export default Main;
