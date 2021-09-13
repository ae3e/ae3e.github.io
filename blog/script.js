
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

async function getGists() {
    let response = null;
    if (window.localStorage.getItem('token')) {
        let baseUrl = "https://script.google.com/macros/s/AKfycbzIUBAT-Zi3YWKJRY3bmv_IRlKyr67-sq7x4ZyG5JUsT8zasRPGA5_XYSEgtugDAZWT/exec";
        response = await fetch(baseUrl,
            {
                method: 'POST',
                body: JSON.stringify({
                    service: 'Github',
                    token: window.localStorage.getItem('token')
                })
            });
    } else {
        response = await fetch("https://api.github.com/users/ae3e/gists")
    }
    const data = await response.json();
    return data;
}

async function getGist(id) {
    let response = await fetch(`https://api.github.com/gists/${id}`)
    const data = await response.json();
    return data;
}

async function isAdmin(token) {
    let response = await fetch(`https://script.google.com/macros/s/AKfycbzIUBAT-Zi3YWKJRY3bmv_IRlKyr67-sq7x4ZyG5JUsT8zasRPGA5_XYSEgtugDAZWT/exec?token=${token}`)
    const data = await response.json();
    return data;
}

if (id) { //d0c7bc5cfb6c972e8d801c7a1959214b
    getGist(id).then(gist => {
        console.log(gist)
        let updated = '';
        if (gist.created_at.split('T')[0] !== gist.updated_at.split('T')[0]) {
            updated = `(Updated: ${gist.updated_at.split('T')[0]})`
        }
        let md = gist.files["README.md"].content

        //ADD HEADER
        let innerHTML = `<h1 class="blog-post-title">${gist.description} ${gist.public ? "" : '<sup style="font-weight:ligter;font-size:12px; margin-top:-10px;padding: 1px 5px 1px 5px;background-color:#eb8b7a;">Private</sup>'}</h1>`

        if (md[0] === '{') {
            //ADD OBSERVABLE NOTEBOOK
            innerHTML += `<div id="notebook"></div>`

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
        innerHTML += `<div class="blog-post-bottom meta">${gist.created_at.split('T')[0] + ' ' + updated}<span id='edit'></span></div>`;
        document.getElementById('root').innerHTML = innerHTML;
        isAdmin(localStorage.getItem('token')).then(data => {
            console.log(data)
            if (data.admin) {
                document.getElementById('edit').innerHTML = `- <a href="https://gist.github.com/ae3e/${gist.id}" target="_blank">${gist.id}</a>`
            }
        })
    })
} else {
    getGists().then(data => {
        let code = ''
        let filteredGists = data.filter(gist => gist.files['README.md'])

        filteredGists.forEach(gist => {
            let updated = '';
            let updateLabel = '';
            /*if(gist.created_at.split('T')[0]!==gist.updated_at.split('T')[0]){
                updated=` (Updated : ${gist.updated_at.split('T')[0]})`
            }*/
            if (gist.created_at.split('T')[0] !== gist.updated_at.split('T')[0] &&
                new Date(gist.updated_at).getTime() > new Date().getTime() - 7 * 24 * 3600000) {
                updateLabel = ' Updated'
            }
            code += `<div class="blog-post-text"><span class="passive">&gt;_</span> <b>${gist.created_at.split('T')[0]}</b>${updated} - <a  href="${gist.type == 'notebook' ? gist.id : '?id=' + gist.id}">${gist.description}</a>${gist.public ? "" : '<span style="padding: 1px 5px 1px 5px;background-color:#eb8b7a;">Private</span>'}${updateLabel}<br/></div>
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