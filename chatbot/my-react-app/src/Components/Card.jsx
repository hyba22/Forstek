import axios from "axios";
import { useEffect, useState } from "react";
const Card = () => {
    const[apiData, setApiData] = useState([])


    useEffect(()=>{
        axios.get("https://dummyjson.com/products").then((res)=>{
            console.log(res.data.products)
            setApiData(res.data.products)
        }).catch((err)=>{
            console.log("error", err)
        })
    },[])

    return (
        <>
            <div className="container p-2">
                <div className="row">
                    {
                        apiData.map((data,i)=>{
                            return(
                                <div className="col-3" key={i}>
                                    <div className="card" style={{"width": "400px"}}>
                                        <img className="card-img-top" src={data.thumbnail} alt="card" />
                                        <div className="card-body">
                                            <h4 className="card-title">{data.title}</h4>
                                            <p className="card-text">{data.description}</p>
                                            <button className="btn btn-primary">Buy</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Card;