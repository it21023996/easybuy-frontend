import React from 'react'

function PageNumber({pageNumber, totalElements, setPageNumber,pageSize}) {

    const totalPages = Math.ceil(totalElements / pageSize)
  return (
    <div className="d-flex justify-content-center align-items-center my-4 gap-3">
      <button disabled={pageNumber === 0} onClick={() => setPageNumber(prev => prev -1)} className="btn btn-primary btn-sm">
        Previous
        </button>
      <span className="page-info">
        Page {pageNumber+1} of {totalPages}
        </span>
      <button disabled={pageNumber+1 >= totalPages} onClick={()=> setPageNumber(prev => prev +1)} className="btn btn-primary btn-sm">
        Next
        </button>
    </div>
  )
}

export default PageNumber