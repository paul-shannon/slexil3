import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'

var player;
//--------------------------------------------------------------------------------
function createPlayer(url, containerID, buttonID)
{
   player = WaveSurfer.create({
      container: containerID,
      waveColor: '#4F4A85',
      progressColor: '#383351',
      url: url
      })

   $(buttonID).on("click", function(){
       let buttonLabel = $(buttonID).text()
       if(buttonLabel == "Play"){
          $(buttonID).text("Pause")
          player.play();
          }
       else{
          player.pause()
          $(buttonID).text("Play")
          }
       }) // on button click

 } // createPlayer
//--------------------------------------------------------------------------------
export default createPlayer;
