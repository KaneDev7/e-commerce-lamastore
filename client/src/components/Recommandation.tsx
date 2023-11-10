import { useEffect, useState, useCallback } from 'react'
import useFetch from '../hooks/useFetch'
import Card from './Card'
import { useParams } from 'react-router-dom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function Recommandation({ categories }) {
    const { id } = useParams()
    const [url, setUrl] = useState<string>('')
    const [products, setProducts] = useState([])

    const { data, isLoading, error } = useFetch(url)

    useEffect(() => {
        setUrl(`/products?populate=*${categories.map(categorie => `&[filters][categories][id]=${categorie?.id}`)}`)
    }, [categories])

    useEffect(() => {
        const newProducts = data.filter(product => product.id !== Number(id))
        setProducts(newProducts)
    }, [data])

    return (
        <div className="flex  my-[5rem] globalWidth">

            <div className="w-full max-w-[1500px] ">

                {
                    products.length > 0 &&
                    <h1 className="text-2xl   text-black/90 font-bold duration-200"> PRODUITS SIMILAIRES </h1>

                }

                <div className="flex ">
                    {/* <div className="mt-10"> */}

                    <Swiper
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                        }}
                        // slidesPerView={4}
                        spaceBetween={30}
                        navigation={true}
                        loop={true}
                        modules={[Navigation, Pagination]}
                        className="mySwiper mt-10"
                    >
                        {
                            products.map(product => (
                                <SwiperSlide key={product.id} >
                                    <Card product={product} />
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>

                    {/* </div> */}
                </div>

            </div>

        </div>
    )
}
