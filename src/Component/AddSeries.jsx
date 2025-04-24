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
        if (!obj.title || !obj.description || !obj.releaseDate || !obj.genres || !obj.thumbnail || !obj.video) {
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
            console.log(updatedArray);
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

    const [playingIndex, setPlayingIndex] = useState(null);

    const handlePlay = (index) => {
        setPlayingIndex(index);
    };

    return (
        <div className='p-4'>
            <div className='d-flex justify-content-center'>
                <div><h3 className='fw-bold'>Series List</h3></div>
                <div className='ms-auto'>
                    <ButtonCom btn="Add New Series" onClick={openModal} />
                </div>
            </div>

            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">Add New Series</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <form className='px-2'>
                                    <div className='w-100 mt-2'>
                                        <label className='fw-medium'>Series Name</label>
                                        <input type="text" name="title" className='form-control mt-1 border border-secondary' onChange={addSeriesData} value={obj?.title || ''} />
                                    </div>
                                    <div className='d-flex justify-content-center gap-3'>
                                        <div className='w-50 mt-2'>
                                            <label className='fw-medium'>Genres</label>
                                            <input type="text" name="genres" placeholder="e.g. Action, Drama" className='form-control mt-1 border border-secondary' onChange={addSeriesData} value={obj?.genres || ''} />
                                        </div>
                                        <div className='w-50 mt-2'>
                                            <label className='fw-medium'>Release Date</label>
                                            <input type="date" name="releaseDate" className='form-control mt-1 border border-secondary' onChange={addSeriesData} value={obj?.releaseDate || ''} />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center gap-3'>
                                        <div className='w-50 mt-2'>
                                            <label className='fw-medium'>Thumbnail Image</label>
                                            <input type="file" name="thumbnail" className='form-control mt-1 border border-secondary' ref={fileInputRef} onChange={addSeriesData} />
                                        </div>
                                        <div className='w-50 mt-2'>
                                            <label className='fw-medium'>Video</label>
                                            <input
                                                type="file"
                                                name="video"
                                                accept="video/*"
                                                className='form-control mt-1 border border-secondary'
                                                onChange={addSeriesData}
                                            />
                                        </div>
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

            <div className='row p-4'>
                {array.map((item, index) => (
                    <div key={index} className='col-12 col-lg-4 mb-4 p-2'>
                        <div className="h-100 d-flex flex-column shadow border border-dark border-2" style={{ borderRadius: "10px" }}>
                            <div style={{ width: "100%", height: "200px", overflow: "hidden", position: "relative" }}>
                                {playingIndex === index ? (
                                    <video
                                        src={item.video}
                                        controls
                                        autoPlay
                                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px 8px 0px 0px" }}
                                    />
                                ) : (
                                    <img
                                        src={item.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
                                        alt={item.title}
                                        onClick={() => handlePlay(index)}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "8px 8px 0px 0px",
                                            cursor: "pointer"
                                        }}
                                    />
                                )}
                            </div>
                            <div className='p-3'>
                                <div className="d-flex align-items-center w-100">
                                    <div className="fw-medium">Date: {item.releaseDate}</div>
                                    <div className='ms-auto'>
                                        <ButtonCom btn="View" />
                                    </div>
                                </div>
                                <div><h4 className='fw-bold mt-2'>{item.title}</h4></div>
                                <div className='fw-medium fs-5 my-2'>{item.genres}</div>
                                <p className='mb-2' style={{ wordBreak: "break-all", fontSize: "14px" }}>{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddSeries