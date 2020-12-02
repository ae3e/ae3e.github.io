
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
        let baseUrl = "https://script.google.com/macros/s/AKfycbwaB_Q-cHBz8-ZGFKV3UZ1nxy5XyeQEzKCBMmKt0OLng9663q_M/exec";
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

if(id){ //d0c7bc5cfb6c972e8d801c7a1959214b
    getGist(id).then(data =>{
        let md = data.files["README.md"].content
        document.getElementById('root').innerHTML = marked(md);
    })
}else{
    getGists().then(data => {
        let code = ''
        let filteredGists = data.filter(gist=>gist.files['README.md'])
        filteredGists.forEach(gist => {
            let updated = '';
            if(gist.created_at.split('T')[0]!==gist.updated_at.split('T')[0]){
                updated=`(Updated : ${gist.updated_at.split('T')[0]})`
            }
            code += `<div class="blog-post-text">>_ <b>${gist.created_at.split('T')[0]}</b>${updated} - <a  href="?id=${gist.id}">${gist.description}</a><br/></div>
            `
        })
        //console.log(data)
        document.getElementById('root').innerHTML = code;
    
    })
}
