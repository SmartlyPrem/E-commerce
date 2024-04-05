import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/MainContext';
import axios from 'axios';

const Transaction = () => {
    const [transaction, setTransaction] = useState([])
    const [total, setTotal] = useState(0)
    const { BASE_URL } = useContext(Context)
    const [successFail, setSuccessFail] = useState({});

    function withoutFilter() {
        axios.get(BASE_URL + "/transaction" + "/get-transaction")
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setTransaction(success.data.transactions)
                    }
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(
        () => {
            withoutFilter()
        }, []
    )

    let sum = 0;
    let success = 0;
    let failed = 0;
    useEffect(
        () => {
            if (transaction != "") {
                for (let d of transaction) {
                    sum += d.amount
                    if (d.payment_status == true) {
                        success++
                    } else if (d.payment_status == false) {
                        failed++
                    }
                }
                setTotal(sum)
                setSuccessFail({ success, failed });
            }
        }, [transaction]
    )

    function searchFilter(e) {
        e.preventDefault();
        console.log(e.target.start.value);
        console.log(e.target.end.value);
        axios.get(BASE_URL + "/transaction" + "/get-transaction?" + "order_id=" + e.target.order_id.value + "&transaction_id=" + e.target.transaction_id.value + "&payment_status=" + e.target.status.value + "&type=" + e.target.type.value + "&user_id=" + e.target.user_id.value + "&start_date=" + e.target.start.value + "&end_date=" + e.target.end.value)
            .then(
                (success) => {
                    setTransaction(success.data.transactions)
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )

    }
    return (
        <div className=''>
            <div className='bg-gray-200 p-3'>
                <div className='mb-3'>
                    <h3 className='text-xl font-semibold border-b-2 border-gray-400 inline'>Filter</h3>
                </div>
                <form onSubmit={searchFilter}>
                    <div date-rangepicker="" className="flex items-center">
                        <div className="relative">
                            {/* <div className="absolute cursor-pointer inset-y-0 end-[10px] flex items-center ps-3">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div> */}
                            <input
                                name="start"
                                type="date"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none select-none block w-full ps-2 p-2.5"
                                placeholder="Select date start"
                            />
                        </div>
                        <span className="mx-4 text-gray-500">to</span>
                        <div className="relative">
                            {/* <div className="absolute cursor-pointer inset-y-0 end-[10px] flex items-center ps-3">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div> */}
                            <input
                                name="end"
                                type="date"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none select-none block w-full ps-2 p-2.5"
                                placeholder="Select date end"
                            />
                        </div>
                    </div>

                    <div className='flex my-3 gap-2'>
                        <input type="text" name='order_id' className=' border p-2 border-gray-400 rounded' placeholder='Order ID' />
                        <input type="text" name='user_id' className=' border p-2 rounded border-gray-400' placeholder='User ID' />
                        <input type="text" name='transaction_id' className=' border p-2 rounded border-gray-400' placeholder='Transaction ID' />
                        <select name="status" className='w-40 p-2 rounded border border-gray-400' id="status">
                            <option value="">Select Status</option>
                            <option value="true">Success</option>
                            <option value="false">Failed</option>
                        </select>
                        <select name="type" className='w-48 p-2 rounded border border-gray-400' id="type">
                            <option value="">Select payment mode</option>
                            <option value="2">Online</option>
                            <option value="1">Cash</option>
                        </select>
                    </div>

                    <div className='flex gap-2'>
                        <button type='submit' className='w-40 text-center bg-blue-600 text-white py-1 rounded'>Search</button>
                        <button type='reset' onClick={withoutFilter} className='w-40 text-center bg-blue-600 text-white py-1 rounded'>Clear</button>
                    </div>
                </form>
            </div>
            <div className='text-white flex gap-7 my-4 px-2'>
                <div className='bg-blue-600 px-4 pt-7 pb-3 w-full rounded'>
                    <h3 className='font-semibold text-3xl mb-2'>{transaction?.length}</h3>
                    <h5 className='uppercase flex justify-between text-sm'>Total transactions <span>hi</span></h5>
                </div>
                <div className='bg-green-600 px-4 pt-7 pb-3 w-full rounded'>
                    <h3 className='font-semibold text-3xl mb-2'>{successFail.success}</h3>
                    <h5 className='uppercase flex justify-between text-sm'>Successful transactions <span>hi</span></h5>
                </div>
                <div className='bg-red-600 px-4 pt-7 pb-3 w-full rounded'>
                    <h3 className='font-semibold text-3xl mb-2'>{successFail.failed}</h3>
                    <h5 className='uppercase flex justify-between text-sm'>Failed transactions <span>hi</span></h5>
                </div>
                <div className='bg-violet-600 px-4 pt-7 pb-3 w-full rounded'>
                    <h3 className='font-semibold text-3xl mb-2'>₹{total.toLocaleString("en-IN")}</h3>
                    <h5 className='uppercase flex justify-between text-sm'>Transaction amount <span>hi</span></h5>
                </div>
            </div>
            <div className='bg-gray-200 p-3'>
                <table className='w-full' rules='all' cellSpacing={3}>
                    <thead className='w-full bg-blue-500 text-white box-border' >
                        <tr className='box-border'>
                            <th className='border-x border-white'>Sr.no</th>
                            <th>Order Info</th>
                            <th className='border-x border-white'>User Info</th>
                            <th>Item type</th>
                            <th className='border-x border-white'>Amount</th>
                            <th className='border-x border-white'>Status</th>
                            <th className='border-x border-white'>Payment mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transaction?.map(
                                (d, i) => {
                                    return (
                                        <tr key={i} className='text-center py-4 h-32'>
                                            <td className='border border-black'>{i + 1}</td>
                                            <td className='border border-black'><b>Date:</b> {new Date(d.createdAt).toLocaleString()} <br /> <b>Order Id:</b> {d.order_id._id} <br /> <b>Transaction Id:</b> {d._id}</td>
                                            <td className='border border-black'><span className='text-blue-500'>{d.user_id?.name}</span> <br /> {d.user_id?.email}</td>
                                            <td className='border border-black'>{d.order_id.product_details?.map(
                                                (data, index) => {
                                                    return (
                                                        <span>
                                                            {data.name} <br />
                                                        </span>
                                                    )
                                                }
                                            )}</td>
                                            <td className='border border-black'>Rs. <br /> {d.amount}</td>
                                            <td className='border border-black'>{d.payment_status ? <span className='text-white px-1 rounded py-[2px] bg-green-500 text-sm'>Success</span> : <span className='text-white px-1 rounded py-[2px] bg-red-500 text-sm'>Failed</span>}</td>
                                            <td className='border border-black'>{d.type == 1 ? "Cash" : "Online"}</td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transaction;
