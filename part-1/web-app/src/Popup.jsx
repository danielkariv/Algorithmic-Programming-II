import { Button } from 'react-bootstrap';
import "./Popup.css";


function Popup(props)
{ 
    return (props.triggerd) ? (
            <div className="popup" >
                <div className="popup-inner">
                <button type="button"  class="btn-close btn-close-black" aria-label="Close" onClick={() => {props.setTrigger(false)}}></button>
                <br/>
                {props.children}
                {(props.kind== "img") ? <img  src={window.location.origin + props.imgsrc} ></img>: ((props.kind== "vid")? <video width="400" controls > <source src={window.location.origin + props.imgsrc} /></video>  :"")}
                </div>

            </div>

    ) : "";

}

export default Popup