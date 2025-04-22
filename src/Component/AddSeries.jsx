import React, { useEffect, useRef, useState } from 'react'
import ButtonCom from './Main/ButtonCom'
import { useNavigate } from 'react-router-dom';

function AddSeries() {

    const [showModal, setShowModal] = useState(false);
    const [obj, setobj] = useState({});
    const [array, setarray] = useState([]);
    const [blankobj, setblankobj] = useState({});
    const [error, setError] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem('seriesData');
        if (storedData) {
            setarray(JSON.parse(storedData));
        }
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setobj({});
        setEditIndex(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const addSeriesData = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    obj[e.target.name] = reader.result;
                    blankobj[e.target.name] = null;
                    setobj({ ...obj });
                    setblankobj({ ...blankobj });
                };
                reader.readAsDataURL(file);
            }
        } else {
            obj[e.target.name] = e.target.value;
            blankobj[e.target.name] = "";
            setobj({ ...obj });
            setblankobj({ ...blankobj });
        }
    }

    const AddSeriesSaveData = () => {
        if (!obj.seriestittle || !obj.description || !obj.date || !obj.type || !obj.thumbnail) {
            setError("Please fill in all fields.");
            return;
        }

        if (editIndex !== null) {
            // 👇 Edit mode
            const updatedArray = [...array];
            updatedArray[editIndex] = obj;
            setarray(updatedArray);
            localStorage.setItem('seriesData', JSON.stringify(updatedArray));
        } else {
            // 👇 Add mode
            const updatedArray = [...array, obj];
            setarray(updatedArray);
            localStorage.setItem('seriesData', JSON.stringify(updatedArray));
        }

        closeModal();
    };

    const handleEdit = (index) => {
        setobj(array[index]);
        setEditIndex(index);
        setShowModal(true);
    };

    const handleDelete = (index) => {
        const updatedArray = array.filter((_, i) => i !== index);
        setarray(updatedArray);
        localStorage.setItem('seriesData', JSON.stringify(updatedArray));
    }

    return (
        <div className='p-4'>
            <div className='d-flex justify-content-center'>
                <div><h3 className='fw-bold'>Series List</h3></div>
                <div className='ms-auto'>
                    <ButtonCom btn="Add Series" onClick={openModal} />
                </div>
            </div>

            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">Add Series</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <form className='px-2'>
                                    <div className='w-100 mt-2'>
                                        <label className='fw-medium'>Series Title</label>
                                        <input type="text" name="seriestittle" className='form-control mt-1 border border-secondary' onChange={addSeriesData} value={obj?.seriestittle || ''} />
                                    </div>
                                    <div className='d-flex justify-content-center gap-3'>
                                        <div className='w-50 mt-2'>
                                            <label className='fw-medium'>Type</label>
                                            <input type="text" name="type" className='form-control mt-1 border border-secondary' onChange={addSeriesData} value={obj?.type || ''} />
                                        </div>
                                        <div className='w-50 mt-2'>
                                            <label className='fw-medium'>Date</label>
                                            <input type="date" name="date" className='form-control mt-1 border border-secondary' onChange={addSeriesData} value={obj?.date || ''} />
                                        </div>
                                    </div>
                                    <div className='w-100 mt-2'>
                                        <label className='fw-medium'>Thumbnail Image</label>
                                        <input type="file" name="thumbnail" className='form-control mt-1 border border-secondary' ref={fileInputRef} onChange={addSeriesData} />
                                    </div>
                                    <div className='w-100 mt-2'>
                                        <label className='fw-medium'>Description</label>
                                        <textarea name="description" id="" className='form-control mt-1 border border-secondary' onChange={addSeriesData} value={obj?.description || ''}></textarea>
                                    </div>
                                    {error && <div className="text-danger text-center mt-3 fw-medium">{error}</div>}
                                    <div className='text-center mt-3'>
                                        <ButtonCom btn="Save" onClick={AddSeriesSaveData} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='table-responsive mt-4'>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>Series Title</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Thumbnail Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {array.map((item, index) => (
                            <tr key={index}>
                                <td style={{ width: "20%" }}>{item.seriestittle}</td>
                                <td style={{ width: "15%" }}>{item.type}</td>
                                <td style={{ width: "13%" }}>{item.date}</td>
                                <td style={{ width: "25%" }}>{item.description}</td>
                                <td style={{ width: "20%" }}>
                                    {item.thumbnail && (
                                        <img
                                            src={item.thumbnail}
                                            alt=""
                                            className='img-fluid object-fit-cover'
                                            style={{ width: '60px', height: '60px' }}
                                        />
                                    )}
                                </td>
                                <td style={{ width: "7%" }}>
                                    <button type='button' className='btn btn-sm btn-warning w-100 fw-bold' onClick={() => handleEdit(index)}>Edit</button>
                                    <button type='button' className='btn btn-sm btn-danger w-100 fw-bold mt-2' onClick={() => handleDelete(index)}>Delete</button>
                                    <button
                                        type='button'
                                        className='btn btn-sm btn-success w-100 fw-bold mt-2'
                                        onClick={() => navigate('/season', { state: { seriestittle: item.seriestittle } })}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AddSeries