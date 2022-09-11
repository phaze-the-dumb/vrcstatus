let avaiableApps = [
    { name: 'Youtube', img: '../logos/apps/youtube.png', desc: 'Show what you\'re currently watching on your status.', theme: 'red' },
    { name: 'Spotify', img: '../logos/apps/spotify.png', desc: 'Show what you\'re currently listening to on your status.', theme: 'green' },
    { name: 'VRChat', img: '../logos/apps/vrchat.png', desc: 'Show what page you are looking at on vrchat.', theme: 'white' },
]

let load = () => {
    fetch('http://localhost:8076/open/config.json').then(data => data.json()).then(data => {
        let abtns = [], rbtns = [];
        let text = '';

        avaiableApps.forEach(app => {
            if(data.enabledApps.find(x => x === app.name)){
                text += '<div class="card card-'+app.theme+'"><div class="cardHeader"><img src="'+app.img+'" class="cardLogo"><div class="cardTitle">'+app.name+'</div></div><div class="cardDesc">'+app.desc+'</div><div class="cardButton" id="btn-'+app.name+'">Remove</div></div>'
                rbtns.push('btn-'+app.name);
            } else{
                text += '<div class="card card-'+app.theme+'"><div class="cardHeader"><img src="'+app.img+'" class="cardLogo"><div class="cardTitle">'+app.name+'</div></div><div class="cardDesc">'+app.desc+'</div><div class="cardButton" id="btn-'+app.name+'">Add</div></div>'
                abtns.push('btn-'+app.name);
            }

        })

        document.querySelector('#apps').innerHTML = text;

        abtns.forEach(id => {
            let btn = document.querySelector('#'+id);
            btn.onclick = () => { add(btn, id.replace('btn-', '')) };
        })

        rbtns.forEach(id => {
            let btn = document.querySelector('#'+id);
            btn.onclick = () => { remove(btn, id.replace('btn-', '')) };
        })
    })
}

let add = ( button, name ) => {
    button.innerHTML = 'Loading...';

    fetch('http://localhost:8076/open/apps', {
        method: 'PUT',
        body: name
    }).then(data => data.text()).then(data => {
        load();
    })
}

let remove = ( button, name ) => {
    button.innerHTML = 'Loading...';
    
    fetch('http://localhost:8076/open/apps', {
        method: 'DELETE',
        body: name
    }).then(data => data.text()).then(data => {
        load();
    })
}

load();