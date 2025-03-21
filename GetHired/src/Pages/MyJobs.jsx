import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 4; // Define jobsPerPage constant

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/myJobs/anandsumit1705@gmail.com`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setIsLoading(false);
            });
    }, [searchText]);

    const handleSearch = () => {
        const filter = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        setJobs(filter);
        setIsLoading(false);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/job/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json)
            .then(data => {
                if (data.acknowledged === true) {
                    alert("Job Deleted successfully!!!");
                    // Fetch jobs again after deletion
                    fetchJobs();
                }
            });
    }

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className='my-jobs-container'>
                <h1 className='text-center p-4'>All My Jobs</h1>
                <div className='search-box p-2 text-center mb-2'>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text" name='search' id='search' className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' />
                    <button className='bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4' onClick={handleSearch}>Search</button>
                </div>
            </div>

            {/* table  */}
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to="/post-job">
                                        <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                            Post A New Job
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            NO.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Title
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            COMPANY NAME
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            SALARY
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            EDIT
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            DELETE
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ? (
                                            <div className='flex items-center justify-center h-20'><p>Loading.....</p></div>
                                        ) : (
                                            currentJobs.map((job, index) => (
                                                <tr key={index}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                        {index + 1}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {job.jobTitle}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {job.companyName}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        ${job.minPrice} - ${job.maxPrice}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <button><Link to={`/edit-job/${job?._id}`}>Edit</Link></button>
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <button onClick={() => handleDelete(job._id)} className='bg-red-700 py-2 px-6 text-white rounded-sm'>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4">
                                <nav>
                                    <ul className="pagination flex">
                                        {[...Array(Math.ceil(jobs.length / jobsPerPage)).keys()].map(number => (
                                            <li key={number} className="page-item">
                                                <button
                                                    onClick={() => paginate(number + 1)}
                                                    className="page-link bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                                                >
                                                    {number + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MyJobs;
