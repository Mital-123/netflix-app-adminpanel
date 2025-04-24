import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ButtonCom from './Main/ButtonCom'

function AddSeason() {

    const [obj, setobj] = useState({});
    const [SeasonArray, setSeasonArray] = useState([]);
    const [blankobj, setblankobj] = useState({});
    const [showModal, setShowModal] = useState(false);

    const location = useLocation();
    const { seriestittle } = location.state || {};

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const addSeasonData = (e) => {
        obj[e.target.name] = e.target.value;
        blankobj[e.target.name] = "";

        setobj({ ...obj });
        setblankobj({ ...blankobj });
    }

    const AddSeasonSaveData = () => {
        SeasonArray.push(obj);
        console.log(SeasonArray);

        setSeasonArray([...SeasonArray]);
        setobj({ ...blankobj });
        setShowModal(false);
    }

    return (
        <>
            <div className='p-4'>
                <div className='d-flex justify-content-center'>
                    <div><h3 className='fw-bold'>Season List</h3></div>
                    <div className='ms-auto'>
                        <ButtonCom btn="Add Season" onClick={openModal} />
                    </div>
                </div>
                <div className='text-center'>
                    <h4 className='fw-bold my-3'>{seriestittle || 'Series Title'}</h4>
                </div>

                {
                    showModal && (
                        <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title fw-bold">Add Season</h5>
                                        <button type="button" className="btn-close" onClick={closeModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className='px-2'>
                                            <div>
                                                <label htmlFor="" className='fw-medium'>Season Name / Number</label>
                                                <input type="text" name="seasonname" id="" className='form-control mt-1 border border-secondary' onChange={addSeasonData} value={obj?.seasonname || ''} />
                                            </div>
                                            <div className='text-center mt-3'>
                                                <ButtonCom btn="Save" onClick={AddSeasonSaveData} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className='table-responsive mt-4'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Season Name / Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                SeasonArray.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.seasonname}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AddSeason;