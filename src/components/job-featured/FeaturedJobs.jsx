
import { Link } from 'react-router-dom'
import JobFeaturedFilter from './JobFeaturedFilter'
import { useState } from 'react'
const categories = [
    "Residential",
    "Commercial",
    "Industrial",
    "Apartments",
  ]
export default function FeaturedJobs() {
    const [currentCategory, setCurrentCategory] = useState('')
  return (
    <section className="job-section">
    <div className="auto-container">
      <div className="sec-title-outer">
        <div className="sec-title">
          <h2>Featured Jobs</h2>
          <div className="text">
            Know your worth and find the job that qualify your life
          </div>
        </div>

        <div className="select-box-outer">
          <span className="icon fa fa-angle-down"></span>
            <select onChange={(e)=>setCurrentCategory(e.target.value)} >
                <option value="">All Categories</option>
                {categories.map((elm , i )=><option key={i} value={elm}>{elm}</option>)}
                
            </select>
        </div>
      </div>
      {/* End sec-title-outer */}

      <div className="row " data-aos="fade-up">
        <JobFeaturedFilter category={currentCategory} />
      </div>

      <div className="btn-box">
        <Link
          to="/job-list-v5"
          className="theme-btn btn-style-one bg-blue"
        >
          <span className="btn-title">Load More Listing</span>
        </Link>
      </div>
    </div>
  </section>
  )
}
