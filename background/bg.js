browser.runtime.onMessage.addListener(( msg, sender ) => {
    if(msg.type === 'status'){
        fetch('http://localhost:8076/open/status.json', {
            method: 'PUT',
            body: msg.text
        })
    }
    
    if(msg.type === 'config'){
        fetch('http://localhost:8076/open/config.json').then(data => data.json()).then(data => {
            browser.tabs.sendMessage(sender.tab.id, { type: 'config', config: data });
        })
    }
})