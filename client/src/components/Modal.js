import {motion } from 'framer-motion'

import './Modal.scss'

const dropIn = {
    hidden: {
        y: "-50%",
        x: "-50%",
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
        }
    },
    exit: {
        opacity: 0,
    }
}

const Modal = ({ handleClose, handleDelete, text }) => {
    return (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            className="modal" 
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit">
                <h2 className="heading-2">{`Do you want delete '${text}'?`}</h2>
                <div className="btns">
                    <button className="btn btn-modal" onClick={handleClose}>Cancel</button>
                    <button className="btn btn-modal btn-delete" onClick={handleDelete}>Yes</button>
                </div>
        </motion.div>
    )
}

export default Modal;