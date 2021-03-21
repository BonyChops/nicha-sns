import { useState } from 'react';
import socketio from 'socket.io-client';
import swal from 'sweetalert2';
import '@sweetalert2/themes/dark';

const socket = socketio.connect('https://api.p2pquake.net/v2/ws')
//const socket = socketio.connect('ws://localhost:1234');

const EarthquakeWs = (props) => {
    const [connected, setConnected] = useState("disconnected");
    const [idCache, setIdCache] = useState([]);
    const warn = props.state.earthQuakeWarn;
    socket.on('chatMessage', (obj) => {
        swal.fire({
            icon: "warning",
            iconColor: "red",
            title: "地震です",
            text: obj
        })
    })
}

export default EarthquakeWs;