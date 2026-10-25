(function(){
var S=[].slice.call(document.querySelectorAll('.screen')),cur=0,busy=false,pn=document.getElementById('pn'),dots=document.querySelectorAll('#prog span i');
var tk='';for(var i=0;i<12;i++){var a=i*30*Math.PI/180;tk+='<line x1="'+(100+60*Math.sin(a))+'" y1="'+(106-60*Math.cos(a))+'" x2="'+(100+66*Math.sin(a))+'" y2="'+(106-66*Math.cos(a))+'" stroke="#bdb3b8" stroke-width="2"/>'}
document.getElementById('tk').innerHTML=tk;
function show(n){var s=S[n];s.scrollTop=0;[].forEach.call(s.querySelectorAll('.r'),function(e,i){e.style.setProperty('--d',(e.dataset.d!==undefined?e.dataset.d:Math.min(.15+i*.22,1.7))+'s')});void s.offsetWidth;s.classList.add('on');pn.textContent='0'+(n+1)+' / 06';[].forEach.call(dots,function(d,i){d.className=i==n?'a':''})}
function go(n){if(busy)return;busy=true;S[cur].classList.remove('on');cur=n;setTimeout(function(){show(n);busy=false},500)}
show(0);
document.addEventListener('click',function(e){var b=e.target.closest('[data-go]');if(b){go(+b.dataset.go);}});
function burst(x,y,n){var c=['#e8478a','#f7a8c6','#c9356f','#ffd1e0','#b9a6ee'];for(var i=0;i<n;i++){var p=document.createElement('i');p.className='pt';var an=Math.random()*6.28,d=40+Math.random()*130;p.style.cssText='left:'+x+'px;top:'+y+'px;background:'+c[i%5]+';--x:'+Math.cos(an)*d+'px;--y:'+(Math.sin(an)*d-20)+'px';document.body.appendChild(p);setTimeout(function(q){q.remove()},1400,p)}}
document.getElementById('yes').onclick=function(e){var r=e.target.getBoundingClientRect();burst(r.left+r.width/2,r.top,40);document.getElementById('q').hidden=true;document.getElementById('yay').hidden=false;document.getElementById('ask').style.transform='scale(1.03)'};
document.getElementById('mad').onclick=function(){var c=document.getElementById('ask');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');var y=document.getElementById('yes');y.style.transform='scale(1.12)';setTimeout(function(){y.style.transform=''},600)};
var fin=document.getElementById('fin');
document.getElementById('hug').onclick=function(e){var r=e.target.getBoundingClientRect();burst(r.left+r.width/2,r.top,30);fin.classList.add('on');setTimeout(function(){burst(innerWidth/2,innerHeight*.28,50)},900)};
document.getElementById('close').onclick=function(){fin.classList.remove('on')};
document.getElementById('again').onclick=function(){fin.classList.remove('on');S[cur].classList.remove('on');cur=0;setTimeout(function(){show(0)},500)};
/* music: autoplay attempt; first tap anywhere (or the pill) starts it; plays once from the start, never restarted by navigation */
var au=new Audio('muskuuu-song-from-00-58.mp3');au.loop=false;au.preload='auto';au.volume=.9;au.setAttribute('playsinline','');var ok=false,mp=document.getElementById('mp'),EV=['pointerdown','touchend','click','keydown'];
function done(){ok=true;mp.hidden=true;EV.forEach(function(t){removeEventListener(t,play,true)})}
function play(){if(ok)return;var p=au.play();if(p&&p.then)p.then(done).catch(function(){mp.hidden=false})}
EV.forEach(function(t){addEventListener(t,play,{capture:true,passive:true})});mp.onclick=play;
au.addEventListener('playing',done);play();
document.addEventListener('visibilitychange',function(){if(document.hidden)au.pause();else if(ok&&!au.ended)au.play().catch(function(){})});
addEventListener('pagehide',function(){au.pause()});
})();
