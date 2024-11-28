function useWebsocket(handleMessage, username) {
    const ws = new WebSocket('ws://localhost:18080/websocket/' + username);

    const init = () => {
        ws.addEventListener('open', handleOpen, false);
        ws.addEventListener('close', handleClose, false);
        ws.addEventListener('error', handleError, false);
        ws.addEventListener('message', handleMessage, false);
    };

    function handleOpen(e) {
        console.log('WebSocket open', e);
    }

    function handleClose(e) {
        console.log('WebSocket close', e);
    }

    function handleError(e) {
        console.log('WebSocket error', e);
    }

    init();

    return ws;
}

export default useWebsocket;