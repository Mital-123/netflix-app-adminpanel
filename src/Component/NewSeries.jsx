import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonCom from "./Main/ButtonCom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

function NewSeries() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genres: "",
    releaseDate: "",
    thumbnail: null,
    video: null,
  });

  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://netflixbackend-dcnc.onrender.com/addseries");
      setUsers(res.data.data);
      console.log(res.data.data);

    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.genres.trim() ||
      !formData.releaseDate ||
      !formData.thumbnail ||
      !formData.video
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: '❗Please fill all fields before submitting.',
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

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("genres", formData.genres);
    data.append("releaseDate", formData.releaseDate);
    data.append("thumbnail", formData.thumbnail);
    data.append("video", formData.video);

    try {
      const response = await axios.post(
        "https://netflixbackend-dcnc.onrender.com/addseries",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            Swal.getHtmlContainer().innerHTML = `<b>Uploading: ${percent}%</b>`;
          },
        }
      );

      console.log("Upload success:", response.data);


      Swal.fire({
        icon: 'success',
        title: 'Upload Successful',
        text: '✅ Series added successfully!',
        timer: 8000,
        showConfirmButton: false,
      });

      setShowModal(false);

    } catch (error) {
      console.error("Upload failed", error);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: '❌ Something went wrong. Please try again.',
      });
    }
  };

  const handleThumbnailClick = (index) => {
    setActiveVideoIndex(index);
  };

  const handleViewClick = (seriesId) => {
    navigate(`/season/${seriesId}`);
  };

  return (
    <div className="series_bg">
      <div className="container p-4">

        <div className='d-flex justify-content-center'>
          <div className="d-none d-md-block d-lg-block"><h3 className='fw-bold text-center'>Series List</h3></div>
          <div className='ms-auto'>
            <ButtonCom btn="Add New Series" onClick={() => setShowModal(true)} />
          </div>
        </div>

        {showModal && (
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Add New Series</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-2">
                    <div className="d-flex justify-content-center gap-3">
                      <div className="w-50">
                        <label className="fw-medium">Series Name</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control mt-1 border border-secondary w-100"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-50">
                        <label className="fw-medium">Release Date</label>
                        <input
                          type="date"
                          name="releaseDate"
                          className="form-control mt-1 border border-secondary w-100"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-100 mt-2">
                      <label className="fw-medium">Genres (comma separated):</label>
                      <input
                        type="text"
                        name="genres"
                        className="form-control mt-1 border border-secondary"
                        placeholder="e.g. Action, Drama"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="w-100 mt-2">
                      <label className="fw-medium">Description</label>
                      <textarea
                        name="description"
                        rows="3"
                        className="form-control mt-1 border border-secondary"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="w-100 mt-2">
                      <label className="fw-medium">Thumbnail Image</label>
                      <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        className="form-control mt-1 border border-secondary"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="w-100 mt-2">
                      <label className="fw-medium">Video</label>
                      <input
                        type="file"
                        name="video"
                        accept="video/*"
                        className="form-control mt-1 border border-secondary"
                        onChange={handleChange}
                      />
                    </div>

                    {status && (
                      <p className="text-center text-primary fw-medium mt-3">
                        {status}
                      </p>
                    )}

                    <div className="mt-3 text-center">
                      <button type='submit' className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row p-0 p-lg-2 my-3">
          {users.map((item, index) => (
            <div key={index} className='col-12 col-lg-4 col-md-6 mb-2 p-2'>
              <div className="main_card h-100 d-flex flex-column bg-white border border-2 border-secondary" style={{ borderRadius: "10px" }}>
                <div style={{ width: "100%", height: "170px", overflow: "hidden", borderRadius: "8px 8px 0px 0px", position: "relative" }}>
                  {activeVideoIndex === index ? (
                    <video
                      src={`https://netflixbackend-dcnc.onrender.com/uploads/${item.video}`}
                      controls
                      autoPlay
                      onPause={() => setActiveVideoIndex(null)}
                      onEnded={() => setActiveVideoIndex(null)}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <img
                      // src={`https://netflixbackend-dcnc.onrender.com/uploads/${item.thumbnail}`}
                      src={"https://img.freepik.com/free-photo/restaurant-interior_1127-3392.jpg?ga=GA1.1.960358020.1744003470&semt=ais_hybrid&w=740"}
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

                <div className='p-3'>
                  <div className="d-flex align-items-center w-100">
                    <div className="fw-medium">Date: {new Date(item.releaseDate).toISOString().slice(0, 10)}</div>
                    <div className="ms-auto">
                      <span className="series_icon text-white border border-dark bg-dark p-2 rounded-2"><MdEdit className="fs-6 fw-bold" /></span>
                      <span className="series_icon text-white border border-dark ms-1 bg-dark p-2 rounded-2"><RiDeleteBin6Line className="fs-6 fw-bold" /></span>
                      <span className="series_icon text-white border border-dark ms-1 bg-dark p-2 rounded-2"><FaEye className="fs-6 fw-bold" onClick={() => handleViewClick(item._id)} /></span>
                    </div>
                  </div>
                  <h4 className='fw-bold mt-3'>{item.title}</h4>
                  <div className='fw-medium fs-6 my-2'>{item.genres}</div>
                  <p className='mb-2 text-secondary' style={{ wordBreak: "break-word", fontSize: "13px" }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default NewSeries;