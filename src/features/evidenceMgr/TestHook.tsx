import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../common/rootReducer';
import {
    counterPlusOne,
    counterMinusOne,
    login,
    fetchTodos
} from './redux/actions'

const TestHook: React.FC = () => {
    const dispatch = useDispatch();
    
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Update the document title using the browser API
        console.log(`You clicked ${count} times`);
      }, [count]);

    function add(num: number) {
        setCount(count + num);
    }

    const reduxCount = useSelector((state: RootState) => state.eviMgr.count);

    const minusReduxCount = () => {
        return dispatch(counterMinusOne())
    }

    const fetch = () => dispatch(fetchTodos());


    return (
        <>
            <p>now state count = {count}</p>
            <button onClick={()=>{add(2)}}>+2</button>

            <p>now redux count = {reduxCount}</p>
            <button onClick={() => dispatch(counterPlusOne())}>redux count + 1</button>
            <button onClick={ minusReduxCount }>redux count - 1</button>
            <button onClick={() => {
                // console.log(123);
                return dispatch(login());
            }}>post query</button>
            <button onClick={ fetch }>fetch todos</button>
        </>
    );
}

export default TestHook;