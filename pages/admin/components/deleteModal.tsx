import React from 'react';

const DeleteModal = ({ onSubmit }) => {
    return (
        <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Do you want to delete this Item ?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <button className="btn btn-primary" onClick={onSubmit} type="button" data-dismiss="modal">Delete</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default DeleteModal;