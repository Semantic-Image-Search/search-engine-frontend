import { React, useState, useEffect } from 'react'
import BasicTextFields from "../components/textfield";
import Loader from '../components/loader';
import axios from 'axios'

const Home = () => {

    const [imageText1, setImageText1] = useState('')
    const [buttonClick, setbuttonClick] = useState(false)
    const [api, setApi] = useState(0)
    const [imagesList, setImagesList] = useState([])
    const [desc, setDesc] = useState('')
    const [descApi, setDescApi] = useState(0)
    const [filteredImage, setFilteredImage] = useState([])
    const [loader, setLoader] = useState(false)
    const [blur, setBlur] = useState('noblur')

    useEffect(() => {

        if (api > 0) {
            axios.get('https://api.unsplash.com/search/photos', {
                headers: {
                    'Authorization': 'Client-ID NL9vHYq0hhlL5CA7KxePs4h0z7y_uZkPNMwH-zlq-Q8'
                },
                params: {
                    query: imageText1,
                    per_page: 30
                }
            })
                .then((response) => {
                    const imageList = []
                    response.data.results.map((image) => {
                        imageList.push(image.urls.full)
                    })
                    setImagesList(imageList)
                })
                .catch((error) => console.log(error));
        }

    }, [api])

    useEffect(() => {

        if (descApi > 0 && imagesList.length > 0) {
            axios.post('http://127.0.0.1:8020/sim_search', {
                search: desc,
                imgs: imagesList
            })
                .then((response) => {
                    setFilteredImage(response.data.data)
                    setImagesList([])
                    setLoader(val => !val)
                    setBlur('noblur')
                })
                .catch((error) => console.log(error))
        }

    }, [descApi])


    const handleChange = () => {
        setApi(c => c + 1)
        setbuttonClick(false)
    }

    const displayImages = imagesList.map((image, index) => {
        return (
            <div className="card" key={index}>
                <img
                    className="card--image"
                    src={image}
                    width="50%"
                    height="50%"
                ></img>
            </div>
        )
    })

    const displayFilteredImage = filteredImage.map((image, index) => {
        return (
            <div className="card" key={index}>
                <img
                    className="card--image"
                    src={image}
                    width="50%"
                    height="50%"
                ></img>
            </div>
        )
    })

    const handleDescChange = (e) => {
        e.preventDefault()
        setDesc(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setDescApi(c => c + 1)
        setLoader(val => !val)
        setBlur('blur')
    }

    return (
        <>
            <BasicTextFields
                searchText={imageText1}
                updateSearchText={setImageText1}
                setbuttonClick={setbuttonClick}
                setApi={setApi}
            />
            {buttonClick && handleChange()}
            {imagesList.length > 0 || filteredImage.length > 0 ?
                <form className="form" onSubmit={handleSubmit}>
                    <label className="label" htmlFor="query">
                        {" "}
                        🖊️
                    </label>
                    <input
                        type="text"
                        name="query"
                        className="input"
                        placeholder={`Add description`}
                        value={desc}
                        onChange={handleDescChange}
                    />
                    <button type="submit" className="button2">
                        Search
                    </button>
                </form>
                : null
            }
            <div className={`card-list-${blur}`}>
                {imagesList.length > 0 ? displayImages : null}
                {filteredImage.length > 0 ? displayFilteredImage : null}
            </div>
            {loader && <Loader />}
        </>
    );
}

export default Home;