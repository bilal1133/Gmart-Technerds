import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Dialog = (props) => {
    useEffect(() => {
        $("#dialog").show();
    });

    return (
        <div className="modal" id="dialog" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Gmarket Info</h5>
                    </div>
                    <div className="modal-body">
                        <p>{props.text}</p>
                    </div>
                    <div className="modal-footer">
                        <Link to={props.goLink}>
                            <button type="button" className="btn btn-primary">Go this page</button>
                        </Link>
                        <Link to={props.backLink}>
                            <button type="button" className="btn btn-secondary">Go back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialog;