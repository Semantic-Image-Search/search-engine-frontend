import { React, useState, useEffect } from 'react'
import BasicTextFields from "../components/textfield";
import axios from 'axios'
import Grid from '@mui/material/Grid'

const Home = () => {

    const [imageText1, setImageText1] = useState('')
    const [buttonClick, setbuttonClick] = useState(false)
    const [api, setApi] = useState(0)
    const [imagesList, setImagesList] = useState([])

    // console.log(buttonClick, imagesList)

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

    return (
        <>

            <BasicTextFields
                searchText={imageText1}
                updateSearchText={setImageText1}
                setbuttonClick={setbuttonClick}
                setApi={setApi}
            />
            {buttonClick && handleChange()}
            <div className="card-list">
                {imagesList.length > 0 ? displayImages : null}
            </div>
        </>
    );
}

export default Home;