browser.runtime.onMessage.addListener(( msg ) => {
    if(msg.type === 'config'){
        loadConfig(msg.config);
    }
})

browser.runtime.sendMessage({ type: 'config' });

let loadConfig = ( config ) => {
    if(config.enabledApps.find(x => x === 'Youtube') && window.location.href.includes('youtube.com/watch')){
        let i = setInterval(() => {
            let title = document.querySelector('h1.title:nth-child(4) > yt-formatted-string:nth-child(2)');

            if(title){
                setInterval(() => {
                    browser.runtime.sendMessage({ type: 'status', text: 'Listening to '+title.innerText+' on youtube' });
                }, 2000);

                window.clearInterval(i);
            }
        }, 100)
    }
}