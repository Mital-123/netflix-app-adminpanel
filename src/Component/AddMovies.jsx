import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonCom from './Main/ButtonCom';
import Swal from 'sweetalert2';
import { RiDeleteBin5Fill } from 'react-icons/ri';

const AddMovies = () => {

    const [movies, setMovies] = useState([]);

    const [thumbnail, setThumbnail] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [types, setTypes] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [progress, setProgress] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);

    const [loading, setLoading] = useState(true);

    const chunkSize = 5 * 1024 * 1024;

    useEffect(() => {
        setLoading(true);
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const res = await axios.get('https://netflixbackend-dcnc.onrender.com/addmovie');
            console.log("Movie response:", res.data);

            let fetchedMovies = [];

            if (res.data && Array.isArray(res.data.movies)) {
                fetchedMovies = res.data.movies;
            } else if (Array.isArray(res.data)) {
                fetchedMovies = res.data;
            } else if (res.data && Array.isArray(res.data.data)) {
                fetchedMovies = res.data.data;
            }

            setMovies(fetchedMovies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
        setLoading(false);
    };

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleVideoChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const uploadChunk = async (chunkBlob, chunkIndex, totalChunks, isFirstChunk) => {
        const formData = new FormData();
        formData.append('chunk', chunkBlob);
        formData.append('chunkIndex', chunkIndex);
        formData.append('totalChunks', totalChunks);
        formData.append('filename', videoFile.name);

        // Movie details
        formData.append('title', title);
        formData.append('description', description);
        formData.append('types', JSON.stringify(types.split(',').map(t => t.trim())));
        formData.append('releaseDate', releaseDate);

        if (isFirstChunk && thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        await axios.post('https://netflixbackend-dcnc.onrender.com/upload-chunk', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (e) => {
                const percent = Math.round((e.loaded / e.total) * 100);
                setProgress(percent);
            }
        });
    };

    const startUpload = async () => {

        if (!videoFile) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '❗Please select a video file first.',
            });
            return;
        }

        if (!title.trim() || !description.trim() || !types.trim() || !releaseDate.trim() || !thumbnail) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: '❗Please fill all fields before submitting.',
            });
            return;
        }

        const totalChunks = Math.ceil(videoFile.size / chunkSize);

        Swal.fire({
            title: 'Uploading...',
            html: '<b>Uploading: 0%</b>',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            for (let i = 0; i < totalChunks; i++) {
                const start = i * chunkSize;
                const end = Math.min(start + chunkSize, videoFile.size);
                const chunk = videoFile.slice(start, end);

                await uploadChunk(chunk, i, totalChunks, i === 0);

                const percent = Math.round(((i + 1) / totalChunks) * 100);

                const b = Swal.getHtmlContainer().querySelector('b');
                if (b) {
                    b.textContent = `Uploading: ${percent}%`;
                }
            }

            Swal.fire({
                icon: 'success',
                title: 'Upload Successfull',
                text: '✅ Movie added successfully!',
                timer: 2000,
                showConfirmButton: true
            });

            setProgress(100);

            setThumbnail(null);
            setVideoFile(null);
            setTitle('');
            setDescription('');
            setTypes('');
            setReleaseDate('');

            setShowModal(false);
            fetchMovies();

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: '❌ Something went wrong during upload.',
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

    const handleThumbnailClick = (index) => {
        setActiveVideoIndex(index);
    };

    return (
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
                                    <div className="p-2">
                                        <div className='d-flex justify-content-center gap-3'>
                                            <div className='w-50'>
                                                <label htmlFor="" className="fw-medium">Movie Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Title"
                                                    value={title}
                                                    onChange={e => setTitle(e.target.value)}
                                                    className='form-control mt-1 border border-secondary w-100'
                                                />
                                            </div>
                                            <div className='w-50'>
                                                <label htmlFor="" className="fw-medium">Date</label>
                                                <input
                                                    type="date"
                                                    value={releaseDate}
                                                    onChange={e => setReleaseDate(e.target.value)}
                                                    className='form-control mt-1 border border-secondary w-100'
                                                />
                                            </div>
                                        </div>
                                        <div className='w-100 mt-2'>
                                            <label htmlFor="" className="fw-medium">Types</label>
                                            <input
                                                type="text"
                                                placeholder="Types (comma separated):"
                                                value={types}
                                                onChange={e => setTypes(e.target.value)}
                                                className='form-control mt-1 border border-secondary w-100'
                                            />
                                        </div>
                                        <div className='w-100 mt-2'>
                                            <label htmlFor="" className="fw-medium">Description</label>
                                            <textarea
                                                placeholder="Description"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                className='form-control mt-1 border border-secondary w-100'
                                            />
                                        </div>
                                        <div className='d-lg-flex d-md-flex justify-content-center gap-3'>
                                            <div className='w-100 w-md-50 w-lg-50 mt-2'>
                                                <label htmlFor="" className="fw-medium">Image</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleThumbnailChange}
                                                    className='form-control mt-1 border border-secondary w-100'
                                                />
                                            </div>
                                            <div className='w-100 w-md-50 w-lg-50 mt-2'>
                                                <label htmlFor="" className="fw-medium">Video</label>
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={handleVideoChange}
                                                    className='form-control mt-1 border border-secondary w-100'
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 text-center">
                                            <button onClick={startUpload} className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="row my-4 px-2">
                {movies.length > 0 ? (
                    movies.map((movie, index) => {
                        return (
                            <div key={index} className='col-12 mx-auto mb-4 main_MovieCard rounded-4'>
                                <div className='h-100'>
                                    <div className='d-lg-flex justify-content-center gap-3 px-2 py-4 px-lg-3'>
                                        <div className='image_Movie' style={{ width: "100%", height: "170px", overflow: "hidden", borderRadius: "8px", position: "relative" }}>
                                            {activeVideoIndex === index ? (
                                                <video
                                                    src={`https://netflixbackend-dcnc.onrender.com/uploads/movie/${movie.videoUrl.replace(/\\/g, "/").split("uploads/")[1]}`}
                                                    controls
                                                    autoPlay
                                                    onPause={() => setActiveVideoIndex(null)}
                                                    onEnded={() => setActiveVideoIndex(null)}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            ) : (
                                                <img
                                                    src={"https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg?ga=GA1.1.960358020.1744003470&semt=ais_hybrid&w=740"}
                                                    // src={`https://netflixbackend-dcnc.onrender.com/uploads/images/${movie.thumbnailUrl.replace(/\\/g, "/").split("uploads/")[1]}`}
                                                    alt="thumbnail"
                                                    onClick={() => handleThumbnailClick(index)}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        cursor: "pointer"
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className='content_movie pt-3 pt-lg-0'>
                                            <div className='d-flex'>
                                                <div className="fs-4 text-info fw-bold">
                                                    {movie.title}
                                                </div>
                                                <div className='movie-delete-icon ms-auto' style={{ cursor: "pointer" }}>
                                                    <RiDeleteBin5Fill className='text-danger fs-5 fw-bold' />
                                                </div>
                                            </div>
                                            <div className="mt-2" style={{ fontSize: "15px" }}>
                                                <div className='fw-medium'>Release Date : <span className='text-secondary'>{new Date(movie.releaseDate).toLocaleDateString()}</span></div>
                                            </div>
                                            <div className='mt-2' style={{ fontSize: "15px" }}>
                                                <div className='fw-medium'>Types : <span className='text-secondary'>{movie.types}</span></div>
                                            </div>
                                            <div className='text-secondary mt-2' style={{ wordBreak: "break-all", fontSize: "14px" }}>
                                                {movie.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center fw-medium shadow bg-white rounded p-3" style={{ fontSize: "14px" }}>No Movies Available.</p>
                )}
            </div>
        </div>
    );
};

export default AddMovies;