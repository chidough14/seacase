import React, { useEffect, useState } from 'react';
import { getCarriers, getCommodities, getCompanies, getCountries, getCountryRegion, getRegions, getVesselGroups, getVessels, getVesselTypes, getVesselTypeVesselroup } from '../services/api';
import { Fetch } from "../services/fetch";
import callbacks from "../services/api";

const Panel = () => {

    const [countries, setCountries] = useState([])

    const [carriers, setCarriers] = useState([])

    const [companies, setCompanies] = useState([])


    //ha en callback i API.js, måste ha en state i den komponenten du använder den i(endpoint), setEndpoint, sen useEffect att hämta de i.

    useEffect(
        ()=>{
            const makeAsyncCall = async () => {
                setCountries( await getCountries() )
            }

            makeAsyncCall()
        } ,
        [countries.length, Fetch.token] 
    )


    useEffect(
        ()=>{
            const makeAsyncCall = async () => {
                setCarriers( await getCarriers() )
            }

            makeAsyncCall()
        } ,
        [carriers.length, Fetch.token] 
    )

    useEffect(
        ()=>{
            const makeAsyncCall = async () => {
                setCompanies( await getCompanies() )
            }

            makeAsyncCall()
        } ,
        [companies.length, Fetch.token] 
    )


    return <div>
        Panel
        {
            countries.map(
            (country) => <div>{country.name}</div>
            )
        }
    </div>
    
}

export default Panel;
