import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Home = () => {
    const [search, setSearch] = useState("");
    const [item, setItem] = useState([]);
    const [cat, setCat] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:2001/user/fooddata", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const mongo = await response.json();
        setItem(mongo[0]);
        setCat(mongo[1]);
         console.log(mongo[0],mongo[1]);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className='home'>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className='container '>
                    {
                        cat != [] ? cat.map((d) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={d._id} className='fs-3 m-3'>
                                        {d.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        item != [] 
                                        ?   item.filter((i) => (i.CategoryName === d.CategoryName) && (i.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                                .map((ft) => {
                                                    return (
                                                        <div key={ft._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card demo={ft} Options={ft.options[0]} />
                                                        </div>
                                                    )
                                                })
                                            :
                                            <div>no data found</div>
                                    }
                                </div>
                            )
                        })
                            :
                            " "
                    }

                </div>
                

            </div>

        </>
    )
}

export default Home;
