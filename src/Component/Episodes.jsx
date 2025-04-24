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
    const [SeasonArray, setSeasonArray] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const location = useLocation();
    const { seriestittle } = location.state || {};

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setObj((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setObj((prev) => ({ ...prev, [name]: value }));
        }
    };

    const AddSeasonSaveData = async () => {
        const formData = new FormData();
        for (let key in obj) {
            formData.append(key, obj[key]);
        }
        // formData.append("series", seriesid);
        formData.append("season", seasonid);

        try {
            const res = await axios.post("https://netflixbackend-dcnc.onrender.com/addepisode", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(res.data);
            setObj({ title: '', description: '', thumbnail: '', video: '', date: '', episodecount: '' });
            setShowModal(false);
            fetchSeasonData();
        } catch (error) {
            console.error("Error saving episode:", error);
        }
    };

    const fetchSeasonData = async () => {
        try {
            const res = await axios.get("https://netflixbackend-dcnc.onrender.com/addepisode/");
            const filteredSeasons = res.data.data.filter((s) => s.season === seasonid);
            setSeasonArray(filteredSeasons);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteSeason = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://netflixbackend-dcnc.onrender.com/addepisode/${id}`);
                    Swal.fire("Deleted!", "The season has been deleted.", "success");
                    fetchSeasonData(); // Refresh the data after deletion
                } catch (error) {
                    console.error("Error deleting season:", error);
                    Swal.fire("Error!", "There was an issue deleting the season.", "error");
                }
            }
        });
    };


    useEffect(() => {
        fetchSeasonData();
    }, []);

    return (
        <div className='p-4'>
            <div className='d-flex justify-content-center'>
                <h3 className='fw-bold'>Episode List</h3>
                <div className='ms-auto'>
                    <ButtonCom btn="Add Episode" onClick={openModal} />
                </div>
            </div>

            <div className='text-center'>
                <h4 className='fw-bold my-3'>{seriestittle || 'Episode Title'}</h4>
            </div>

            {showModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">Add Episode</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <form className='px-2'>
                                    <input type="text" name="title" placeholder="Title" className='form-control my-2' onChange={handleInputChange} />
                                    <textarea name="description" placeholder="Description" className='form-control my-2' onChange={handleInputChange}></textarea>
                                    <input type="file" name="thumbnail" accept="image/*" className='form-control my-2' onChange={handleInputChange} />
                                    <input type="file" name="video" accept="video/*" className='form-control my-2' onChange={handleInputChange} />
                                    <input type="date" name="date" className='form-control my-2' onChange={handleInputChange} />
                                    <input type="number" name="episodecount" placeholder="Episode Count" className='form-control my-2' onChange={handleInputChange} />
                                    <div className='text-center mt-3'>
                                        <ButtonCom btn="Save" onClick={AddSeasonSaveData} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div className='table-responsive mt-4'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Thumbnail</th>
                            <th>Video</th>
                            <th>Date</th>
                            <th>Episode Count</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SeasonArray.map((item, index) => (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>
                                    <img
                                        src={`https://netflixbackend-dcnc.onrender.com/uploads/${item.thumbnail.replace(/\\/g, "/").split("uploads/")[1]}`}
                                        alt="thumbnail"
                                        height="50"
                                    />
                                </td>
                                <td>
                                    <video height="50" controls>
                                        {/* <source
                                            src={`https://netflixbackend-dcnc.onrender.com/${item.video.replace(/\\/g, "/").split("uploads/")[1]}`}
                                            type="video/mp4"
                                        /> */}
                                        Your browser does not support the video tag.
                                    </video>
                                </td>
                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                <td>{item.episodecount}</td>
                                <td className='text-danger fs-5'>
                                    <span onClick={() => deleteSeason(item._id)} style={{ cursor: 'pointer' }}>
                                        <RiDeleteBin5Fill />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Episodes;
