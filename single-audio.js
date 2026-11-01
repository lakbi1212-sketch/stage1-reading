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
window.__PH_EMBED = Object.assign(window.__PH_EMBED || {}, {"ph-a":"data:audio/mp4;base64,AAAAHGZ0eXBNNEEgAAACAE00QSBpc29taXNvMgAAAwttb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAegABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACNXRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAegAAAAAAAAAAAAAAAQEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAHoAAAQAAAEAAAAAAa1tZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAAF3AAAALcFXEAAAAAAAtaGRscgAAAAAAAAAAc291bgAAAAAAAAAAAAAAAFNvdW5kSGFuZGxlcgAAAAFYbWluZgAAABBzbWhkAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAAGpzdHNkAAAAAAAAAAEAAABabXA0YQAAAAAAAAABAAAAAAAAAAAAAgAQAAAAAF3AAAAAAAA2ZXNkcwAAAAADgICAJQABAASAgIAXQBUAAAAAAMmLAADJiwWAgIAFEwhW5QAGgICAAQIAAAAgc3R0cwAAAAAAAAACAAAAAwAABAAAAAABAAADcAAAABxzdHNjAAAAAAAAAAEAAAABAAAABAAAAAEAAAAkc3RzegAAAAAAAAAAAAAABAAAAQwAAAErAAAA+QAAAPYAAAAUc3RjbwAAAAAAAAABAAADNwAAABpzZ3BkAQAAAHJvbGwAAAACAAAAAf//AAAAHHNiZ3AAAAAAcm9sbAAAAAEAAAAEAAAAAQAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTguNzYuMTAwAAAACGZyZWUAAAQubWRhdN4EAExhdmM1OC4xMzQuMTAwAAJwr1tojHgaDEuhFVhAAAAAA+AA/8hBIJBJ4dB2b9x9l7PbWvPuHzGaHQkiG4PuH9D+J3g/df/b/v/edlnjAMni9rxc+3Vs25ssRg06SqqqJRPAAURCAqnZ2ePjKMQCllV7fu+7xyzqBQyOB3HcYkwwzqABGHh6x8AAAP8w0AAMOFP6f0gl/iJT7iXxM+gf0/pmBLQAl/j9ocPl2h9/lFTN/jb1iSM3x4afvpaRozEVOv4ffSS7ZjR9/k07RXbALD+hniaAK7c8YABLQUzZ45gAU2rOyeKYmmU+y8LPsbzYGxMIiiw53HSlkbzzuDrPfmyNF83uZsWHIfABRp7aEkF7qaY9WgpzWboAO2ecwcZkq/aOMa8Z6+4GvYv+L9ewP8b40pcd/QH7jpG3/cd+6/4XW130JZrvAxSBHaC5GWozJPzMrRWlnia3sC8XX3fO5R7n/QfUph0VucCg1qJOHhxrv5hv162Os6uPN5WKWiokWImfcaYnCWoCgaG2hUUqwJVDjFuo6RzZnpFND5JZ/Cf2g3JnmV98UC5BEFEeOOyPXn/sjdBloVmJ6ve1/yGrkhb3/+GMb6l/gdWwsGO/GZZVYqqFqH3H5H8TMsvjoKBf5Mz9z/N5WSjCJgMlYHb3+xyibOcNXlYkqXQFbzC8cSDxoMZZu/zmzEgpa9bdOc99bJIaRu3eXDOaqKuyfclPtp2zXyXfvqv8MJdhMq3j5KO8Ouv+eAFAn7abMkC0hKae1ErYAdwB7fG/PftP+gE/HxvjnyeO8r/hx0MDccdJ3HIJhzpchdylIble565Ta/wNg7U71ltMigihvpGi6frtWU0DMGO4eaXNACWKHa1fB+0tvzT59SW9oIwI7YPLk5DCqOcTR5RC/ndfDXhk96IZGHEb5V3YXmax7yw2QsId8Zbo2KmlfG1dIyFcLochwGNgJ6VZ7jyEfpz2oMuivDeHfJ0qgWEdul8pP5kV2VkXIkIwnivN8msHydvu0NS0hoxi+FrEzV5jgIi974pJLaZrGpfaJG80rOpOgLXJOpBVJwSogZ4NgNYs3mJmQG+OngEMn7b6ZQaKo+gwfkAABLv8aXHfhzyA8wI8OkXUQjm8I2sqkJZ2wRgXiRaRK26sR5CGQxWSJ9mxxFOQIF1NvsIz4BLR8AJ4lZHEawjhAkjSSUAVQyiB5mQlkoZsL/W27Yx9JIMhEpbJ+B6ESSMiQ3e5EIJFfspE8T3Bc/Y3N/XLqUldZUmhM38pOFiPPZ4Chuq//tvMp5UBzml+PqOMpdl9ZkAAAAl3srf7BMAhp9FwTOcLt9Zvm9Yn9EufmQ+uvyaOCRBQPBOii+Xz8vz/63GH9u3r4Ril4oJvbjrj8uX1RionMY4+sAWJnVGkRBtHqnWh0nmBwA=="});
