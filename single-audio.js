/* One voice at a time: starting any audio stops the one already playing;
   pressing the same button again restarts from the beginning (never two overlapping).
   Looping background music is left alone. */
(function(){
  if(window.__singleAudio)return;window.__singleAudio=1;
  var P=window.HTMLMediaElement&&HTMLMediaElement.prototype;if(!P)return;
  var op=P.play,cur=null;
  function stopEl(a){try{a.pause();a.currentTime=0}catch(e){}}
  P.play=function(){
    var a=this;
    try{
      if(!a.loop){
        if(cur&&cur!==a&&!cur.paused&&!cur.ended)stopEl(cur);
        else if(cur===a&&!a.paused&&!a.ended)a.currentTime=0;
        cur=a;
      }
    }catch(e){}
    return op.apply(a,arguments);
  };
  /* audio started from native player controls */
  document.addEventListener('play',function(e){
    var a=e.target;if(!a||a.loop)return;
    try{if(cur&&cur!==a&&!cur.paused&&!cur.ended)stopEl(cur);cur=a}catch(x){}
  },true);
})();

/* Recorded phoneme override: clean front /ae/ for short a (2026-11-01). */
window.__PH_EMBED = Object.assign(window.__PH_EMBED || {}, {"ph-a":"data:audio/mp4;base64,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"});
