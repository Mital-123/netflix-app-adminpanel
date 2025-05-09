import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ButtonCom from './Main/ButtonCom';
import { RiDeleteBin5Fill } from 'react-icons/ri';

function Episodes() {

    const seasonid = useParams().id;

    console.log(seasonid);

    const [obj, setObj] = useState({
        title: '',
        description: '',
        thumbnail: '',
        video: '',
        date: '',
        episodecount: ''
    });
    const [EpisodeArray, setEpisodeArray] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const { title } = location.state || {};

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        setLoading(true);
        fetchEpisodeData();
    }, []);

    const fetchEpisodeData = async () => {
        try {
            const res = await axios.get("https://netflixbackend-dcnc.onrender.com/addepisode/");
            const filteredSeasons = res.data.data.filter((s) => s.season === seasonid);
            setEpisodeArray(filteredSeasons);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setObj((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setObj((prev) => ({ ...prev, [name]: value }));
        }
    };

    const AddEpisodeSaveData = async (e) => {
        e.preventDefault();

        if (!obj.title || !obj.description || !obj.thumbnail || !obj.video || !obj.date || !obj.episodecount) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: '❗Please fill all fields before submitting.',
                allowOutsideClick: false,
            });
            return;
        }

        Swal.fire({
            title: 'Uploading...',
            html: '<b>Uploading: 0%</b>',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const formData = new FormData();

        for (let key in obj) {
            formData.append(key, obj[key]);
        }

        formData.append("season", seasonid);

        try {
            const res = await axios.post("https://netflixbackend-dcnc.onrender.com/addepisode", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    Swal.getHtmlContainer().innerHTML = `<b>Uploading: ${percent}%</b>`;
                },
            });

            console.log("Upload success:", res.data);

            Swal.fire({
                icon: 'success',
                title: 'Upload Successfull',
                text: '✅ Episode added successfully!',
                timer: 2000,
                showConfirmButton: false,
            });

            setShowModal(false);
            fetchEpisodeData();

        } catch (error) {
            console.error("Error saving episode:", error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: '❌ Something went wrong. Please try again.',
            });
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <img src="https://media.tenor.com/1s1_eaP6BvgAAAAC/rainbow-spinner-loading.gif" alt="" className='img-fluid bg-white' width={150} />
            </div>
        );
    }

    const deleteSeason = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://netflixbackend-dcnc.onrender.com/addepisode/${id}`);
                    Swal.fire("Deleted!", "✅ The Episode has been deleted.", "success");
                    fetchEpisodeData();
                } catch (error) {
                    console.error("Error deleting season:", error);
                    Swal.fire("Error!", "❌ There was an issue deleting the Episode.", "error");
                }
            }
        });
    };

    return (
        <div className='container p-4'>
            <div className='d-flex justify-content-center'>
                <div className='d-none d-md-block d-lg-block'>
                    <h3 className='fw-bold'>Episode List</h3>
                </div>
                <div className='ms-lg-auto ms-md-auto ms-sm-0 d-flex justify-content-sm-center'>
                    <ButtonCom btn="Add New Episode" onClick={openModal} />
                </div>
            </div>

            <div className='text-center'>
                <h4 className='fw-bold text-info my-3'>{title || 'Season Title'}</h4>
            </div>

            {showModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">Add New Episode</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <form className='p-2'>
                                    <div className=''>
                                        <label htmlFor="" className='fw-medium'>Episode Tittle</label>
                                        <input type="text" name="title" className='form-control w-100 mt-1 border border-secondary' onChange={handleInputChange} />
                                    </div>
                                    <div className='d-flex justify-content-center gap-3'>
                                        <div className='w-50 mt-2'>
                                            <label htmlFor="" className='fw-medium'>Date</label>
                                            <input type="date" name="date" className='form-control w-100 mt-1 border border-secondary' onChange={handleInputChange} />
                                        </div>
                                        <div className='w-50 mt-2'>
                                            <label htmlFor="" className='fw-medium'>Episode Number</label>
                                            <input type="number" name="episodecount" className='form-control w-100 mt-1 border border-secondary' onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <label htmlFor="" className='fw-medium'>Description</label>
                                        <textarea name="description" className='form-control w-100 mt-1 border border-secondary' onChange={handleInputChange}></textarea>
                                    </div>
                                    <div className='d-flex justify-content-center gap-3'>
                                        <div className='w-50 mt-2'>
                                            <label htmlFor="" className='fw-medium'>Image</label>
                                            <input type="file" name="thumbnail" accept="image/*" className='form-control w-100 mt-1 border border-secondary' onChange={handleInputChange} />
                                        </div>
                                        <div className='w-50 mt-2'>
                                            <label htmlFor="" className='fw-medium'>Video</label>
                                            <input type="file" name="video" accept="video/*" className='form-control w-100 mt-1 border border-secondary' onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <button type='button' className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2" onClick={AddEpisodeSaveData}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='my-4 mx-2'>
                {EpisodeArray.length === 0 ? (
                    <div className="text-center fw-medium shadow bg-white rounded p-3" style={{ fontSize: "14px" }}>No Episode Available.</div>
                ) : (
                    EpisodeArray.map((item, index) => {


                        return (
                            <div className="main_hover border border-3 border-white row p-3 mb-4 bg-white rounded overflow-hidden" key={index}>
                                <div className='d-flex'>
                                    <div className="col-11 text-info fw-bold fs-5 mb-3 overflow-hidden">{item.title}</div>
                                    <div className="delete_episode-icon ms-auto">
                                        <RiDeleteBin5Fill className="text-danger fs-5" style={{ cursor: "pointer" }} title="Delete" onClick={() => deleteSeason(item._id)} />
                                    </div>
                                </div>
                                <div className="col-12 overflow-hidden">
                                    <div className="d-flex justify-content-between flex-wrap flex-lg-nowrap gap-4">
                                        <div>
                                            <div className='fw-medium'>Image</div>
                                            <img
                                                src={item.thumbnail}
                                                alt="thumbnail"
                                                className='mt-2 object-fit-cover'
                                                width={"70px"}
                                                height={"70px"}
                                            />
                                        </div>
                                        <div>
                                            <div className='fw-medium'>Video</div>
                                            <video width={"70px"}
                                                poster={item.thumbnail}
                                                height={"70px"} controls className='mt-2'>
                                                <source
                                                    src={item.video}
                                                    type="video/mp4"
                                                />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <div>
                                            <div className='fw-medium'>Epi.No.</div>
                                            <div className='text-secondary mt-2' style={{ fontSize: "14px" }}>{item.episodecount}</div>
                                        </div>
                                        <div>
                                            <div className='fw-medium'>Date</div>
                                            <div className='text-secondary mt-2' style={{ fontSize: "14px" }}>{new Date(item.date).toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            <div className='fw-medium'>Description</div>
                                            <div className='text-secondary mt-2' style={{ fontSize: "14px", wordBreak: "break-all" }}>{item.description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

        </div>
    );
}

export default Episodes