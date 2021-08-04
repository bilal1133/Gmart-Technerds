import React from 'react';
import UsersAddressesAdd from "../pages/usersAddress/usersAddressesAdd";

const AddAddressModal = ({idUser}) => {
    return (
        <div className="modal fade" id="addAddressModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="h3 mb-2 text-gray-800">Add client address</h1>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <UsersAddressesAdd isModal={true} idUser={idUser}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddAddressModal;