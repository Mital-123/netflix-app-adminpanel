import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function SubScription() {

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get('https://netflixbackend-dcnc.onrender.com/subscription')
            .then(response => setPlans(response.data))
            .catch(error => console.error('Error fetching subscription data:', error));
    }, []);

    return (
        <div className='container p-4'>
            <div className='row'>
                {plans.map((plan, index) => (
                    <div key={index} className='col-12 col-lg-4 mb-4'>
                        <div className='main_subscription h-100 shadow bg-white border p-4 rounded-2'>
                            <div className='d-flex'>
                                <div>
                                    <div className='fw-medium'>{plan.name}</div>
                                </div>
                                <div className='ms-auto'>
                                    <div>
                                        <div className='text-danger fw-bold px-3 py-1 rounded-5' style={{ fontSize: "13px", background: "#ff000014" }}>{plan.save}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='fs-3 fw-bold'>{plan.price_per_month}<span className='fs-6 fw-medium'>/mo</span></div>
                            <div className='fw-medium text-danger'>{plan.extra}</div>
                            <div className='mt-2' style={{ fontSize: "14px" }}><span className='text-secondary text-decoration-line-through'>{plan.total_price}</span> <span className='fw-medium'>{plan.new_prise}</span> <span className='text-secondary fw-medium'>for the first <span>27 months</span> VAT may apply</span></div>
                            <div className='my-3'>
                                <button type='button' className="w-100 bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2" >{plan.button}</button>
                            </div>
                            <div>
                                <ul className='list-unstyled' style={{ fontSize: "14px" }}>
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className='text-success my-2'>✔ <span className='text-secondary fw-medium'>{feature}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <Link className='text-decoration-none'><div className='text-decoration-underline fw-medium text-dark'>See all features</div></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubScription