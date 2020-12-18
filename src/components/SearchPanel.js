import React, { useEffect, useRef, useState } from 'react'
import { Drawer, Button, Divider} from 'antd';

import 'antd/dist/antd.css';
import { getCarriers, getCommodities, getCompanies, getCountries, getCountryRegion, getRegions, getVesselGroups, getVessels, getVesselTypes, getVesselTypeVesselroup } from '../services/api';
import { Fetch } from "../services/fetch";
import CarrierVessel from './CarrierVessel';
import Countries from './Countries';
import TimePeriod from './TimePeriod';
import CommodityHs4 from './CommodityHs4';




/* https://cors-anywhere.herokuapp.com/ */

const SearchPanel = () => {
    //const [fetchCountries, setFetchCountries] = useState([])
   /*  useEffect(() => {
        fetch("/countries", {
            headers: {
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImF5Zk52QjlINk5qaEx3WVVuOXZBciJ9.eyJpc3MiOiJodHRwczovL3NlYWNhc2UuZXUuYXV0aDAuY29tLyIsInN1YiI6IlZKc2J2bXkya2I3T0lkbTFodm5KdzRuNE1mdFVSekpCQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS5nbG9iYWxzaGlwcGluZy53YXRjaCIsImlhdCI6MTYwNzc4Mjg4MCwiZXhwIjoxNjA3ODY5MjgwLCJhenAiOiJWSnNidm15MmtiN09JZG0xaHZuSnc0bjRNZnRVUnpKQiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.zA8nv_wvSXltXAzmVe60bE8TuicrMlclSfd7F_GEM-VgdcC6-gcuos6dlwmSCbwBuAnZRjtvWHg2mz2mtS19dxci8ebos4tiBXGiGFsmkqOUcoO1VYj8SB5vEU9KhaZ5r7HtXZ22VCxTEf9y1EYSw3OsQmsNEHhZHgFkrb3LvR27r1lwGkqscsEm64Jpj_q9xBmgZnOZRndZeQnTvUS_APSidNvAiyjbTPun57XECQQTU1jJSCcqQxBQ0k-5oABf4eLwbu1U-v4hmM3kZ24Zek5DdfsI3KDVQG_y0f2Z_LvxzeD5-ZB74udQvJhOejnrcjZQ8HBnE11SsaYS4oBk1Q"}
        })
        .then(response => response.json())
        .then((countries) => {
          console.log(countries)
        })
        .catch((error)=> {
            console.log(error)
        })
    }) */
    const [fetchCountries, setFetchCountries] = useState([])
    useEffect(
        ()=>{
            const makeAsyncCall = async () => {
                setFetchCountries( await getCountries() )
                console.log(fetchCountries)
            }

            makeAsyncCall()
        } ,
        [fetchCountries.length, Fetch.token] 
    )
    
    const [carrVess, setCarrVess] = useState(false)
    const [countrySet, setCountrySet] = useState(false)
    const [dateSet, setDateSet] = useState(false)
    const [commHs4, setCommHs4] = useState(false)
   

    const checkCarrVess = (val) => {

        if(val === 1){
            setCarrVess(true)
        } else if(val === 0) {
            setCarrVess(false)
        }
    }

    const checkCountrySet = (val) => {

        if(val === 1){
            setCountrySet(true)
        } else if(val === 0) {
            setCountrySet (false)
        }
    }

    const checkCommHs4 = (val) => {
        if(val === 1){
            setCommHs4(true)
        } else if(val === 0) {
            setCommHs4 (false)
        }
    }

    const checkDateSet = (val) => {

        if(val === 1){
            setDateSet(true)
        } else if(val === 0) {
            setDateSet (false)
        }
    }
     

    return (
        <div>
            <Drawer
                placement="left"
                closable={false}
                visible={true}
                key="left"
                mask={false}
                width={300}
            >
               <Divider orientation="left">Carriers and Vessels</Divider>
               
               <CarrierVessel checkCarrVess={checkCarrVess} />

               <Divider orientation="left">Commodities and Hs4</Divider>

               <CommodityHs4 checkCommHs4={checkCommHs4} />

               <Divider orientation="left" style={{marginTop: "10px"}}>Countries</Divider>
               
               <Countries checkCountrySet={checkCountrySet} fetchCountries={fetchCountries} />

                <Divider orientation="left">Time Period</Divider>

                <TimePeriod checkDateSet={checkDateSet} />

                
                
                {
                (carrVess || countrySet || commHs4 )  && dateSet ?
                    <Button type="primary" block>Search</Button> :
                    <Button type="primary" block disabled>Search</Button>
                }
            </Drawer>
            
        </div>
    )
}

export default SearchPanel