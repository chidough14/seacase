import React, { useEffect, useState } from 'react'
import {Input , Dropdown, Menu, Typography, Tag, Button} from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
const { Search } = Input;

const commodityArray = [
    {
        "id": 1,
        "name": "Cars"
    },
    {
        "id": 2,
        "name": "Electronics"
    },
    {
        "id": 3,
        "name": "computers"
    },
    {
        "id": 4,
        "name": "Metals"
    }
]

const hs4Array = [
    {
        "code": 41,
        "description": "car parts"
    },
    {
        "code": 42,
        "description": "Electrical parts"
    },
    {
        "code": 43,
        "description": "computer parts"
    },
    {
        "code": 44,
        "description": "metal parts"
    }
]


const CommodityHs4 = ({checkCommHs4}) => {
    const [showCommodityCard, setShowCommodityCard] = useState(false)
    const [cval, setCval] = useState([])
    const [hs4Disable, setHs4Disable] = useState(false)
    const [commodityDisable, setCommodityDisable] = useState(false)
    const [showHs4card, setShowHs4Card] = useState(false)
    const [hs4s, setHs4s] = useState(hs4Array)
    const [choosehs4s, setChooseHs4s] = useState([])
    const [commodity, setCommodity] = useState(commodityArray)

    useEffect(() => {
        if(cval.length || choosehs4s.length) {
            console.log('true')
            checkCommHs4(1)
        } else if(!cval.length || !choosehs4s.length){
            checkCommHs4(0)
        }
    },[cval.length, choosehs4s.length])

    const reset = () => {
        setChooseHs4s([])
        setCval([])
        setShowHs4Card(false)
        setShowCommodityCard(false)
        setCommodityDisable(false)
        setHs4Disable(false)
    }
    const onCSearch = () => { //api calls
        setShowCommodityCard(showCommodityCard => !showCommodityCard)
        setShowHs4Card(false)
    }

    const onHSearch = () => {
        setShowHs4Card(showHs4card => !showHs4card)
        setShowCommodityCard(false)
    }

    const searchCommodity = (val) => {
        console.log(val)
        setCval(cval => [...cval, val])
        //setCval(val)
        setCommodityDisable(true)
        setShowCommodityCard(false)
        setHs4Disable(true)
    }

    const searchHs4s = (val) => {
        if(choosehs4s.length >= 2) {
            setShowHs4Card(false)
        }

        if(choosehs4s.includes(val) || choosehs4s.length > 2) {
            return
        } else {
            setChooseHs4s(choosehs4s => [...choosehs4s, val])
            setCommodityDisable(true)
        }

        
    
        
    }


    const deleteCommodity = (val) => {
        const vx = cval.indexOf(val)
        if (vx !== -1) {
            cval.splice(vx, 1);
            setCval(cval)
        }
        
        if(cval.length === 0){
            setHs4Disable(false)
            setCommodityDisable(false)
        }
    }

    const deleteHs4 = (val) => {
        const vx = choosehs4s.indexOf(val)
        if (vx !== -1) {
            choosehs4s.splice(vx, 1);
            setChooseHs4s(choosehs4s)
        }
        
        if(choosehs4s.length === 0){
            setCommodityDisable(false)
        }
    }



    const cmenu = (
        <Menu style={{marginTop: "20px"}}>
            <CloseOutlined onClick={()=> setShowCommodityCard(false)} style={{float: "right", color: "red"}} />
            <Typography.Text strong>Matching Resuts ({commodity.length})</Typography.Text>
            {
            
                commodity.map((cr, i) => (
                <Menu.Item key={i}>
                <p onClick={()=>searchCommodity(cr)}>{cr.name}</p>
                </Menu.Item>
                ))
                
            }
        </Menu>
    );

    const hmenu = (
        
        <Menu style={{marginTop: "20px"}}>
            <CloseOutlined onClick={()=> setShowHs4Card(false)} style={{float: "right", color: "red"}} />
            <Typography.Text strong>Matching Resuts ({hs4s.length})</Typography.Text>
            {
                hs4s.map((cr, i) => (
                <Menu.Item >
                <p key={i} onClick={()=>searchHs4s(cr)}>{cr.description}</p>
                </Menu.Item>
                ))
                
            }
        </Menu>
    );

    return (
        <div>
            <div style={{float: "right", marginBottom: "10px"}}><Button onClick={reset} size="small" >Reset</Button></div>
                <Typography>Commodity</Typography>
                <Dropdown overlay={cmenu} trigger={['click']} visible={showCommodityCard? true: false} disabled={commodityDisable ? true : false}>
                     <Search placeholder="Search for commodity"  onSearch={onCSearch} onPressEnter={onCSearch} style={{ width: "100%" }} disabled/>
               </Dropdown>
               {
                    cval.map((c, i)=><Tag color="black" key={i} closable onClose={()=>deleteCommodity(c)}>{c.name}</Tag>)
                }
               <Typography style={{marginTop: "10px"}}>Hs4</Typography>
               <Dropdown overlay={hmenu}   visible={showHs4card? true: false} disabled={hs4Disable ? true : false}>
                     <Search placeholder="Search for Hs4" onSearch={onHSearch} onPressEnter={onHSearch} style={{ width: "100%"}}  />
               </Dropdown>

                
               {
                    choosehs4s.map((v, i)=><Tag color="black" key={i} closable onClose={()=>deleteHs4(v)}>{v.description}</Tag>)
                }
        </div>
    )
}

export default CommodityHs4
