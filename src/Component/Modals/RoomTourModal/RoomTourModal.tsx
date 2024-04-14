import React, { useEffect, useRef } from 'react'
import {Modal} from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import "./RoomTourModal.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
interface IRoomTourProp{
    open:boolean;
    onClose:()=>void;
}

function RoomTourModal(props:IRoomTourProp) {
  const iframeRef = useRef(null);
  const srcImg=useSelector((state:RootState)=>state.tenantInfo.propertyTourLink);
  return (
    // <div style={{width:"80vw",height:"80vh"}}>
      <Modal open={props.open} onClose={props.onClose} center>
        <div className='room_tour_main_container'>
        <iframe id='iframe_box'
                src={srcImg}
                title="Room Tour"
                width="100%" 
                height="600px" 
                frameborder="0" 
                allowfullscreen
            ></iframe>
        </div>
      </Modal>
    // </div>
  )
}

export default RoomTourModal;
