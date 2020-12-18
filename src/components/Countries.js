import React, { useEffect, useState, useRef } from 'react'
import { Drawer, Input , Dropdown, Menu, Typography, Select, Tag, Button,Affix} from 'antd';
import { CloseOutlined , CheckOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css';
import './style.css'
const { Search } = Input;
const { Option } = Select;

const Countries = ({checkCountrySet, fetchCountries}) => {
    //console.log(fetchCountries)
    const [countries, setCountries] = useState([])
    const [importCountrySelect, setImportCountrySelect] = useState([])
    const [exportCountrySelect, setExportCountrySelect] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [showCountryCard, setShowCountryCard] = useState(false)
    const [countryDisable, setCountryDisable] = useState(false)
    const [countryVisible, setCountryVisible] = useState(false)
    const [chooseCoun, setChooseCoun] = useState([])
    const [expchooseCoun, setExpChooseCoun] = useState([])
    const [showexpCountryCard, setShowExpCountryCard] = useState(false)
    const [expFilteredCountries, setExpFilteredCountries] = useState([])

    useEffect(() => {
        //setCountries(fetchCountries)

        if(chooseCoun.length || expchooseCoun.length) {
            checkCountrySet(1)
        } else if (!chooseCoun.length || !expchooseCoun.length) {
            checkCountrySet(0)
        }

    }, [chooseCoun, expchooseCoun])


    const counMenu = (
          
        <Menu style={{marginTop: "30px", maxHeight: "300px", width: "252px", overflow: "auto"}}>
           <CloseOutlined onClick={()=> setShowCountryCard(false)} style={{marginLeft: "230px", color: "red", position: "fixed", fontSize: '18px'}}   />
           <Typography.Text strong>Choose Country</Typography.Text>
          {
              filteredCountries.map((cr, i) => (
                <Menu.Item size={4}>
                <span key={i} onClick={chooseCoun.includes(cr) ? () => deleteCountry(cr) :  ()=>searchCoun(cr)}>{cr.name} </span> 
                {chooseCoun.includes(cr) ? <CheckOutlined onClick={()=> deleteCountry(cr)} style={{color: "green"}} /> : null}
                </Menu.Item>
              ))
             
          }
        </Menu>
    );

      const expcounMenu = (
          
       
            <Menu style={{marginTop: "20px", maxHeight: "300px", width: "252px", overflow: "auto"}} >
                 <CloseOutlined onClick={()=> setShowExpCountryCard(false)} style={{marginLeft: "230px", color: "red", position: "fixed", fontSize: '18px'}} />
                 <Typography.Text strong >Choose Country</Typography.Text>
                {
                    expFilteredCountries.map((cr, i) => (
                        <Menu.Item >
                        <span key={i} onClick={expchooseCoun.includes(cr) ? () => deleteExpCountry(cr) : () => searchExpCoun(cr)}>{cr.name} </span> 
                        {expchooseCoun.includes(cr) ? <CheckOutlined onClick={()=> deleteExpCountry(cr)} style={{color: "green"}}  /> : null}
                        </Menu.Item>
                    ))
                
                }
            </Menu>
       
    );

    const resetCountries = ()=> {
        /*  setImportCountrySelect([])
         setExportCountrySelect([]) */
         setChooseCoun([])
         setExpChooseCoun([])
         setShowExpCountryCard(false)
         setShowCountryCard(false)
     }

     const handleChange = (val)=> {
       console.log(val)
       setImportCountrySelect(val)
     }

     const handleEChange = (val)=> {
        setExportCountrySelect(val)
     }

     const getCountries = (e)=> {
        const val = e.target.value !== "" ? e.target.value : "zzz" 
        const coun = fetchCountries.filter(ac => ac.name.includes(val.toUpperCase()))

        setFilteredCountries(coun)
        console.log(countries)
        setShowCountryCard(true)
        setShowExpCountryCard(false)
     }

     const searchCoun = (val) => {
        if(chooseCoun.length >= 2) {
            setShowCountryCard(false)
        }

        if(chooseCoun.includes(val) || chooseCoun.length > 2) {
            return
        } else {
            setChooseCoun(chooseCoun => [...chooseCoun, val])
        }
        console.log(chooseCoun)
     }

     const searchExpCoun = (val) => {
        if(expchooseCoun.length >= 2) {
            setShowExpCountryCard(false)
        }

        if(expchooseCoun.includes(val) || expchooseCoun.length > 2) {
           return
        } else {
            setExpChooseCoun(expchooseCoun => [...expchooseCoun, val])
            
        }

        
     }


     const getExpCountries = (e)=> {
        const val = e.target.value !== ""  ? e.target.value : "zzz" 
        const coun = fetchCountries.filter(ac => ac.name.includes(val.toUpperCase()))

        console.log(coun)
        setExpFilteredCountries(coun)
        setShowExpCountryCard(true)
        setShowCountryCard(false)
     }

     const deleteCountry = (val, i) => {

        if(i === undefined) {
            const vx = chooseCoun.indexOf(val)
            if (vx !== -1) {
            const nw = [...chooseCoun]
            nw.splice(vx, 1);
            nw.length === 0 ? setChooseCoun([]) :  setChooseCoun(nw)
            }
        } else  {
            const vx = chooseCoun.indexOf(val)
            if (vx !== -1) {
                chooseCoun.splice(vx, 1);
                chooseCoun.length === 0 ? setChooseCoun([]) :  setChooseCoun(chooseCoun)
            }
        }
      }

     const deleteExpCountry = (val, i) => {
        if(i === undefined) {
            const vx = expchooseCoun.indexOf(val)
            if (vx !== -1) {
            const nw = [...expchooseCoun]
            nw.splice(vx, 1);
            nw.length === 0 ? setExpChooseCoun([]) :  setExpChooseCoun(nw)
            }
        } else  {
            const vx = expchooseCoun.indexOf(val)
            if (vx !== -1) {
                expchooseCoun.splice(vx, 1);
                expchooseCoun.length === 0 ? setExpChooseCoun([]) :  setExpChooseCoun(expchooseCoun)
            }
        }
     }


    return (
        <div>
             
             <Button onClick={resetCountries} size="small" style={{float: "right", marginBottom: "10px"}}>Reset</Button>
                <Typography>Import Countries</Typography>
                {/* <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%'}}
                    placeholder="Please select"
                    onChange={handleChange}
                    value={importCountrySelect}
                    >
                   {
                       fetchCountries.map((co, i)=> (
                         <Option key={i} value={co.name} disabled={(importCountrySelect.length > 2) ? true : false}>{co.name}</Option>
                       ))
                   }
                </Select> */}

               <div style={{marginBottom: "10px"}}>
                <Dropdown overlay={counMenu}  overlayStyle={{marginTop: "40px"}} visible={showCountryCard && filteredCountries.length ? true: false} disabled={countryDisable ? true : false}  >
                  
                     <Search placeholder="Import countries" allowClear  onChange={getCountries} onSearch={()=> {setShowCountryCard(showCountryCard => !showCountryCard); setShowExpCountryCard(false)}} style={{ width: "100%"}}  />
               </Dropdown>

                    {
                        chooseCoun.map((v, i)=>(<Tag color="black" key={i} closable onClose={()=>deleteCountry(v, i)}>{v.name}</Tag>))
                    }
                </div>


                <Typography>Export Countries</Typography>
               {/*  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%'}}
                    placeholder="Please select"
                    onChange={handleEChange}
                    value={exportCountrySelect}
                    >
                   {
                       countries.map((co, i)=> (
                         <Option key={i} value={co.name} disabled={(exportCountrySelect.length > 2) ? true : false}>{co.name}</Option>
                       ))
                   }
                </Select> */}

               <div> <Dropdown overlay={expcounMenu}   visible={(showexpCountryCard && expFilteredCountries.length)  ? true: false} disabled={countryDisable ? true : false} >
                   
                     <Search placeholder="Export countries" allowClear  onChange={getExpCountries} onSearch={()=> setShowExpCountryCard(showexpCountryCard => !showexpCountryCard)} style={{ width: "100%"}}  />
               </Dropdown>
                </div>

               {
                    expchooseCoun.map((v, i)=><Tag key={i} color="black" closable onClose={()=>deleteExpCountry(v, i)}>{v.name}</Tag>)
                }

        </div>
    )

    
}


export default Countries
