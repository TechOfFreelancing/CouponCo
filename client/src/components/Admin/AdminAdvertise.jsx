import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Button,
} from "@material-tailwind/react"

const AdminAdvertise = () => {
  const [count, setCount] = useState(1)
  const [contact, setContact] = useState([])
  const options = { day: "2-digit", month: "2-digit", year: "numeric" }
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend.qwiksavings.com/api/advertise"
        )
        setContact(response.data)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch contacts.")
        console.error("Failed to fetch contacts:", error)
      }
    }

    fetchProducts()
  }, [count])

  const handleOpen = () => {
    setOpen(!open)
    setInterval(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <>
      <Toaster position='top-center'></Toaster>
      <Dialog open={open}>
        <DialogHeader className='flex justify-between items-center'>
          <div>Advertise Data</div>
          <Button variant='text' color='blue-gray' onClick={handleOpen}>
            Close
          </Button>
        </DialogHeader>

        <DialogBody>
          <div className='overflow-scroll h-[50rem] pb-[10rem]'>
            {contact.map((contact, index) => (
              <div
                key={index}
                className='relative border border-gray-300 rounded-lg p-4 mb-4 cursor-pointer'
              >
                <div className='flex justify-between items-center mb-2'>
                  <div className='text-xl font-bold mr-3'>
                    {contact.fullname}
                  </div>
                  <div className='text-xl font-bold mr-3'>
                    {contact.company}
                  </div>
                  <div className='text-l mr-3'>{contact.email}</div>
                </div>
                <div className='bg-gray-100 text-center rounded p-2 mb-2'>
                  <Link to={contact.website_url}>{contact.website_url}</Link>
                </div>
                <div className='bg-gray-100 text-center rounded p-2 mb-2'>
                  {contact.message}
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
      </Dialog>
    </>
  )
}

export default AdminAdvertise
