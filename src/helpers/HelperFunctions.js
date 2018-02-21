export function toSubmit(ev){
    ev.preventDefault();
    ev.target.value = '';
}

export function powerB(state){
    state.setState({
        powerOn: !state.state.powerOn
    })
    console.log('power')
}
