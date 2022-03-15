
let id = null
var searchParams = new URLSearchParams(window.location.search);
if (searchParams.has("id")) {
    id = searchParams.get("id")
}

hljs.initHighlightingOnLoad();

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

let runIcon = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20""
viewBox="0 24 24 24" style="enable-background:new 0 0 24 96;" xml:space="preserve">
<style type="text/css">
.st1{fill:#2D2D32;}
</style>
<g id="Icons_1_">
<path class="st1" d="M22.8,41.4c-2-1.8-4.1-3.8-4.4-4.1s-1.2-2.9-2.1-5.3c-0.4-2.8-0.9-3.1-1.1-3.3c-0.3-0.2-0.7-0.3-1.1-0.3l0,0
   c-0.7,0.1-1.3,0.3-1.9,0.7c-0.6,0.5-1.4,0.8-2.1,0.9c-0.3,0-0.7-0.1-1-0.2c-0.6-0.2-0.6-0.4-0.6-1c0-0.6-0.2-1.2-0.7-1.6
   C7.7,27.1,7.4,27,7.2,27c-1.6,0-3.8,3.6-4.6,5l-1.3,0.9c-0.3,0.2-0.5,0.6-0.4,0.9c0.3,2.5,2,4.2,5.8,5.6c1.1,0.4,2.1,1,2.9,1.8
   c0.9,0.9,2,1.7,3.1,2.3c1.5,0.9,3.3,1.4,5.1,1.4c2.7,0,5.6-1.1,5.6-2.8C23.2,41.9,23,41.6,22.8,41.4z M17.6,44
   c-1.6,0-3.2-0.4-4.6-1.2c-3.4-2.1-2.9-3-6.1-4.2c-3.6-1.4-4.9-2.8-5.1-4.8l1.5-1C4.6,30.4,6.5,28,7.2,28c0,0,0.1,0,0.2,0
   c0.6,0.4-0.3,2,1.5,2.7c0.4,0.2,0.9,0.3,1.3,0.3c1.9,0,3-1.6,4-1.6c0.2,0,0.3,0.1,0.5,0.1c0.4,0.3,0.8,2.7,0.8,2.7l0.3,0.7h-1.3
   c-0.3,0-0.5,0.2-0.5,0.5S14,34,14.3,34H16l0.4,1h-1.4c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5h1.8l0.4,1h-1.4
   c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5h1.9c0.7,0.8,4.5,4.2,4.5,4.2C22.2,42.9,20.2,44,17.6,44z"/>
</g>
</svg>`
let swimIcon = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20"
viewBox="0 24 24 24" xml:space="preserve">
<style type="text/css">
.st0{fill:#606065;}
.st1{fill:#2D2D32;}
.st2{fill:#FFFFFF;}
</style>
<g id="Icons_1_">
<path class="st1" d="M6.5,31.8c1.5,0,2.8-0.9,3.5-2.1c0.7,1.3,2,2.1,3.5,2.1c1.5,0,2.8-0.9,3.5-2.1c0.7,1.3,2,2.1,3.5,2.1
   c0.8,0,1.6-0.2,2.3-0.7c0.2-0.2,0.3-0.5,0.1-0.7c-0.2-0.2-0.4-0.3-0.7-0.1c-0.5,0.3-1.1,0.5-1.7,0.5c-1.4-0.1-2.6-1.1-3-2.5
   c-0.1-0.3-0.4-0.4-0.7-0.2c-0.1,0.1-0.2,0.1-0.2,0.2c-0.4,1.4-1.6,2.4-3,2.5c-1.4-0.1-2.6-1.1-3-2.5c-0.1-0.3-0.4-0.4-0.7-0.2
   c-0.1,0.1-0.2,0.1-0.2,0.2c-0.4,1.4-1.7,2.4-3.1,2.5c-0.6,0-1.2-0.2-1.7-0.5c-0.2-0.2-0.5-0.1-0.7,0.1c-0.2,0.2-0.1,0.5,0.1,0.7
   c0,0,0,0,0,0C4.8,31.6,5.6,31.8,6.5,31.8z"/>
<path class="st1" d="M22.2,42.3c-0.5,0.3-1.1,0.5-1.7,0.5c-1.4-0.1-2.6-1.1-3-2.5c-0.1-0.3-0.4-0.4-0.7-0.2
   c-0.1,0.1-0.2,0.1-0.2,0.2c-0.4,1.4-1.6,2.4-3,2.5c-1.4-0.1-2.6-1.1-3-2.5c-0.1-0.3-0.4-0.4-0.7-0.2c-0.1,0.1-0.2,0.1-0.2,0.2
   c-0.4,1.4-1.6,2.4-3,2.5c-0.6,0-1.2-0.2-1.7-0.5c-0.2-0.2-0.5-0.1-0.7,0.1S4,42.9,4.2,43.1c0,0,0,0,0,0c0.6,0.4,1.4,0.7,2.2,0.7
   c1.5,0,2.8-0.9,3.5-2.1c0.7,1.3,2,2.1,3.5,2.1c1.5,0,2.8-0.9,3.5-2.1c0.7,1.3,2,2.1,3.5,2.1c0.8,0,1.6-0.2,2.3-0.7
   c0.2-0.2,0.3-0.5,0.1-0.7C22.7,42.2,22.4,42.2,22.2,42.3L22.2,42.3z"/>
<path class="st1" d="M6.9,35.7c0.7,1.3,2,2.1,3.5,2.1c1.5,0,2.8-0.9,3.5-2.1c0.7,1.3,2,2.1,3.5,2.1c0.8,0,1.6-0.2,2.3-0.7
   c0.2-0.2,0.3-0.5,0.1-0.7c-0.2-0.2-0.4-0.3-0.7-0.1c-0.5,0.3-1.1,0.5-1.7,0.5c-1.4-0.1-2.6-1.1-3-2.5c-0.1-0.3-0.4-0.4-0.7-0.2
   c-0.1,0.1-0.2,0.1-0.2,0.2c-0.4,1.4-1.6,2.4-3,2.5c-1.4-0.1-2.6-1.1-3-2.5c-0.1-0.3-0.4-0.4-0.7-0.2c-0.1,0.1-0.2,0.1-0.2,0.2
   c-0.4,1.4-1.6,2.4-3,2.5c-0.6,0-1.2-0.2-1.7-0.5c-0.2-0.2-0.5-0.1-0.7,0.1S1,36.9,1.3,37.1c0,0,0,0,0,0c0.6,0.4,1.4,0.7,2.1,0.7
   C4.9,37.8,6.2,37,6.9,35.7z"/>
</g>
</svg>`
let rideIcon = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20"
viewBox="0 24 24 24" style="enable-background:new 0 0 24 96;" xml:space="preserve">
<style type="text/css">
.st0{fill:#606065;}
.st1{fill:#2D2D32;}
.st2{fill:#FFFFFF;}
.st3{fill:#FC4C01;}
</style>
<g id="Icons_1_">
<path class="st1" d="M19,35.1c-0.6,0-1.1,0.1-1.7,0.3l-2-4.3h2.2c0.3,0,0.5,0.2,0.5,0.5c0,0.2-0.1,0.3-0.2,0.4
   c-0.2,0.1-0.3,0.4-0.2,0.7s0.4,0.3,0.7,0.2c0.7-0.4,1-1.3,0.5-2c-0.3-0.5-0.8-0.7-1.3-0.7h-3c-0.3,0-0.5,0.2-0.5,0.5
   c0,0.1,0,0.1,0,0.2l0.8,1.8H9l-1.2-2.5H9c0.3,0,0.5-0.2,0.5-0.5S9.3,29.1,9,29.1H5c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5h1.7
   l1.4,3l-1.2,2.4c-2.5-1-5.5,0.2-6.5,2.7s0.2,5.5,2.7,6.5s5.5-0.2,6.5-2.7c0.2-0.4,0.3-0.9,0.3-1.4h2c0.1,0,0.2,0,0.2-0.1l0.1,0
   c0,0,0.1-0.1,0.1-0.1l0,0l0,0l3.2-6.1l0.8,1.6c-2.3,1.5-3,4.5-1.6,6.9s4.5,3,6.9,1.6s3-4.5,1.6-6.9C22.3,35.9,20.7,35,19,35.1z
    M14.8,33.6L12,38.9l-2.5-5.4H14.8z M5,44c-2.2,0-4-1.8-4-4s1.8-4,4-4c0.5,0,1,0.1,1.4,0.3l-1.8,3.5c-0.1,0.2,0,0.5,0.2,0.7
   c0.1,0,0.1,0.1,0.2,0.1H9C8.7,42.5,7,44,5,44z M7.3,36.8c0.9,0.6,1.5,1.7,1.7,2.8H5.8L7.3,36.8z M10,39.5c-0.1-1.5-1-2.8-2.2-3.7
   l0.9-1.7l2.6,5.4H10z M19,44c-2.2,0-4-1.8-4-4c0-1.4,0.7-2.6,1.8-3.4l1.7,3.6c0.1,0.2,0.4,0.3,0.7,0.2c0.2-0.1,0.3-0.4,0.2-0.6
   l-1.7-3.6c0.4-0.1,0.8-0.2,1.2-0.2c2.2,0,4,1.8,4,4C23,42.2,21.2,44,19,44z"/>
</g>
</svg>`
let exerciseIcon = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20"
viewBox="0 24 24 24" xml:space="preserve">
<style type="text/css">
.st0{fill:#606065;}
.st1{fill:#2D2D32;}
.st2{fill:#FFFFFF;}
</style>
<g id="Icons_1_">
<path class="st1" d="M19.9,36.1l-2.4-6.7c-0.1-0.2-0.3-0.3-0.5-0.3l0,0c-0.2,0-0.4,0.1-0.5,0.3l-4.1,11.3l-3-7.3
   c-0.1-0.2-0.3-0.3-0.5-0.3c-0.2,0-0.4,0.1-0.5,0.3l-2.1,5.9l-1.5-3c-0.1-0.2-0.3-0.2-0.5-0.2H2v1h2.2l1.9,3.7
   c0.1,0.2,0.3,0.3,0.5,0.3c0.2,0,0.4-0.1,0.5-0.3L9,35l3,7.3c0.1,0.2,0.3,0.3,0.5,0.3l0,0c0.2,0,0.4-0.1,0.5-0.3L17,31.1l2,5.7
   c0.1,0.2,0.3,0.3,0.5,0.3H22v-1H19.9z"/>
</g>
</svg>`

let icons = {
    Run: runIcon,
    Ride: rideIcon,
    Swim: swimIcon,
    Exercise: exerciseIcon
}

let formatDuration = sec => {
    if (sec < 3600) {
        return Math.round(sec / 60) + "min";
    } else {
        let min = Math.round((sec % 3600) / 60);
        return Math.floor(sec / 3600) + "h" + (min < 10 ? "0" + min : min)
    }
}

let formatSpeed = (ms, type) => {
    let speed = (ms / 1000 * 3600).toFixed(1) + 'km/h'
    switch (type) {
        case "Run":
            speed = Math.floor(1000 / ms / 60) + ":" + Math.round((1000 / ms) % 60) + "/km"
            break;
        case "Swim":
            speed = Math.floor(100 / ms / 60) + ":" + Math.round((100 / ms) % 60) + "/100m"
            break;
        default:
    }
    return speed;
}

async function getEvents() {
    let response = null;

    response = await fetch(`https://directus.ae3e.com/items/events?filter={"category":{"_in":["activity","post"]}}&limit=20&sort=-start&${window.localStorage.getItem('token') ? 'access_token=' + window.localStorage.getItem('token') : ''}`)
    const data = await response.json();
    return data;
}

async function getPost(id) {
    let response = await fetch(`https://directus.ae3e.com/items/posts/${id}?${window.localStorage.getItem('token') ? 'access_token=' + window.localStorage.getItem('token') : ''}`)
    const data = await response.json();
    return data;
}

async function isAdmin(token) {
    let response = await fetch(`https://script.google.com/macros/s/AKfycbzIUBAT-Zi3YWKJRY3bmv_IRlKyr67-sq7x4ZyG5JUsT8zasRPGA5_XYSEgtugDAZWT/exec?token=${token}`)
    const data = await response.json();
    return data;
}

if (id) { //d0c7bc5cfb6c972e8d801c7a1959214b
    getPost(id).then(post => {
        console.log(post)
        post = post.data;
        let updated = '';
        if (post.date_updated && post.date_created.split('T')[0] !== post.date_updated.split('T')[0]) {
            updated = `(Updated: ${post.date_updated.split('T')[0]})`
        }
        let md = post.content

        //ADD HEADER
        let innerHTML = `<h1 class="blog-post-title">${post.title} ${post.status === "published" ? "" : '<sup style="font-weight:ligter;font-size:12px; margin-top:-10px;padding: 1px 5px 1px 5px;background-color:#eb8b7a;">Private</sup>'}</h1>`

        if (md[0] === '{') {
            //ADD OBSERVABLE NOTEBOOK
            innerHTML += `<div class="blog-post-text" id="notebook"></div>`

            let config = JSON.parse(md);
            //http://localhost:8080/blog/notebook.html?id=2b6b4376067a377b&cells=intro;viewof%20map;profil&fitWidth=part2
            //http://localhost:8080/blog/notebook.html?id=d196da0f4af791f7

            //import define from "https://api.observablehq.com/d/2b6b4376067a377b.js?v=3";
            //console.log(define);
            //import { Runtime, Inspector, Library } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
            (async () => {
                let { Runtime, Inspector, Library } = await import("https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js");

                let id = config.id;

                //import define from "https://api.observablehq.com/d/2b6b4376067a377b.js?v=3";
                let def = await import('https://api.observablehq.com/d/' + id + '.js?v=3');
                let define = def.default
                console.log(Runtime)
                console.log(Inspector)
                console.log(Library)
                console.log(define)
                let cells = config.cells?.split(';');

                console.log(cells)
                if (cells) {
                    let root = document.querySelector("#notebook");
                    cells.forEach((cell, i) => {
                        let div = document.createElement('div');
                        div.id = 'part' + i;

                        root.appendChild(div);
                    });

                    const stdlib = new Library;


                    let fitWidth = config.fitWidth;
                    console.log(fitWidth)
                    if (fitWidth) {
                        const test = document.querySelector('#' + fitWidth);

                        const library = Object.assign({}, stdlib, { width });

                        function width() {
                            return stdlib.Generators.observe(notify => {
                                let width = notify(test.clientWidth);

                                function resized() {
                                    let width1 = test.clientWidth;
                                    if (width1 !== width) notify(width = width1);
                                }

                                window.addEventListener("resize", resized);
                                return () => window.removeEventListener("resize", resized);
                            });
                        }
                        new Runtime(library).module(define, name => {
                            let i = cells.indexOf(name)
                            if (i != -1) {
                                return new Inspector(document.querySelector("#part" + i));
                            }
                        })

                    } else {
                        new Runtime(stdlib).module(define, name => {
                            let i = cells.indexOf(name)
                            if (i != -1) {
                                return new Inspector(document.querySelector("#part" + i));
                            }
                        })
                    }



                } else {
                    new Runtime().module(define, Inspector.into(document.querySelector("#root")))
                }
            })()


        } else {
            //ADD GIST

            innerHTML += `<div class="blog-post-text">${marked(md)}</div>`

        }

        //ADD FOOTER
        innerHTML += `<div class="blog-post-bottom meta">${post.date_created.split('T')[0] + ' ' + updated}<span id='edit'></span></div>`;
        document.getElementById('root').innerHTML = innerHTML;
        isAdmin(localStorage.getItem('token')).then(data => {
            console.log(data)
            if (data.admin) {
                document.getElementById('edit').innerHTML = `- <a href="https://gist.github.com/ae3e/${gist.id}" target="_blank">${gist.id}</a>`
            }
        })
    })
} else {
    getEvents().then(data => {
        let code = ''

        console.log(data)
        let events = data.data
        events.filter(elt => elt.category === "activity" || elt.category === "post")
            .forEach(event => {
                console.log(event.category)
                let updated = '';
                let updateLabel = '';

                if (event.end && event.start.split('T')[0] !== event.end.split('T')[0] &&
                    new Date(event.end).getTime() > new Date().getTime() - 7 * 24 * 3600000) {
                    updateLabel = ' Updated'
                }
                code += `<div style="padding-left: 1.5em;text-indent:-1.8em;" class="blog-post-text"><span class="passive">&gt;_</span> <b>${event.start.split('T')[0]}</b>${updated} - ${event.category === 'post' ? '<a   href="?id=' + event.extra.id + '">' + event.description + '</a>' : icons[event.extra.type] + ' ' + event.description + ' <span class="hidden-sm-up"><br/></span><span style="color:#CCC;font-size:14px"> ' + (event.extra.distance / 1000).toFixed(1) + 'km | ' + formatDuration(event.extra.moving_time) + ' | ' + formatSpeed(event.extra.average_speed, event.extra.type) + '</span><span class="hidden-sm-down" style="color:#CCC;font-size:14px">' + (event.extra.total_elevation_gain !== 0 ? ' | ' + Math.round(event.extra.total_elevation_gain) + 'm' : '') + (event.extra.average_heartrate ? ' | ' + Math.round(event.extra.average_heartrate) + 'bpm' : '')}</span>${event.private ? '<span style="padding: 1px 5px 1px 5px;background-color:#eb8b7a;">Private</span>' : ""}${updateLabel}<br/></div>
            `
            })
        //console.log(data)
        document.getElementById('root').innerHTML = code;

    })
}

let metaNotebooks = [{
    id: "./notebook?id=65bd6e28cbb67e0b&cells=intro;viewof%20route;routeStat;viewof%20map;profil;lastrequest;blog&fitWidth=part3",
    description: "Cycle challenge",
    created_at: "2021-09-13",
    updated_at: "2021-09-13",
    public: true,
    type: 'notebook'
}]

async function getWeather() {
    let response = null;

    //response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=48.68853&longitude=5.619284&current_weather=true`)
    response = await fetch(`https://directus.ae3e.com/items/measurements?limit=4&sort=-time`)
    const data = await response.json();
    return data;
}

getWeather().then(data => {
    console.log(data)

    const weather_codes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Slight or moderate thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    }

    const weather_icons = {
        0: "wi-day-sunny",
        1: "wi-day-sunny-overcast",
        2: "wi-day-cloudy",
        3: "wi-cloudy",
        45: "wi-fog",
        48: "wi-fog",
        51: "wi-sleet",
        53: "wi-showers",
        55: "wi-hail",
        56: "wi-sleet",
        57: "wi-hail",
        61: "wi-hail",
        63: "wi-rain-mix",
        65: "wi-rain",
        66: "wi-hail",
        67: "wi-rain",
        71: "wi-snow",
        73: "wi-snow",
        75: "wi-snow",
        77: "wi-snow",
        80: "wi-showers",
        81: "wi-showers",
        82: "wi-showers",
        85: "wi-snow",
        86: "wi-snow",
        95: "wi-storm-showers",
        96: "wi-thunderstorm",
        99: "wi-thunderstorm"
    }
    document.getElementById('external-temp').innerHTML = `<span title="${data.data[0].time}">${Math.round(data.data.filter((elt) => elt.sensor_id === 23)[0].measurement)}°C </span>| <i alt="${data.data[0].time}" class="wi ${weather_icons[data.data.filter((elt) => elt.sensor_id === 26)[0].measurement]}"></i> ${weather_codes[data.data.filter((elt) => elt.sensor_id === 26)[0].measurement]} | <span style="font-size:20px;display:inline-block;transform-origin:50% 65%;transform: rotate(${data.data.filter((elt) => elt.sensor_id === 24)[0].measurement + 180}deg);">↑</span> ${Math.round(data.data.filter((elt) => elt.sensor_id === 25)[0].measurement)}<span style="font-size:12px">km/h</span>`;

})