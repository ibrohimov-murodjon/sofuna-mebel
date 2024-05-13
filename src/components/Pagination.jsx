import { Button, CardFooter, Typography } from '@material-tailwind/react'
import React from 'react'

function Pagination() {
  return (
    <div className="flex  items-center justify-between border-t border-blue-gray-50 p-4">
    <Typography variant="small" color="blue-gray" className="font-normal">
      Page 1 of 10
    </Typography>
    <div className="flex gap-2">
      <Button variant="outlined" size="sm">
        Previous
      </Button>
      <Button variant="outlined" size="sm">
        Next
      </Button>
    </div>
  </div>
  )
}

export default Pagination