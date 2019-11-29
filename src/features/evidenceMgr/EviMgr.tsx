import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { ThunkAction } from 'redux-thunk';
// import { Action } from 'redux';

import { RootState } from '../../common/rootReducer';

import {
    counterPlusOne,
    counterMinusOne,
    counterPlusNumber,
    login,
} from './redux/actions'

type AppProps = {
    actions: {
        counterPlusOne: () => Object,
        counterMinusOne: () => Object,
        counterPlusNumber: (args: number) => Object,
        login: (args: {
            username: string,
            password: string,
        }) => any,
    },
    count: number
};

class EviMgr extends React.Component<AppProps> {
    // constructor(props: any){
    //     super(props)
    // }
    state = {
        // animated: '',
    };

    add = () => {
        const { actions } = this.props;
        actions.counterPlusOne();
    };

    minus = () => {
        const { actions } = this.props;
        actions.counterMinusOne();
    };

    add12 = () => {
        const { actions } = this.props;
        actions.counterPlusNumber(12);
    }

    login = () => {
        const { actions } = this.props;
        actions.login({
            username: 'admin',
            password: '111111'
        }).catch((err: any) => {
            console.log(err)
        });
    }

    render() {
        const { count } = this.props;
        return (
            <div
                className="center"
                style={{ height: '100%', background: '#ececec', overflow: 'hidden' }}
            >
                <button onClick={this.minus}>-</button>
                test: {count}
                <button onClick={this.add}>+</button>
                <button onClick={this.add12}>+12</button>
                <button onClick={this.login}>测试请求</button>
            </div>
        );
    }
}

function mapStateToProps(state: RootState ) {
    return {
        count: state.eviMgr.count,
        // ...state.eviMgr,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators({
            counterPlusOne,
            counterMinusOne,
            counterPlusNumber,
            login
        }, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EviMgr);
// export default EviMgr;