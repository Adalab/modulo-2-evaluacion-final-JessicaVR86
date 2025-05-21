const l=document.querySelector(".js_title"),u=document.querySelector(".searchtext"),f=document.querySelector(".js_searchbtn"),v=document.querySelector(".js_movieslist"),o=document.querySelector(".js_favouritelist");let n=[],c=[];l.addEventListener("mouseover",()=>{l.classList.add("title")});l.addEventListener("mouseout",()=>{l.classList.remove("title")});const i=t=>{let e="";return t.images?e=`<li class="cardbox js_select_card" data-identity= "${t.mal_id}">
            <h6 class="cardtitle">  ${t.title} </h6><br>
            <img
              src=" ${t.images.jpg.image_url}"
              alt=""
              class="cardphoto"
            />
          </li>`:e=`<li class="cardbox js_select_card " data-identity= "${t.mal_id}" >
            <h6 class="cardtitle">  ${t.title} </h6><br>
            <img
              src="https://placehold.co/210x300/ffffff/555555?text=TV"
              alt=""
              class="cardphoto"
            />
          </li>`,e},_=t=>{t.preventDefault();const e=u.value;fetch(`https://api.jikan.moe/v4/anime?q=${e}`).then(s=>s.json()).then(s=>{n=s.data,d()})};f.addEventListener("click",_);const d=()=>{let t="";for(const s of n)t+=i(s);v.innerHTML=t;const e=document.querySelectorAll(".js_select_card");for(const s of e)s.addEventListener("click",p)};function j(){let t="";for(const e of c)t+=i(e);o.innerHTML=t}const p=t=>{const e=t.currentTarget;e.classList.toggle("favourite");const s=parseInt(e.dataset.identity),r=c.findIndex(a=>a.mal_id===s);if(r===-1){const a=n.find(h=>h.mal_id===s);c.push(a),localStorage.setItem("favouriteCards",JSON.stringify(c));const m=i(a);o.innerHTML+=m}else c.splice(r,1),j()};fetch("https://api.jikan.moe/v4/anime?q=naruto").then(t=>t.json()).then(t=>{n=t.data,d()});
//# sourceMappingURL=main.js.map
