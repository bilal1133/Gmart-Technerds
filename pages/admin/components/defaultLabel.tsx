import React from 'react';

const DefaultLabel = (props) => {
    if (props.type == 0) {
        return (
            <div className="badge badge-danger">No</div>
        )
    } else {
        return (
            <div className="badge badge-success">Yes</div>
        )
    }
}

export default DefaultLabel;