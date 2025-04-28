import React, { useState } from 'react'
import ButtonCom from './Main/ButtonCom'

function AddMovies() {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='container p-4'>
                <div className='d-flex justify-content-center'>
                    <div className="d-none d-md-block d-lg-block"><h3 className='fw-bold text-center'>Movie List</h3></div>
                    <div className='ms-lg-auto ms-md-auto ms-sm-0 d-flex justify-content-sm-center'>
                        <ButtonCom btn="Add New Movie" onClick={() => setShowModal(true)} />
                    </div>
                </div>

                {
                    showModal && (
                        <div className="modal d-block"
                            tabIndex="-1"
                            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title fw-bold">Add New Movie</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <form action="" className="p-2">
                                            <div>
                                                <div className='d-flex justify-content-center gap-3'>
                                                    <div className="w-50">
                                                        <label className="fw-medium">Movie Name</label>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            className="form-control mt-1 border border-secondary w-100"
                                                        />
                                                    </div>
                                                    <div className='w-50'>
                                                        <label className="fw-medium">Date</label>
                                                        <input
                                                            type="date"
                                                            name="releaseDate"
                                                            className="form-control mt-1 border border-secondary"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='w-100 mt-2'>
                                                    <label className="fw-medium">Types (comma separated):</label>
                                                    <input
                                                        type="text"
                                                        name="types"
                                                        className="form-control mt-1 border border-secondary"
                                                        placeholder="e.g. Action, Drama"
                                                    />
                                                </div>
                                                <div className="w-100 mt-2">
                                                    <label className="fw-medium">Description</label>
                                                    <textarea
                                                        name="description"
                                                        rows="3"
                                                        className="form-control mt-1 border border-secondary"
                                                    />
                                                </div>
                                                <div className='w-100 mt-2'>
                                                    <label className="fw-medium">Image</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="form-control mt-1 border border-secondary"
                                                    />
                                                </div>
                                                <div className='w-100 mt-2'>
                                                    <label className="fw-medium">Video</label>
                                                    <input
                                                        type="file"
                                                        accept="video/*"
                                                        className="form-control mt-1 border border-secondary"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <button type='submit' className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default AddMovies