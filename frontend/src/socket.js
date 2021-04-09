import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SC = createContext();
const socket = io('https://jtao22videochat.herokuapp.com/');
const ContextProvider = ({children}) => {
    const [stream, setStream] = useState();
    const [me, setMe] = useState('');
    const [calling, setCalling] = useState({});
    const [answered, setAnswered] = useState(false);
    const [ended, setEnded] = useState(false);
    const [name, setName] = useState('');
    const myVid = useRef();
    const userVid = useRef();
    const connectRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((currStream) => {
            setStream(currStream);
            myVid.current.srcObject = currStream;
        });
        socket.on('me', (id) => setMe(id));
        socket.on('call', ({from, name: caller, signal}) => {
            setCalling({isReceivingCall:true, from, name: caller, signal});
        });
    }, []);
    
    const answer = () => {
        setAnswered(true);
        const peer = new Peer({initiator: false, trickle:false, stream});
        peer.on('signal', (data) => {
            socket.emit('answer', {signal: data, to: calling.from});
        });
        peer.on('stream', (currStream) => {
            userVid.current.srcObject = currStream;
        });
        peer.signal(calling.signal);
        connectRef.current = peer;
    };
    const call = (id) => {
        const peer = new Peer({initiator: true, trickle:false, stream});
        peer.on('signal', (data) => {
            socket.emit('call', {receiver: id, sigData: data, from:me, name});
        });
        peer.on('stream', (currStream) => {
            userVid.current.srcObject = currStream;
        });
        socket.on('answered', (signal) => {
            setAnswered(true);
            peer.signal(signal);
        });
        connectRef.current = peer;
    };
    const leave = () => {
        setEnded(true);
        connectRef.current.destroy();
        window.location.reload();
    };

    return (
        <SC.Provider value={{calling,answered,myVid,userVid,stream,name,setName,ended, me,call,leave,answer}}>
            {children}
        </SC.Provider>
    );
};

export {ContextProvider, SC};