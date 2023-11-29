import { baseRequest } from '@/axios/baseRequest';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { removeItem } from '@/redux/cartSlice';
import { setShowSearchPage } from '@/redux/showSearchPageSlice';
import { useState } from 'react';

import { IoMdClose } from "react-icons/io";
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
    const [products, setProducts] = useState([])
    const dispath = useDispatch()
    const navigate = useNavigate()
    let timer = null

    console.log('products', products)

    const handleClick = (id) => {
        navigate(`/product/${id}`)
        dispath(setShowSearchPage(false))
    }

    const handleChange = ({ target }) => {
        if(target.value.trim() === ''){
            return
        }

        let value = ''
        timer = setTimeout(async () => {
            value = target.value
            clearTimeout(timer)

            try {
                console.log('value', value)
                const response = await baseRequest.get(`/products?populate=*&filters[title][$contains]=${value}`)
                setProducts(response?.data?.data)

            } catch (err: any) {
                console.log(err)
            }
        }, 3000)
    }

    return (
        <div className='w-screen h-screen fixed top-0 left-0 z-[100] backdrop-blur-md'>
            <div className='globalWidth flex justify-center h-full p-10'>
                <div className='w-4/5  flex flex-col items-center'>

                    <div className="flex items-center w-full space-x-2">
                        <Input type="text" onChange={handleChange} placeholder="Recherche" className='h-[50px] bg-white ' />
                        {/* <Button type="submit" className=" bg-primaryColor/95 hover:bg-primaryColor">
                            Recherche
                        </Button> */}
                    </div>
                    {
                        products.length > 1 && 
                        <div className='w-full max-h-[80vh] bg-white shadow-sm mt-10 border overflow-y-auto p-10'>
                        <div>
                            {products?.map(item => (
                                <div key={item.id} className='bg-white p-4 mb-3 shadow-sm'>
                                    <div className='flex justify-between  gap-5  '>
                                        <div className='w-[300px]  flex gap-5 '>
                                            <img src={import.meta.env.VITE_API_UPLOAD + item?.attributes?.img?.data[0]?.attributes?.url} alt="" className='w-[80px] h-[80px] object-cover' />

                                            <div className='flex flex-col  '>
                                                <h1 onClick={() => handleClick(item?.id)}
                                                    className=' text-black text-[16px] hover:underline cursor-pointer'>{item?.attributes?.title} </h1>
                                                {/* <p className='text-sm text-black/60'>{item.desc.substring(0,50)}...  </p> */}
                                                <p className='text-primaryColor text-md font-bold'> $ {item?.attributes?.price} </p>
                                                <div className='flex'>
                                                    <p className='text-sm'> {item?.attributes?.size?.toString()} </p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    }
                 
                </div>
            </div>

            <IoMdClose
                size={30}
                className='text-primaryColor absolute right-10 top-5'
                onClick={() => dispath(setShowSearchPage(false))}
            />
        </div>
    )
}
