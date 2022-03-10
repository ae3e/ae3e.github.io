
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


async function getPosts() {
    let response = null;

    response = await fetch(`https://directus.ae3e.com/items/posts?sort=-date_created&${window.localStorage.getItem('token') ? 'access_token=' + window.localStorage.getItem('token') : ''}`)
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
    getPosts().then(data => {
        let code = ''

        console.log(data)
        let posts = data.data
        posts.forEach(post => {
            let updated = '';
            let updateLabel = '';

            if (post.date_updated && post.date_created.split('T')[0] !== post.date_updated.split('T')[0] &&
                new Date(post.date_updated).getTime() > new Date().getTime() - 7 * 24 * 3600000) {
                updateLabel = ' Updated'
            }
            code += `<div class="blog-post-text"><span class="passive">&gt;_</span> <b>${post.date_created.split('T')[0]}</b>${updated} - <a  href="${post.type == 'notebook' ? post.id : '?id=' + post.id}">${post.title}</a>${post.status === "published" ? "" : '<span style="padding: 1px 5px 1px 5px;background-color:#eb8b7a;">Private</span>'}${updateLabel}<br/></div>
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
    response = await fetch(`https://directus.ae3e.com/items/measurements?access_token=blog&limit=4&sort=-time`)
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