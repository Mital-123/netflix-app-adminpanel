// import React, { useEffect, useState } from 'react'
// import { useLocation, useParams } from 'react-router-dom'
// import ButtonCom from './Main/ButtonCom'
// import { RiDeleteBin5Fill } from 'react-icons/ri';
// import { MdEditSquare } from 'react-icons/md';
// import axios from 'axios';

// function AddSeason() {
//     const params = useParams().id
//     console.log(params);


//     const [obj, setobj] = useState({});
//     const [SeasonArray, setSeasonArray] = useState([]);
//     const [blankobj, setblankobj] = useState({});
//     const [showModal, setShowModal] = useState(false);

//     const location = useLocation();
//     const { seriestittle } = location.state || {};

//     const openModal = () => {
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     const addSeasonData = (e) => {
//         obj[e.target.name] = e.target.value;
//         blankobj[e.target.name] = "";

//         setobj({ ...obj });
//         setblankobj({ ...blankobj });
//     }

//     const AddSeasonSaveData = () => {
//         // SeasonArray.push(obj);
//         console.log(obj);

//         // console.log(SeasonArray);
//         axios.post(
//             "https://netflixbackend-dcnc.onrender.com/addseason", {
//             title: obj.seasonname,
//             series_id: params
//         }
//         ).then((res) => {
//             console.log(res.data);
//             setobj({ ...blankobj });
//             setShowModal(false);
//             id_match()
//         }).catch(function (error) {
//             console.log(error);
//         })
//     }



//     const id_match = () => {
//         axios.get("https://netflixbackend-dcnc.onrender.com/addseason/").then((res) => {
//             // setSeasonArray(res.data.data);
//             console.log(res.data.data);
//             const data = res.data.data
//             const finddata = data.filter((index) => index.series_id == params)
//             setSeasonArray(finddata)

//         })

//     }
//     const deletseason = (id) => {
//         axios.delete(`https://netflixbackend-dcnc.onrender.com/addseason/${id}`).then((res) => {
//             id_match()
//         })
//     }
//     useEffect(() => {
//         id_match()

//     }, []);
//     return (
//         <>
//             <div className='p-4'>
//                 <div className='d-flex justify-content-center'>
//                     <div><h3 className='fw-bold'>Season List</h3></div>
//                     <div className='ms-auto'>
//                         <ButtonCom btn="Add Season" onClick={openModal} />
//                     </div>
//                 </div>
//                 <div className='text-center'>
//                     <h4 className='fw-bold my-3'>{seriestittle || 'Series Title'}</h4>
//                 </div>

//                 {
//                     showModal && (
//                         <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
//                             <div className="modal-dialog modal-dialog-centered">
//                                 <div className="modal-content">
//                                     <div className="modal-header">
//                                         <h5 className="modal-title fw-bold">Add Season</h5>
//                                         <button type="button" className="btn-close" onClick={closeModal}></button>
//                                     </div>
//                                     <div className="modal-body">
//                                         <form className='px-2'>
//                                             <div>
//                                                 <label htmlFor="" className='fw-medium'>Season </label>
//                                                 <input type="text" name="seasonname" id="" className='form-control mt-1 border border-secondary' onChange={addSeasonData} value={obj?.seasonname || ''} />
//                                             </div>
//                                             <div className='text-center mt-3'>
//                                                 <ButtonCom btn="Save" onClick={AddSeasonSaveData} />
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 }

//                 <div className='table-responsive mt-4'>
//                     <table className='table'>
//                         <thead>
//                             <tr>
//                                 <th>Season</th>


//                                 <th>Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {
//                                 SeasonArray.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>
//                                             {item.title}
//                                         </td>
//                                         <td className='text-dark fs-1'>
//                                             <span onClick={() => { deletseason(item._id) }} ><RiDeleteBin5Fill /></span>
//                                             <span ><MdEditSquare /></span>
//                                         </td>
//                                     </tr>
//                                 ))
//                             }

//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default AddSeason;


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ButtonCom from './Main/ButtonCom';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';

function AddSeason() {

    let navigate = useNavigate()
    const { id: seriesId } = useParams();
    const [obj, setObj] = useState({ seasonname: '' });
    const [SeasonArray, setSeasonArray] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const location = useLocation();
    const { seriestittle } = location.state || {};

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        fetchSeasonData();
    }, []);

    const fetchSeasonData = async () => {
        try {
            const res = await axios.get("https://netflixbackend-dcnc.onrender.com/addseason/");
            const filteredSeasons = res.data.data.filter((s) => s.series_id === seriesId);
            setSeasonArray(filteredSeasons);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObj((prev) => ({ ...prev, [name]: value }));
    };

    const AddSeasonSaveData = async () => {
        if (!obj.seasonname.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: '❗Please fill all fields before submitting.',
            });
            return;
        }

        try {
            const res = await axios.post("https://netflixbackend-dcnc.onrender.com/addseason", {
                title: obj.seasonname,
                series_id: seriesId,
            });

            console.log(res.data);

            Swal.fire({
                icon: 'success',
                title: 'Upload Successfull',
                text: '✅ Season added successfully!',
                timer: 8000,
                showConfirmButton: false,
            });

            setObj({ seasonname: '' });
            setShowModal(false);
            fetchSeasonData();

        } catch (error) {
            console.error("Error saving season:", error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: '❌ Something went wrong. Please try again.',
            });
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
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://netflixbackend-dcnc.onrender.com/addseason/${id}`);
                    Swal.fire("Deleted!", "The season has been deleted.", "success");
                    fetchSeasonData();
                } catch (error) {
                    console.error("Error deleting season:", error);
                    Swal.fire("Error!", "There was an issue deleting the season.", "error");
                }
            }
        });
    };

    const viewepisode = (seasonid) => {
        navigate(`/episodes/${seasonid}`);
    };
    return (
        <div className='p-4'>
            <div className='d-flex justify-content-center'>
                <div className='d-none d-md-block d-lg-block'>
                    <h3 className='fw-bold'>Season List</h3>
                </div>
                <div className='ms-lg-auto ms-md-auto ms-sm-0 d-flex justify-content-sm-center'>
                    <ButtonCom btn="Add New Season" onClick={openModal} />
                </div>
            </div>

            <div className='text-center'>
                <h4 className='fw-bold my-3'>{seriestittle || 'Series Title'}</h4>
            </div>

            {showModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">Add New Season</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <form className='p-2'>
                                    <label className='fw-medium'>Season</label>
                                    <input
                                        type="text"
                                        name="seasonname"
                                        className='form-control mt-1 border border-secondary'
                                        onChange={handleInputChange}
                                        value={obj.seasonname}
                                    />
                                    <div className="mt-4 text-center">
                                        <button type='button' className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2" onClick={AddSeasonSaveData}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* <div className='container table-responsive mt-4'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Season</th>
                            <th>Delete</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SeasonArray.map((item, index) => (
                            <tr key={index}>
                                <td style={{verticalAlign:"middle"}}>{item.title}</td>
                                <td className='text-dark fs-1 '>
                                    <span onClick={() => deleteSeason(item._id)} style={{ cursor: 'pointer' }}>
                                        <RiDeleteBin5Fill />
                                    </span>
                                
                                </td>
                                <td className='text-dark fs-1'>
                                    <span onClick={() => viewepisode(item._id)} style={{ cursor: 'pointer' }}>
                                        <FaEye />
                                    </span>
                                
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

            <div className='container table-responsive mt-4 tablemedia'>
                <table className='table  table-hover align-middle shadow'>
                    <thead className="table-dark ">
                        <tr>
                            <th className='text-center'>Season</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SeasonArray.length > 0 ? (
                            SeasonArray.map((item, index) => (
                                <tr key={index} >
                                    <td className='text-center'>{item.title}</td>
                                    <td className="text-center">
                                        <span
                                            onClick={() => viewepisode(item._id)}
                                            style={{ cursor: 'pointer' }}
                                            className="text-primary me-3 fs-5"
                                            title="View"
                                        >
                                            <FaEye />
                                        </span>

                                        <span
                                            onClick={() => deleteSeason(item._id)}
                                            style={{ cursor: 'pointer' }}
                                            className="text-danger fs-5"
                                            title="Delete"
                                        >
                                            <RiDeleteBin5Fill />
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center py-3 fw-medium">
                                    No Season Available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default AddSeason;