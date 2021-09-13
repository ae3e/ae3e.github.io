
let id = null
var searchParams = new URLSearchParams(window.location.search);
if(searchParams.has("id")){
    id = searchParams.get("id")
}

hljs.initHighlightingOnLoad();

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, language) {
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
    if(window.localStorage.getItem('token')){
        let baseUrl = "https://script.google.com/macros/s/AKfycbzIUBAT-Zi3YWKJRY3bmv_IRlKyr67-sq7x4ZyG5JUsT8zasRPGA5_XYSEgtugDAZWT/exec";
        response = await fetch(baseUrl,
            {
                method: 'POST',
                body: JSON.stringify({
                    service: 'Github',
                    token:window.localStorage.getItem('token')
                })
            });
    }else{
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

if(id){ //d0c7bc5cfb6c972e8d801c7a1959214b
    getGist(id).then(gist =>{
        console.log(gist)
        let updated = '';
        if(gist.created_at.split('T')[0]!==gist.updated_at.split('T')[0]){
            updated=`(Updated: ${gist.updated_at.split('T')[0]})`
        }
        let md = gist.files["README.md"].content
        document.getElementById('root').innerHTML = `
        <h1 class="blog-post-title">${gist.description} ${gist.public?"":'<sup style="font-weight:ligter;font-size:12px; margin-top:-10px;padding: 1px 5px 1px 5px;background-color:#eb8b7a;">Private</sup>'}</h1>
        <div class="blog-post-text">${marked(md)}</div>
        <div class="blog-post-bottom meta">${gist.created_at.split('T')[0]+' '+updated}<span id='edit'></span></div>`;
        console.log(localStorage.getItem('token'))
        isAdmin(localStorage.getItem('token')).then(data=>{
            console.log(data)
            if(data.admin){
                document.getElementById('edit').innerHTML= `- <a href="https://gist.github.com/ae3e/${gist.id}" target="_blank">${gist.id}</a>`
            }
        })
    })
}else{
    getGists().then(data => {
        let code = ''
        let filteredGists = data.filter(gist=>gist.files['README.md'])
        
        //Merge gists and notebooks
        let posts = filteredGists.concat(metaNotebooks);
        posts.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
          })
          posts.forEach(post => {
            let updated = '';
            let updateLabel='';

            if(post.created_at.split('T')[0]!==post.updated_at.split('T')[0] &&
                new Date(post.updated_at).getTime()>new Date().getTime()-7*24*3600000){
                updateLabel = ' Updated'
            }
            code += `<div class="blog-post-text"><span class="passive">&gt;_</span> <b>${post.created_at.split('T')[0]}</b>${updated} - <a  href="${post.type=='notebook'?post.id:'?id='+post.id}">${post.description}</a>${post.public?"":'<span style="padding: 1px 5px 1px 5px;background-color:#eb8b7a;">Private</span>'}${updateLabel}<br/></div>
            `
        })
        //console.log(data)
        document.getElementById('root').innerHTML = code;
    
    })
}

let metaNotebooks=[{
    id:"./notebook?id=65bd6e28cbb67e0b&cells=intro;viewof%20route;routeStat;viewof%20map;profil;lastrequest;blog&fitWidth=part3",
    description:"Cycle challenge",
    created_at:"2021-09-13",
    updated_at:"2021-09-13",
    public:true,
    type:'notebook'
}]