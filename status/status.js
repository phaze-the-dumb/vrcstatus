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
                    title = document.querySelector('h1.title:nth-child(4) > yt-formatted-string:nth-child(2)');
                    browser.runtime.sendMessage({ type: 'status', text: 'Listening to '+title.innerText+' on youtube' });
                }, 10000);

                window.clearInterval(i);
            }
        }, 100)
    }

    if(config.enabledApps.find(x => x === 'Spotify') && window.location.href.includes('open.spotify.com')){
        let i = setInterval(() => {
            let title = document.querySelector('div.cPwEdQ > span:nth-child(1) > a:nth-child(1)');
            let artists = document.querySelector('div.gpNta6i8q3KYJC6WBZQC:nth-child(1)');

            if(title && artists){
                setInterval(() => {
                    title = document.querySelector('div.cPwEdQ > span:nth-child(1) > a:nth-child(1)');
                    artists = document.querySelector('div.gpNta6i8q3KYJC6WBZQC:nth-child(1)');
                    let arts = [];
                    
                    for(let i = 0; i < artists.children.length; i++)
                        arts.push(artists.children.item(i).innerText);

                    browser.runtime.sendMessage({ type: 'status', text: 'Listening to '+arts.join('')+' - '+title.innerText+' on spotify' });
                }, 10000);

                window.clearInterval(i);
            }
        }, 100)
    }
}