import React, { useEffect, useState } from 'react'
import {Input , Dropdown, Menu, Typography, Tag, Button} from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
import './style.css'
import { getVessels } from '../services/api';
const { Search } = Input;

const carriersArray = [
    {
        "id": 1,
        "name": "Ngcarrier"
    },
    {
        "id": 2,
        "name": "Abcarrier"
    },
    {
        "id": 3,
        "name": "Decarrier"
    },
    {
        "id": 4,
        "name": "Jkcarrier"
    }
]

const vesselArray = [
    {
        "id": 1,
        "name": "Sevessel"
    },
    {
        "id": 2,
        "name": "Frvessel"
    },
    {
        "id": 3,
        "name": "MxVessel"
    },
    {
        "id": 4,
        "name": "XXvessel"
    }
]

const CarrierVessel = ({checkCarrVess}) => {

    const [showCarrierCard, setShowCarrierCard] = useState(false)
    const [cval, setCval] = useState([])
    const [vesselDisable, setVesselDisable] = useState(false)
    const [carrierDisable, setCarrierDisable] = useState(false)
    const [showcard, setShowCard] = useState(false)
    const [vessels, setVessels] = useState(vesselArray)
    const [chooseVessel, setChooseVessel] = useState([])
    const [fetchVessels, setFetchVessels] = useState([])
    const [carriers, setCarriers] = useState(carriersArray)

    useEffect(() => {
        if(cval.length || chooseVessel.length) {
            console.log('true')
            checkCarrVess(1)
        } else if(!cval.length || !chooseVessel.length){
            checkCarrVess(0)
        }
    },[cval.length, chooseVessel.length])

    const reset = () => {
        setChooseVessel([])
        setCval([])
        setShowCard(false)
        setShowCarrierCard(false)
        setCarrierDisable(false)
        setVesselDisable(false)
    }

    const onCSearch = () => { //api calls
        setShowCarrierCard(showCarrierCard => !showCarrierCard)
        setShowCard(false)
     }

     const onVSearch = (value) => {
        setShowCard(showcard => !showcard)
        setShowCarrierCard(false)
        console.log(value)

        makeAsyncCall(value)


     }

    const makeAsyncCall = async (value) => {
        setFetchVessels( await getVessels(value) )
        console.log(fetchVessels)
    }

   

     const searchCarrier = (val) => {
        console.log(val)
        setCval(cval => [...cval, val])
        //setCval(val)
        setCarrierDisable(true)
        setShowCarrierCard(false)
        setVesselDisable(true)
    }

    const searchVessel = (val) => {
        if(chooseVessel.length >= 2) {
            setShowCard(false)
        }

        if(chooseVessel.includes(val) || chooseVessel.length > 2) {
            return
        } else {
            setChooseVessel(chooseVessel => [...chooseVessel, val])
            setCarrierDisable(true)
        }

        
       
        
    }

    const deleteCarrier = (val) => {
        const vx = cval.indexOf(val)
        if (vx !== -1) {
            cval.splice(vx, 1);
            setCval(cval)
          }
         
          if(cval.length === 0){
              setVesselDisable(false)
              setCarrierDisable(false)
          }
     }

     const deleteVessel = (val) => {
        const vx = chooseVessel.indexOf(val)
        if (vx !== -1) {
            chooseVessel.splice(vx, 1);
            setChooseVessel(chooseVessel)
          }
         
          if(chooseVessel.length === 0){
              setCarrierDisable(false)
          }
     }

    const cmenu = (
        <Menu style={{marginTop: "20px"}}>
            <CloseOutlined onClick={()=> setShowCarrierCard(false)} style={{float: "right", color: "red"}} />
            <Typography.Text strong>Matching Resuts ({carriers.length})</Typography.Text>
            {
            
                carriers.map((cr, i) => (
                <Menu.Item key={i}>
                <p onClick={()=>searchCarrier(cr)}>{cr.name}</p>
                </Menu.Item>
                ))
                
            }
        </Menu>
    );

    const vmenu = (
        
        <Menu style={{marginTop: "30px", maxHeight: "300px", width: "252px", overflow: "auto"}}>
             <CloseOutlined onClick={()=> setShowCard(false)} style={{marginLeft: "230px", color: "red", position: "fixed", fontSize: '18px'}} />
             <Typography.Text strong>Matching Resuts ({fetchVessels.length})</Typography.Text>
        
            {
                fetchVessels.map((cr, i) => (
                <Menu.Item >
                <p key={i} onClick={()=>searchVessel(cr)}>{cr.name}</p>
                </Menu.Item>
                ))
                
            }
        </Menu>
    );


    return (
        <div>
            <div style={{position: "relative"}}>
                <Button onClick={reset} size="small" style={{position: "absolute", top: "0", right: "0"}}>Reset</Button>
                <Typography>Carrier</Typography>
                <Dropdown overlay={cmenu} trigger={['click']} visible={showCarrierCard? true: false} disabled={carrierDisable ? true : false}>
                     <Search placeholder="Search for carrier"  onSearch={onCSearch} onPressEnter={(e)=>onCSearch(e)} style={{ width: "100%", marginTop: "10px" }} />
               </Dropdown>
            </div>
               {
                    cval.map((c, i)=><Tag color="black" key={i} closable onClose={()=>deleteCarrier(c)}>{c.name}</Tag>)
                }
               <Typography style={{marginTop: "10px"}}>Vessel</Typography>
               <Dropdown overlay={vmenu}   visible={showcard? true: false} disabled={vesselDisable ? true : false}>
                     <Search placeholder="Search for vessel" onSearch={onVSearch} onPressEnter={onVSearch} style={{ width: "100%"}}  />
               </Dropdown>

                
               {
                    chooseVessel.map((v, i)=><Tag color="black" key={i} closable onClose={()=>deleteVessel(v)}>{v.name}</Tag>)
                }
        </div>
    )
}

export default CarrierVessel
