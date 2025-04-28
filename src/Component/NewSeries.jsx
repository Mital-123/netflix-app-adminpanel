import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonCom from "./Main/ButtonCom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { Table } from "react-bootstrap";

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

  const handleViewClick = (seriesId) => {
    navigate(`/season/${seriesId}`);
  };

  return (
    <div className="">
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

        {/* <div className="my-4">
          <div className="table-responsive">
            <Table size="sm" className="text-center align-middle">
              <thead className="table-dark">
                <tr className="" style={{ fontSize: "14px" }}>
                  <th className="p-3">Series Name</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Genres</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Video</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((item, index) => (
                  <tr key={index} style={{ fontSize: "12px" }}>
                    <td className="p-2" style={{ width: "15%" }}>{item.title}</td>
                    <td className="p-2" style={{ width: "10%" }}>{item.releaseDate.slice(0, 10)}</td>
                    <td className="p-2" style={{ width: "10%" }}>{item.genres}</td>
                    <td className="p-2" style={{ width: "40%" }}>{item.description}</td>
                    <td className="p-2" style={{ width: "10%" }}>
                      <img
                        src={item.thumbnailImage}
                        alt="thumbnail"
                        className="img-fluid rounded"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td className="p-2" style={{ width: "10%" }}>
                      <video
                        controls
                        className="rounded"
                        style={{ width: "60px", height: "50px" }}
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    </td>
                    <td className="p-2" style={{ width: "10%" }}>
                      <div className="d-flex justify-content-center gap-2">
                        <MdEditSquare className="text-warning fs-5 cursor-pointer" title="Edit" />
                        <RiDeleteBin5Fill className="text-danger fs-5 cursor-pointer" title="Delete" />
                        <FaEye
                          className="text-success fs-5 cursor-pointer"
                          title="View"
                          onClick={() => handleViewClick(item._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div> */}

        <div className="my-4">
          {users.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between text-center border rounded p-3 mb-3 flex-wrap shadow"
              style={{ background: "#f8f9fa", fontSize: "14px", rowGap: "10px" }}
            >
              <div style={{ width: "14%" }}>
                <div><strong>Series Name</strong></div>
                <div className="mt-2 px-2" style={{ fontSize: "11px" }}>{item.title}</div>
              </div>
              <div style={{ width: "12%" }}>
                <div><strong>Date</strong></div>
                <div className="mt-2 px-2" style={{ fontSize: "11px" }}>{item.releaseDate.slice(0, 10)}</div>
              </div>
              <div style={{ width: "12%" }}>
                <div><strong>Genres</strong></div>
                <div className="mt-2 px-2" style={{ fontSize: "11px" }}>{item.genres}</div>
              </div>
              <div style={{ width: "27%" }}>
                <div><strong>Description</strong></div>
                <div className="mt-2 px-2" style={{ fontSize: "11px" }}>{item.description}</div>
              </div>
              <div style={{ width: "12%" }}>
                <div><strong>Image</strong></div>
                <img
                  src={item.thumbnailImage}
                  alt="thumbnail"
                  className="img-fluid rounded mt-2 px-2"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
              <div style={{ width: "10%" }}>
                <div><strong>Video</strong></div>
                <video
                  controls
                  className="rounded mt-2"
                  style={{ width: "60px", height: "60px" }}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>
              <div style={{ width: "13%" }}>
                <div><strong>Action</strong></div>
                <div className="d-flex justify-content-center gap-2 mt-2 px-2">
                  <MdEditSquare className="text-warning fs-5 cursor-pointer" title="Edit" />
                  <RiDeleteBin5Fill className="text-danger fs-5 cursor-pointer" title="Delete" />
                  <FaEye
                    className="text-success fs-5 cursor-pointer"
                    title="View"
                    onClick={() => handleViewClick(item._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div >
  );
}

export default NewSeries;