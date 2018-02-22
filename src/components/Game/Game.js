import React, { Component } from 'react';
import './Game.css'
import BackgroundOn from './../../assets/Graphics/monitorborder.png';
import BackgroundOff from './../../assets/Graphics/monitorborder-off.png';
import Sound from 'react-sound';

import { TremendoTre, JoseLevelsUp, Mike } from './../../helpers/Levels';
import { PreInstructs } from './../../helpers/Instructions';
import { toSubmit, powerB } from './../../helpers/HelperFunctions';

class Game extends Component {
    constructor(){
        super();
        this.state = {
            started: false,
            powerOn: true,
            user: 'MagnusFex',
            instruction: ['hey'],
            currentScreen: 'MainMenu',
            action: [],
            consola: '',
            level: 0,
            currentQuestion: 0,
            questionRight: 0,
            firstCompleted: false,
            secondCompleted: false,
            thirdCompleted: false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.showMainMenu = this.showMainMenu.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.starter = this.starter.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.powerButton = this.powerButton.bind(this);
        this.runMainMenu = this.runMainMenu.bind(this);
        this.addToActions = this.addToActions.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.askForPassword = this.askForPassword.bind(this);
        this.setLevel = this.setLevel.bind(this);
        this.enterPassword = this.enterPassword.bind(this);
        this.wininngScreen = this.wininngScreen.bind(this);
    }

    starter(){
        if(!this.state.started){
            this.setState({
                instruction: PreInstructs.mainMenu,
                level: 0
            })
        }
    }

    showMainMenu(){
        if(this.state.firstCompleted && this.state.secondCompleted && this.state.thirdCompleted){
            this.setState({
                instruction: ['You have unlocked your terminal', 'Hackers don\'t stand a chance', 'Next adventure coming soon']
            })
        }else{
            this.setState({
                currentScreen: 'MainMenu',
                instruction: PreInstructs.mainMenu.concat(['port 1 ' + this.state.firstCompleted, 'port 2 ' + this.state.secondCompleted, 'port 3 ' + this.state.thirdCompleted]),
                level: 0,
                currentQuestion: 0
            })
        }
    }

    handleOnChange(ev){
      ev.preventDefault();
      const target = ev.target;
      const value = target.value;
      const name = target.name;

      this.setState({
          [name]: value
      })
    }

    handleOnSubmit(ev){
        toSubmit(ev);
    }

    onKeyPress(event){

        if(event.key === 'Enter' && event.target.value !== '') {
            let toAdd = this.state.action.concat(this.state.consola);
            this.setState({
               action: toAdd,
               consola: ''
            })
            this.onUserInput(event.target.value);
            event.target.value = '';

            var audio = new Audio('./key.mp3');
            audio.play();
        }

    }

    powerButton(){
        powerB(this);
    }

    onUserInput(input){
        console.log(input)
        if(input === 'menu'){
            this.showMainMenu();
        }else if (input === 'clear') {
            this.setState({
                action: []
            })
        }else if(this.state.currentScreen === 'MainMenu'){
            this.runMainMenu(input);
        }else if(this.state.currentScreen === 'Password'){
            this.checkPassword(input);
        }else if(this.state.currentScreen === 'Questions'){
            this.enterPassword(input);
        }
    }

    addToActions(input){
        let toAdd = this.state.action.concat(input);
        this.setState({
           action: toAdd
       })
    }

    runMainMenu(input){
        let lastNum = parseInt(input[input.length - 1], 10);
        if(input.slice(0, 4) === 'port' && !isNaN(lastNum) && input.length === 6){
            console.log(lastNum);
            if(lastNum > 0 && lastNum < 4){
                this.setState({
                    level: lastNum
                }, function(){
                    console.log('state ' + this.state.level, 'level' + lastNum);
                    this.askForPassword(input)
                })

            }else{
                this.addToActions('Please enter valid port');
            }
        }else if(input.slice(0, 4) === 'data' && !isNaN(lastNum) && input.length === 6){
            //TODO: Add showData function
            if(lastNum > 0 && lastNum < 4){
                this.setState({
                    currentScreen: 'Data'
                })
                this.addToActions('Access to ' + input + ' granted');
            }
        }else{
            this.addToActions('Invalid command');
        }
    }

    askForPassword(input){
        this.setState({
            currentScreen: 'Password',
            action: []
        })
        this.addToActions('Access to ' + input + ' granted');
        this.setLevel();
    }

    checkPassword(input){
        let hacker;
        switch(this.state.level){
            case 1:
                hacker = TremendoTre;
                break;
            case 2:
                hacker = JoseLevelsUp;
                break;
            case 3:
                hacker = Mike;
                break;
        }

        if(input === 'continue'){
            this.setState({
                instruction: [hacker.instruction, 'Type access to attempt unlock']
            })
        }

        if(input === 'access'){
            this.setState({
                currentScreen: 'Questions',
                instruction: [hacker.riddles[this.state.currentQuestion].q],
                action: []
            })
            this.enterPassword();
        }
    }

    enterPassword(input){
        console.log(this.state.currentQuestion);
        let hacker;
        switch(this.state.level){
            case 1:
                hacker = TremendoTre;
                break;
            case 2:
                hacker = JoseLevelsUp;
                break;
            case 3:
                hacker = Mike;
                break;
        }

        if(input !== undefined && this.state.currentQuestion < hacker.riddles.length){
            this.setState({
                instruction: [hacker.riddles[this.state.currentQuestion].q]
            }, function(){
                console.log(this.state.currentQuestion, 'SHIT!');
            });

            if(input === hacker.riddles[this.state.currentQuestion].a){
                this.addToActions('Bypassed');
                if (this.state.currentQuestion < hacker.riddles.length - 1) {
                    this.setState({
                        currentQuestion: this.state.currentQuestion + 1
                    },function(){
                        this.setState({
                            instruction: [hacker.riddles[this.state.currentQuestion].q]
                        })
                    })
                }else{
                    this.wininngScreen(hacker);
                }
            }
        }
    }

    wininngScreen(hacker){
        switch (hacker.level) {
            case 1:
                this.setState({
                    firstCompleted: true
                })
                console.log('Sup1');
                break;
            case 2:
                this.setState({
                    secondCompleted: true
                })
                break;
            case 3:
                this.setState({
                    thirdCompleted: true
                })
                break;

        }

        this.setState({
            instruction: ['You have unlocked:', hacker.name + ' port','Type menu to unlock the next port']
        })
    }

    setLevel(){
        let hacker;

        switch(this.state.level){
            case 1:
                hacker = TremendoTre;
                break;
            case 2:
                hacker = JoseLevelsUp;
                break;
            case 3:
                hacker = Mike;
                break;
        }

        this.setState({
            instruction: [hacker.name, hacker.story, 'Type continue to read more data']
        })
    }

  render() {

      let instruction = this.state.instruction.map((writeline, index) =>
            <li key={index + 'b'}>{writeline}</li>
      )

      let actions = this.state.action.map((writeline, index) =>
            <li key={index + 'a'}>{writeline}</li>
      )

    return (
      <div className="App" onLoad={ this.starter }>
          <div>
              <img src={this.state.powerOn ? BackgroundOn : BackgroundOff} className="Game" alt="screen"></img>
          </div>

          <div className="Terminal" style={this.state.powerOn ? {visibility: 'visible'} : {visibility: 'hidden'}}>
            <h4>{this.state.user + ' Access Denied to Port ' + this.state.level + ' ' + this.state.currentQuestion}</h4>
            <ul className="instruction">{instruction}</ul>
            <ul className="actions">{actions}</ul>
            <input placeholder="console" onChange={ this.handleOnChange } onKeyPress={ this.onKeyPress } name='consola'></input>
          </div>
          <div className="PowerOnButton" onClick={ this.powerButton }></div>
      </div>
    );
  }
}

export default Game;
