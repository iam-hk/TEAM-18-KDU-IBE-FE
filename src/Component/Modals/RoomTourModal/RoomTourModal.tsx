import React, { useEffect, useRef } from 'react'
import {Modal} from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import "./RoomTourModal.scss";
interface IRoomTourProp{
    open:boolean;
    onClose:()=>void;
    srcImg: string
}

function RoomTourModal(props:IRoomTourProp) {
  const iframeRef = useRef(null);

  useEffect(() => {
      const iframe = iframeRef.current;

      const onLoadHandler = () => {
          const iframeDocument = iframe.contentWindow.document;
          const divInsideIframe = iframeDocument.getElementById("31");
          if (divInsideIframe) {
              divInsideIframe.style.display = "none";
          }
      };

      if (iframe) {
          iframe.onload = onLoadHandler;
      }

      return () => {
          if (iframe) {
              iframe.onload = null; // Clean up the onload handler
          }
      };
  }, []);

   
  return (
    <div style={{width:"80vw",height:"80vh"}}>
      <Modal open={props.open} onClose={props.onClose} center>
        <div className='room_tour_main_container'>
        <iframe id='iframe_box'
                src={props.srcImg}
                title="Room Tour"
                width="100%" 
                height="600px" 
                frameborder="0" 
                allowfullscreen
            ></iframe>
        </div>
      </Modal>
    </div>
  )
}

export default RoomTourModal;
