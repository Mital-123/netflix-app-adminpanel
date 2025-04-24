import React, { useState, useEffect } from 'react';
import ButtonCom from './Main/ButtonCom';
import axios from 'axios';

function Series() {
    const [showModal, setShowModal] = useState(false);
    const [obj, setObj] = useState({});
    const [error, setError] = useState({});
    const [profilePreview, setProfilePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://netflixbackend-dcnc.onrender.com/addseries");
            setUsers(res.data);
            console.log(res.data);

        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setObj({});
        setError({});
        setProfilePreview(null);
        setVideoPreview(null);
    };

    const addSeriesData = (e) => {
        const { name, value, files } = e.target;
        const updatedObj = { ...obj };
        const updatedError = { ...error };

        if (name === "thumbnail" || name === "video") {
            const file = files[0];
            if (file) {
                updatedObj[name] = file; // Store file itself

                const fileURL = URL.createObjectURL(file);
                if (name === "thumbnail") setProfilePreview(fileURL);
                else if (name === "video") setVideoPreview(fileURL);

                updatedError[name] = "";
            } else {
                updatedError[name] = `${name} is required!`;
            }
        } else {
            updatedObj[name] = value;
            updatedError[name] = "";
        }

        setObj(updatedObj);
        setError(updatedError);
    };


    const AddSeriesSaveData = async () => {
        if (!obj.title || !obj.genres || !obj.releaseDate || !obj.description || !obj.thumbnail || !obj.video) {
            setError({
                title: !obj.title ? "Title is required!" : "",
                genres: !obj.genres ? "Genres are required!" : "",
                releaseDate: !obj.releaseDate ? "Release Date is required!" : "",
                description: !obj.description ? "Description is required!" : "",
                thumbnail: !obj.thumbnail ? "Thumbnail is required!" : "",
                video: !obj.video ? "Video is required!" : "",
            });
            return;
        }

        // 👉 Create FormData and append fields
        const formData = new FormData();
        formData.append("title", obj.title);
        formData.append("genres", obj.genres);
        formData.append("releaseDate", obj.releaseDate);
        formData.append("description", obj.description);
        formData.append("thumbnail", obj.thumbnail); // actual File
        formData.append("video", obj.video); // actual File

        // try {
        //     const response = await axios.post(
        //         "https://netflixbackend-dcnc.onrender.com/addseries",
        //         formData,
        //         {
        //             headers: {
        //                 "Content-Type": "multipart/form-data"
        //               }                  
        //         }
        //     );

        //     console.log("Series added:", response.data);
        //     fetchUsers();
        //     setObj({});
        //     setProfilePreview(null);
        //     setVideoPreview(null);
        //     setError({});
        //     setShowModal(false);

        // } catch (err) {
        //     console.error("Error saving series:", err);
        // }

        try {
            const response = await fetch("https://netflixbackend-dcnc.onrender.com/addseries", {
                method: "POST",
                body: { formData }
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                alert("Series created successfully!");
                console.log(result);
            } else {
                alert("Error: " + result.error);
            }
        } catch (err) {
            console.error("Error submitting form", err);
            alert("An error occurred while submitting the form.");
        }
    };


    const handleThumbnailClick = (index) => {
        setActiveVideoIndex(index === activeVideoIndex ? null : index);
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
                                        <input
                                            type="text"
                                            name="title"
                                            className='form-control mt-1 border border-secondary'
                                            onChange={addSeriesData}
                                            value={obj?.title || ''}
                                        />
                                        {error.title && <div className="text-danger fw-medium">{error.title}</div>}
                                    </div>
                                    <div className='d-flex justify-content-center gap-3'>
                                        <div className='w-50 mt-2'>
                                            <label className='fw-medium'>Genres</label>
                                            <input
                                                type="text"
                                                name="genres"
                                                placeholder="e.g. Action, Drama"
                                                className='form-control mt-1 border border-secondary'
                                                onChange={addSeriesData}
                                                value={obj?.genres || ''}
                                            />
                                            {error.genres && <div className="text-danger fw-medium">{error.genres}</div>}
                                        </div>
                                        <div className='w-50 mt-2'>
                                            <label className='fw-medium'>Release Date</label>
                                            <input
                                                type="date"
                                                name="releaseDate"
                                                className='form-control mt-1 border border-secondary'
                                                onChange={addSeriesData}
                                                value={obj?.releaseDate || ''}
                                            />
                                            {error.releaseDate && <div className="text-danger fw-medium">{error.releaseDate}</div>}
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center gap-3'>
                                        <div className='w-50 mt-2'>
                                            <label className='fw-medium'>Thumbnail Image</label>
                                            <input
                                                type="file"
                                                name="thumbnail"
                                                className='form-control mt-1 border border-secondary'
                                                onChange={addSeriesData}
                                            />
                                            {profilePreview && (
                                                <img src={profilePreview} alt="Thumbnail Preview" className='img-fluid mt-2' />
                                            )}
                                            {error.thumbnail && <div className="text-danger fw-medium">{error.thumbnail}</div>}
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
                                            {videoPreview && (
                                                <video
                                                    controls
                                                    width="100%"
                                                    className="mt-2"
                                                    src={videoPreview}
                                                ></video>
                                            )}
                                            {error.video && <div className="text-danger fw-medium">{error.video}</div>}
                                        </div>
                                    </div>
                                    <div className='w-100 mt-2'>
                                        <label className='fw-medium'>Description</label>
                                        <textarea
                                            name="description"
                                            className='form-control mt-1 border border-secondary'
                                            onChange={addSeriesData}
                                            value={obj?.description || ''}
                                        ></textarea>
                                        {error.description && <div className="text-danger fw-medium">{error.description}</div>}
                                    </div>
                                    <div className='text-center mt-3'>
                                        <ButtonCom btn="Save" onClick={AddSeriesSaveData} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Series;