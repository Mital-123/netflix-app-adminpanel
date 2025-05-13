// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ButtonCom from "./Main/ButtonCom";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa";
// import { RiDeleteBin5Fill } from "react-icons/ri";

// function NewSeries() {

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     genres: "",
//     releaseDate: "",
//     thumbnail: null,
//     video: null,
//   });

//   const [status, setStatus] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("https://netflixbackend-dcnc.onrender.com/addseries");
//       setUsers(res.data.data);
//       console.log(res.data.data);

//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (
//   //     !formData.title.trim() ||
//   //     !formData.description.trim() ||
//   //     !formData.genres.trim() ||
//   //     !formData.releaseDate ||
//   //     !formData.thumbnail ||
//   //     !formData.video
//   //   ) {
//   //     Swal.fire({
//   //       icon: 'warning',
//   //       title: 'Incomplete Form',
//   //       text: '❗Please fill all fields before submitting.',
//   //       allowOutsideClick: false,
//   //     });
//   //     return;
//   //   }

//   //   Swal.fire({
//   //     title: 'Uploading...',
//   //     html: '<b>Uploading: 0%</b>',
//   //     allowOutsideClick: false,
//   //     didOpen: () => {
//   //       Swal.showLoading();
//   //     },
//   //   });

//   //   const data = new FormData();
//   //   data.append("title", formData.title);
//   //   data.append("description", formData.description);
//   //   data.append("genres", formData.genres);
//   //   data.append("releaseDate", formData.releaseDate);
//   //   data.append("thumbnail", formData.thumbnail);
//   //   data.append("video", formData.video);

//   //   try {
//   //     const response = await axios.post(
//   //       "https://netflixbackend-dcnc.onrender.com/addseries",
//   //       data,
//   //       {
//   //         headers: {
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //         onUploadProgress: (progressEvent) => {
//   //           const percent = Math.round(
//   //             (progressEvent.loaded * 100) / progressEvent.total
//   //           );
//   //           Swal.getHtmlContainer().innerHTML = `<b>Uploading: ${percent}%</b>`;
//   //         },
//   //       }
//   //     );

//   //     console.log("Upload success:", response.data);

//   //     Swal.fire({
//   //       icon: 'success',
//   //       title: 'Upload Successfull',
//   //       text: '✅ Series added successfully!',
//   //       timer: 2000,
//   //       showConfirmButton: false,
//   //     });

//   //     setShowModal(false);
//   //     fetchUsers();

//   //   } catch (error) {
//   //     console.error("Upload failed", error);
//   //     Swal.fire({
//   //       icon: 'error',
//   //       title: 'Upload Failed',
//   //       text: '❌ Something went wrong. Please try again.',
//   //     });
//   //   }
//   // };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (
//     !formData.title.trim() ||
//     !formData.description.trim() ||
//     !formData.genres.trim() ||
//     !formData.releaseDate ||
//     !formData.thumbnail ||
//     !formData.video
//   ) {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Incomplete Form',
//       text: '❗Please fill all fields before submitting.',
//       allowOutsideClick: false,
//     });
//     return;
//   }

//   Swal.fire({
//     title: 'Uploading...',
//     html: '<b>Uploading: 0%</b>',
//     allowOutsideClick: false,
//     didOpen: () => {
//       Swal.showLoading();
//     },
//   });

//   const data = new FormData();
//   data.append("title", formData.title);
//   data.append("description", formData.description);
//   data.append("genres", JSON.stringify(formData.genres.split(',').map(g => g.trim()))); // FIXED
//   data.append("releaseDate", formData.releaseDate);
//   data.append("thumbnail", formData.thumbnail);
//   data.append("video", formData.video);

//   try {
//     const response = await axios.post(
//       "https://netflixbackend-dcnc.onrender.com/addseries",
//       data,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           Swal.getHtmlContainer().innerHTML = `<b>Uploading: ${percent}%</b>`;
//         },
//       }
//     );

//     console.log("Upload success:", response.data);

//     Swal.fire({
//       icon: 'success',
//       title: 'Upload Successfull',
//       text: '✅ Series added successfully!',
//       timer: 2000,
//       showConfirmButton: false,
//     });

//     setShowModal(false);
//     fetchUsers();

//   } catch (error) {
//     console.error("Upload failed", error);
//     Swal.fire({
//       icon: 'error',
//       title: 'Upload Failed',
//       text: `❌ ${error.response?.data?.message || "Something went wrong. Please try again."}`,
//     });
//   }
// };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//         <img src="https://media.tenor.com/1s1_eaP6BvgAAAAC/rainbow-spinner-loading.gif" alt="" className='img-fluid bg-white' width={150} />
//       </div>
//     );
//   }

//   const handleViewClick = (seriesId, title) => {
//     navigate(`/season/${seriesId}`, {
//       state: { title },
//     });
//   };

//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       allowOutsideClick: false,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`https://netflixbackend-dcnc.onrender.com/addseries/${id}`);
//           Swal.fire("Deleted!", "✅ Series has been successfully deleted!", "success");
//           setUsers(users.filter(user => user._id !== id));
//         } catch (error) {
//           console.error("Error deleting series:", error);
//           Swal.fire("Error!", "❌ Something went wrong. Please try again.", "error");
//         }
//       }
//     });
//   };

//   return (
//     <div className="">
//       <div className="container p-4">

//         <div className='d-flex justify-content-center'>
//           <div className="d-none d-md-block d-lg-block"><h3 className='fw-bold text-center'>Series List</h3></div>
//           <div className='ms-lg-auto ms-md-auto ms-sm-0 d-flex justify-content-sm-center'>
//             <ButtonCom btn="Add New Series" onClick={() => setShowModal(true)} />
//           </div>
//         </div>

//         {showModal && (
//           <div
//             className="modal d-block"
//             tabIndex="-1"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title fw-bold">Add New Series</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-2">
//                     <div className="d-flex justify-content-center gap-3">
//                       <div className="w-50">
//                         <label className="fw-medium">Series Name</label>
//                         <input
//                           type="text"
//                           name="title"
//                           className="form-control mt-1 border border-secondary w-100"
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div className="w-50">
//                         <label className="fw-medium">Release Date</label>
//                         <input
//                           type="date"
//                           name="releaseDate"
//                           className="form-control mt-1 border border-secondary w-100"
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="w-100 mt-2">
//                       <label className="fw-medium">Genres (comma separated):</label>
//                       <input
//                         type="text"
//                         name="genres"
//                         className="form-control mt-1 border border-secondary"
//                         placeholder="e.g. Action, Drama"
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="w-100 mt-2">
//                       <label className="fw-medium">Description</label>
//                       <textarea
//                         name="description"
//                         rows="3"
//                         className="form-control mt-1 border border-secondary"
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="w-100 mt-2">
//                       <label className="fw-medium">Thumbnail Image</label>
//                       <input
//                         type="file"
//                         name="thumbnail"
//                         accept="image/*"
//                         className="form-control mt-1 border border-secondary"
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="w-100 mt-2">
//                       <label className="fw-medium">Video</label>
//                       <input
//                         type="file"
//                         name="video"
//                         accept="video/*"
//                         className="form-control mt-1 border border-secondary"
//                         onChange={handleChange}
//                       />
//                     </div>

//                     {status && (
//                       <p className="text-center text-primary fw-medium mt-3">
//                         {status}
//                       </p>
//                     )}

//                     <div className="mt-4 text-center">
//                       <button type='submit' className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2">Submit</button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="my-4 px-2">
//           {users.length === 0 ? (
//             <div className="text-center fw-medium shadow bg-white rounded p-3" style={{ fontSize: "14px" }}>No Series Available.</div>
//           ) : (
//             users.map((item, index) => {
//               const thumbnailpath = item.thumbnail;
//               const videopath = item.video
//               const thumbnail = thumbnailpath.split('/').pop();
//               const video = videopath.split('/').pop();
//               return (
//                 <div className="main_hover border border-3 border-white row p-3 mb-4 bg-white rounded overflow-hidden" key={index}>
//                   {console.log(item)}
//                   <div className="col-12 text-info fs-5 fw-bold mb-3 overflow-hidden">{item.title}</div>
//                   <div className="col-12 overflow-hidden">
//                     <div className="d-flex justify-content-between flex-wrap flex-lg-nowrap gap-4">
//                       <div>
//                         <div className='fw-medium'>Image</div>
//                         <img
//                           src={`https://netflixbackend-dcnc.onrender.com/uploads/${thumbnail}`}
//                           alt="thumbnail"
//                           width={"70px"}
//                           height={"70px"}
//                           className="mt-2 object-fit-cover"
//                         />
//                       </div>
//                       <div>
//                         <div className='fw-medium'>Video</div>
//                         <video width={"70px"}
//                           height={"70px"} controls className="mt-2">
//                           <source
//                             src={`https://netflixbackend-dcnc.onrender.com/uploads/${video}`}
//                             type="video/mp4"
//                           />
//                           Your browser does not support the video tag.
//                         </video>
//                       </div>
//                       <div>
//                         <div className='fw-medium'>Genres</div>
//                         <div className="text-secondary mt-2" style={{ fontSize: "14px" }}>{item.genres.join(', ')}</div>
//                       </div>
//                       <div>
//                         <div className='fw-medium'>Date</div>
//                         <div className="text-secondary mt-2" style={{ fontSize: "14px" }}>{new Date(item.releaseDate).toLocaleDateString()}</div>
//                       </div>
//                       <div>
//                         <div className='fw-medium'>Description</div>
//                         <div className="text-secondary mt-2" style={{ fontSize: "14px", wordBreak: "break-all" }}>{item.description}</div>
//                       </div>
//                       <div>
//                         <div className='fw-medium'>Action</div>
//                         <div className="d-flex justify-content-center gap-2 mt-2">
//                           <FaEye
//                             className="text-primary fs-5" style={{ cursor: "pointer" }}
//                             title="View"
//                             onClick={() => handleViewClick(item._id, item.title)}
//                           />
//                           <RiDeleteBin5Fill className="text-danger fs-5" style={{ cursor: "pointer" }} title="Delete" onClick={() => handleDelete(item._id)} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>)
//             }
//             )
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default NewSeries;
// "use client"

import { useEffect, useState } from "react"
import axios from "axios"
import ButtonCom from "./Main/ButtonCom"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa"
import { RiDeleteBin5Fill } from "react-icons/ri"

function NewSeries() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genres: "",
    releaseDate: "",
    thumbnail: null,
    video: null,
  })

  const [status, setStatus] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://netflixbackend-dcnc.onrender.com/addseries")
      setUsers(res.data.data)
      console.log(res.data.data)
    } catch (err) {
      console.error("Error fetching users:", err)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.genres.trim() ||
      !formData.releaseDate ||
      !formData.thumbnail ||
      !formData.video
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "❗Please fill all fields before submitting.",
        allowOutsideClick: false,
      })
      return
    }

    Swal.fire({
      title: "Uploading...",
      html: "<b>Uploading: 0%</b>",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    const data = new FormData()
    data.append("title", formData.title)
    data.append("description", formData.description)
    data.append("genres", formData.genres) // Send as plain string, let backend handle parsing
    data.append("releaseDate", formData.releaseDate)
    data.append("thumbnail", formData.thumbnail)
    data.append("video", formData.video)

    try {
      const response = await axios.post("https://netflixbackend-dcnc.onrender.com/addseries", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          Swal.getHtmlContainer().innerHTML = `<b>Uploading: ${percent}%</b>`
        },
      })

      console.log("Upload success:", response.data)

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "✅ Series added successfully!",
        timer: 2000,
        showConfirmButton: false,
      })

      setShowModal(false)
      fetchUsers()

      // Reset form data
      setFormData({
        title: "",
        description: "",
        genres: "",
        releaseDate: "",
        thumbnail: null,
        video: null,
      })
    } catch (error) {
      console.error("Upload failed", error)
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: `❌ ${error.response?.data?.message || error.response?.data?.error || "Something went wrong. Please try again."}`,
      })
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <img
          src="https://media.tenor.com/1s1_eaP6BvgAAAAC/rainbow-spinner-loading.gif"
          alt=""
          className="img-fluid bg-white"
          width={150}
        />
      </div>
    )
  }

  const handleViewClick = (seriesId, title) => {
    navigate(`/season/${seriesId}`, {
      state: { title },
    })
  }

  const handleDelete = async (id) => {
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
          await axios.delete(`https://netflixbackend-dcnc.onrender.com/addseries/${id}`)
          Swal.fire("Deleted!", "✅ Series has been successfully deleted!", "success")
          setUsers(users.filter((user) => user._id !== id))
        } catch (error) {
          console.error("Error deleting series:", error)
          Swal.fire("Error!", "❌ Something went wrong. Please try again.", "error")
        }
      }
    })
  }

  return (
    <div className="">
      <div className="container p-4">
        <div className="d-flex justify-content-center">
          <div className="d-none d-md-block d-lg-block">
            <h3 className="fw-bold text-center">Series List</h3>
          </div>
          <div className="ms-lg-auto ms-md-auto ms-sm-0 d-flex justify-content-sm-center">
            <ButtonCom btn="Add New Series" onClick={() => setShowModal(true)} />
          </div>
        </div>

        {showModal && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Add New Series</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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

                    {status && <p className="text-center text-primary fw-medium mt-3">{status}</p>}

                    <div className="mt-4 text-center">
                      <button
                        type="submit"
                        className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="my-4 px-2">
          {users.length === 0 ? (
            <div className="text-center fw-medium shadow bg-white rounded p-3" style={{ fontSize: "14px" }}>
              No Series Available.
            </div>
          ) : (
            users.map((item, index) => {
              const thumbnailpath = item.thumbnail
              const videopath = item.video

              // Handle both local file paths and Cloudinary URLs
              const thumbnail = thumbnailpath.includes("cloudinary")
                ? thumbnailpath
                : `https://netflixbackend-dcnc.onrender.com/uploads/${thumbnailpath.split("/").pop()}`

              const video = videopath.includes("cloudinary")
                ? videopath
                : `https://netflixbackend-dcnc.onrender.com/uploads/${videopath.split("/").pop()}`

              return (
                <div
                  className="main_hover border border-3 border-white row p-3 mb-4 bg-white rounded overflow-hidden"
                  key={index}
                >
                  <div className="col-12 text-info fs-5 fw-bold mb-3 overflow-hidden">{item.title}</div>
                  <div className="col-12 overflow-hidden">
                    <div className="d-flex justify-content-between flex-wrap flex-lg-nowrap gap-4">
                      <div>
                        <div className="fw-medium">Image</div>
                        <img
                          src={thumbnail || "/placeholder.svg"}
                          alt="thumbnail"
                          width={"70px"}
                          height={"70px"}
                          className="mt-2 object-fit-cover"
                        />
                      </div>
                      <div>
                        <div className="fw-medium">Video</div>
                        <video width={"70px"} height={"70px"} controls className="mt-2">
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div>
                        <div className="fw-medium">Genres</div>
                        <div className="text-secondary mt-2" style={{ fontSize: "14px" }}>
                          {Array.isArray(item.genres) ? item.genres.join(", ") : item.genres}
                        </div>
                      </div>
                      <div>
                        <div className="fw-medium">Date</div>
                        <div className="text-secondary mt-2" style={{ fontSize: "14px" }}>
                          {new Date(item.releaseDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="fw-medium">Description</div>
                        <div className="text-secondary mt-2" style={{ fontSize: "14px", wordBreak: "break-all" }}>
                          {item.description}
                        </div>
                      </div>
                      <div>
                        <div className="fw-medium">Action</div>
                        <div className="d-flex justify-content-center gap-2 mt-2">
                          <FaEye
                            className="text-primary fs-5"
                            style={{ cursor: "pointer" }}
                            title="View"
                            onClick={() => handleViewClick(item._id, item.title)}
                          />
                          <RiDeleteBin5Fill
                            className="text-danger fs-5"
                            style={{ cursor: "pointer" }}
                            title="Delete"
                            onClick={() => handleDelete(item._id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default NewSeries
